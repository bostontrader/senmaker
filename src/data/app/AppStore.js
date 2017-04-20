import {fromJS, Map} from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppActionTypes from './AppActionTypes'

import AppDispatcher    from '../AppDispatcher'
import Nound            from '../dictionary/nound/Nound'
//import NoundActionTypes from '../dictionary/nound/NoundActionTypes'
import syllabus         from '../Syllabus'

import {localStorageAvailable} from '../../LocalStorage'

const localStorageKey = 'AppStore'

class AppStore extends ReduceStore {

    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {

        if (localStorageAvailable) {
            const localStorageState = localStorage.getItem(localStorageKey)

            if(localStorageState)
                return fromJS(JSON.parse(localStorageState))
        }

        return AppStore.initialState
    }
    
    reduce(state, action) {

        const currentLesson = state.getIn(['level','currentLesson'])
        const syllabusEntry = syllabus[currentLesson]

        let newState = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_APP_RESET:
                newState = AppStore.initialState
                break

            case AppActionTypes.ON_LESSON_PREVIOUS:
                // If the current lesson is the first lesson then the UI should
                // not present a choice to advance to the non-existent prior lesson.
                // Nevertheless, catch that here also.

                if(syllabusEntry.prev) {
                    const newCurrentLevel = state.getIn(['level','currentLevel']) - 1
                    newState = newState.setIn(['level','currentLevel'],newCurrentLevel)
                    newState = newState.setIn(['level','currentLesson'],syllabusEntry.prev)
                    newState = newState.setIn(['level','firstLesson'], newCurrentLevel === 0)
                    newState = newState.setIn(['level','lastLesson'],false)
                }
                break

            case AppActionTypes.ON_LESSON_NEXT:
                // If the current lesson is the last lesson then the UI should
                // not present a choice to advance to the non-existent next lesson.
                // Nevertheless, catch that here also.
                const lessonCount  = Object.keys(syllabus).length
                if(syllabusEntry.next) {
                    const newCurrentLevel = state.getIn(['level','currentLevel']) + 1

                    newState = newState.setIn(['level','currentLevel'],newCurrentLevel)
                    newState = newState.setIn(['level','currentLesson'],syllabusEntry.next)
                    newState = newState.setIn(['level','firstLesson'],false)
                    newState = newState.setIn(['level','lastLesson'],newCurrentLevel >= lessonCount -1)
                }
                break

            // NoundActiontypes
            //case NoundActionTypes.ON_CHANGE_SELECTED_NOUND:
                //newState = newState.set('mostRecentlySelectedNound',action.nound)
                //break

            //default:
                // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

AppStore.initialState = Map({
    level: Map({
        currentLevel:0,         // these two should
        currentLesson:'intro',  // should stay in sync
        firstLesson:true,       // is this the first lesson?
        lastLesson:false,
    }),
    mostRecentlySelectedNound:Nound()
})

export default new AppStore()
