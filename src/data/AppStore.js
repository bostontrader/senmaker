import {ReduceStore} from 'flux/utils'

import AppActionTypes from './AppActionTypes'
import AppDispatcher from './AppDispatcher'

import {NounPanelLevel} from '../data/nouns/NounConstants'
import {VerbPanelLevel} from '../data/verbs/VerbConstants'

const localStorageKey = 'AppStore'

class AppStore extends ReduceStore {

    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {

        localStorage.removeItem(localStorageKey)
        function storageAvailable(type) {
            try {
                const storage = window[type], x = '__storage_test__'
                storage.setItem(x, x)
                storage.removeItem(x)
                return true
            } catch(e) {
                return false
            }
        }

        if (storageAvailable('localStorage')) {
            AppStore.localStorageAvailable = true
            const localStorageState = localStorage.getItem(localStorageKey)
            if(localStorageState)
                return JSON.parse(localStorageState) // hope the parse works
        }

        return AppStore.initialState

    }

    reduce(state, action) {
        let newState
        switch (action.type) {
            case AppActionTypes.LEVEL_PREVIOUS:
                if (AppStore.currentLevel > 0) {
                    newState = {
                        currentAppLevel: AppStore.theLevels[--AppStore.currentLevel],
                        minLevel: AppStore.currentLevel <= 0, maxLevel: false,
                        quiz: AppStore.theQuiz
                    }
                    if(AppStore.localStorageAvailable)
                        localStorage.setItem(localStorageKey, JSON.stringify(newState))

                    return newState
                } else
                    return state

            case AppActionTypes.LEVEL_NEXT:
                if(AppStore.currentLevel < AppStore.theLevels.length-1) {
                    newState = {
                        currentAppLevel:AppStore.theLevels[++AppStore.currentLevel],
                        minLevel:false, maxLevel:false,
                        quiz:AppStore.theQuiz
                    }

                    if(AppStore.localStorageAvailable)
                        localStorage.setItem(localStorageKey, JSON.stringify(newState))

                    return newState
                }
                else
                    return state

            case AppActionTypes.LEVEL_RESET:
                AppStore.currentLevel = 0
                AppStore.theQuiz = false
                newState = AppStore.initialState
                if(AppStore.localStorageAvailable)
                    localStorage.setItem(localStorageKey, JSON.stringify(newState))
                return newState

            case AppActionTypes.QUIZ0_TOGGLE:
                AppStore.theQuiz ^= true
                newState = {currentAppLevel:AppStore.theLevels[0], minLevel:true, maxLevel:false, quiz:AppStore.theQuiz}
                if(AppStore.localStorageAvailable)
                    localStorage.setItem(localStorageKey, JSON.stringify(newState))
                return newState

            default:
                return state
        }
    }
}

AppStore.currentLevel = 0
AppStore.theLevels = [
    {app: 0},
    {app: 1, nounPanel: NounPanelLevel.BASE},
    {app: 2, verbPanel: VerbPanelLevel.BASE},
    {app: 3, nounPanel: NounPanelLevel.PLURALIZATION},
    {app: 4, nounPanel: NounPanelLevel.PLURALIZATION, verbPanel: VerbPanelLevel.PAST_TENSE}
]
AppStore.theQuiz = false
AppStore.initialState = {currentAppLevel:AppStore.theLevels[0], minLevel:true, maxLevel:false, quiz:false}

export default new AppStore()
