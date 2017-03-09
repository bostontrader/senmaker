import Immutable from 'immutable'
import {List,Map} from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppActionTypes from './AppActionTypes'
import AppDispatcher from './AppDispatcher'

import {NounPanelLevel} from '../data/nouns/NounConstants'
import {VerbPanelLevel} from '../data/verbs/VerbConstants'

import {localStorageAvailable} from '../LocalStorage'

const localStorageKey = 'AppStore'

class AppStore extends ReduceStore {

    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {

        if (localStorageAvailable) {
            //localStorage.removeItem(localStorageKey)
            const localStorageState = localStorage.getItem(localStorageKey)

            if(localStorageState)
                return Immutable.fromJS(JSON.parse(localStorageState))
        }

        return AppStore.initialState

    }

    reduce(state, action) {
        let newState
        switch (action.type) {
            //case AppActionTypes.LEVEL_PREVIOUS:
                //if (AppStore.currentLevel > 0) {
                    //newState = {
                        //currentAppLevel: AppStore.theLevels[--AppStore.currentLevel],
                        //minLevel: AppStore.currentLevel <= 0, maxLevel: false,
                        //quiz: AppStore.theQuiz
                    //}
                    //if(AppStore.localStorageAvailable)
                        //localStorage.setItem(localStorageKey, JSON.stringify(newState))

                    //return newState
                //} else
                    //return state

            case AppActionTypes.LEVEL_NEXT:

                if(state.get('currentLevel') < AppStore.theLevelConfigs.size-1) {

                    const newCurrentLevel = state.get('currentLevel') + 1
                    const newMaxLevelFlag = newCurrentLevel === AppStore.theLevelConfigs.size-1
                    newState = Immutable.Map(
                        {currentLevel:newCurrentLevel, minLevel:false, maxLevel:newMaxLevelFlag, quiz: false}
                    ).set('currentAppLevelConfig', AppStore.theLevelConfigs.get(newCurrentLevel))

                    if(localStorageAvailable)
                        localStorage.setItem(localStorageKey, JSON.stringify(newState))

                    return newState
                }
                else
                    return state

            case AppActionTypes.LEVEL_RESET:

                newState = AppStore.initialState

                if(localStorageAvailable)
                    localStorage.setItem(localStorageKey, JSON.stringify(newState))

                return newState

            case AppActionTypes.QUIZ_TOGGLE:

                newState = state.set('quiz',!state.get('quiz'))

                if(localStorageAvailable)
                    localStorage.setItem(localStorageKey, JSON.stringify(newState))

                return newState

            default:
                return state
        }
    }
}

//AppStore.currentLevel = 0
AppStore.theLevelConfigs = Immutable.fromJS([
    {}, // level 0
    {nounPanel: NounPanelLevel.BASE},
    {verbPanel: VerbPanelLevel.BASE},
    {nounPanel: NounPanelLevel.PLURALIZATION},
    {nounPanel: NounPanelLevel.PLURALIZATION, verbPanel: VerbPanelLevel.PAST_TENSE}
])

AppStore.initialState = Immutable.Map(
    {currentLevel:0, minLevel:true, maxLevel:false, quiz: false}
).set('currentAppLevelConfig', AppStore.theLevelConfigs.get(0))
//console.log('n=',JSON.stringify(AppStore.initialState.toJSON()))

export default new AppStore()
