// @flow
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppActionTypes from './AppActionTypes'
import AppDispatcher  from '../AppDispatcher'
import syllabus       from '../Syllabus'

import {localStorageAvailable} from '../LocalStorage'
import {migrate}               from '../LocalStorage'
const localStorageKey:string = 'AppStore'

// We want to provide a migration capacity for the format of this store.  It's serialized
// into localStorage and there's no telling when old versions will be seen in the future.
const initialStates:Array<Object> = [
    Map({
        v:1,
        // If you change the lessons in data/Syllabus, be sure to review these settings
        level: Map({
            currentLevel: 0,         // these two should
            currentLesson: 'intro',  // should stay in sync
            firstLesson: true,       // is this the first lesson?
            lastLesson: false
        })
    })
]

class AppStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState() {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let newState:Object = migrate(fromJS(JSON.parse(localStorageState)), initialStates)

                // We need to ensure that 'lastLevel' is still set correctly.  Since the time
                // of serialization there might have been a new lesson added.
                const lessonCount:number = Object.keys(syllabus).length
                const currentLevel = newState.getIn(['level', 'currentLevel'])

                // Recall that the levels start at 0.  Hence -1
                newState = newState.setIn(['level', 'lastLesson'], currentLevel < lessonCount - 1)

                return newState
            }
        }

        return initialStates.slice(-1)[0]
    }

    reduce(state:Object, action:Object):Object {

        const currentLesson:string = state.getIn(['level','currentLesson'])
        const syllabusEntry:Object = syllabus[currentLesson]

        let newState:Object = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = initialStates.slice(-1)[0]
                break

            case AppActionTypes.ON_CLICK_LESSON_PREVIOUS:
                // If the current lesson is the first lesson then the UI should
                // not present a choice to advance to the non-existent prior lesson.
                // Nevertheless, catch that here also.

                if (syllabusEntry.prev) {
                    const newCurrentLevel:number = state.getIn(['level', 'currentLevel']) - 1
                    newState = newState.setIn(['level', 'currentLevel'], newCurrentLevel)
                    newState = newState.setIn(['level', 'currentLesson'], syllabusEntry.prev)
                    newState = newState.setIn(['level', 'firstLesson'], newCurrentLevel === 0)
                    newState = newState.setIn(['level', 'lastLesson'], false)
                }
                break

            case AppActionTypes.ON_CLICK_LESSON_NEXT:
                // If the current lesson is the last lesson then the UI should
                // not present a choice to advance to the non-existent next lesson.
                // Nevertheless, catch that here also.
                const lessonCount:number = Object.keys(syllabus).length
                if (syllabusEntry.next) {
                    const newCurrentLevel = state.getIn(['level', 'currentLevel']) + 1
                    newState = newState.setIn(['level', 'currentLevel'], newCurrentLevel)
                    newState = newState.setIn(['level', 'currentLesson'], syllabusEntry.next)
                    newState = newState.setIn(['level', 'firstLesson'], false)
                    newState = newState.setIn(['level', 'lastLesson'], newCurrentLevel >= lessonCount - 1)
                }
                break

            default:
                // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }

}

export default new AppStore()
export {initialStates}
