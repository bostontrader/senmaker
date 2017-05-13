// @flow
//import {fromJS}      from 'immutable'
import {Map}         from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppActionTypes from './AppActionTypes'
import AppDispatcher  from '../AppDispatcher'
import syllabus       from '../Syllabus'
//import Nound          from '../dictionary/nound/Nound'

//import {localStorageAvailable} from '../../LocalStorage'
//const localStorageKey:string = 'AppStore'

// We want to provide a migration capacity for the format of this store.  It's serialized
// into localStorage and there's no telling when old versions will be seen in the future.
const initialStates:Array<Object> = [
    Map({
        level: Map({
            currentLevel:0,         // these two should
            currentLesson:'intro',  // should stay in sync
            firstLesson:true,       // is this the first lesson?
            lastLesson:false
        })
    }),
    Map({
        version:1,
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

        /*if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState)
                return this.migrate(fromJS(JSON.parse(localStorageState)))
        }*/

        return initialStates.slice(-1)[0]
    }

    // Given an originalFormat state object migrate to the most current version
    /*migrate(originalFormat:Object):Object {
        const currentInitialState:Object = initialStates.slice(-1)[0]
        const originalVersion:number = originalFormat.getIn(['version'])

        // If the version is undefined then we start fresh
        if(originalVersion === undefined)
            return currentInitialState

        // If the version is the most recent
        if (originalVersion === currentInitialState.getIn(['version']))
            return originalFormat

        // Else migrate from the originalVersion to the current version
        // But at this time there are no intermediate version to migrate through
        // so do nothing
        return currentInitialState
    }*/

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

        //if(localStorageAvailable)
            //localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }

}

export default new AppStore()
export {initialStates}
