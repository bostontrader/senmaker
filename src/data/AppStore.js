import {ReduceStore} from 'flux/utils'

import AppActionTypes from './AppActionTypes'
import AppDispatcher from './AppDispatcher'

import {NounPanelLevel} from '../data/nouns/NounConstants'
import {VerbPanelLevel} from '../data/verbs/VerbConstants'

class AppStore extends ReduceStore {

    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return {currentAppLevel:AppStore.theLevels[0], minLevel:true, maxLevel:false, quiz:false}
    }

    reduce(state, action) {
        switch (action.type) {

            case AppActionTypes.LEVEL_PREVIOUS:
                if(AppStore.currentLevel > 0)
                    //return AppStore.theLevels[--AppStore.currentLevel]
                    return {
                        currentAppLevel:AppStore.theLevels[--AppStore.currentLevel],
                        minLevel:AppStore.currentLevel <= 0, maxLevel:false,
                        quiz:AppStore.theQuiz
                    }
                else
                    return state

            case AppActionTypes.LEVEL_NEXT:
                if(AppStore.currentLevel < AppStore.theLevels.length-1)
                    return {
                        currentAppLevel:AppStore.theLevels[++AppStore.currentLevel],
                        minLevel:false, maxLevel:false,
                        quiz:AppStore.theQuiz
                    }

                else
                    return state

            case AppActionTypes.LEVEL_RESET:
                AppStore.currentLevel = 0
                AppStore.theQuiz = false
                return {currentAppLevel:AppStore.theLevels[0], minLevel:true, maxLevel:false, quiz:false}

            case AppActionTypes.QUIZ0_TOGGLE:
                AppStore.theQuiz ^= true
                return {currentAppLevel:AppStore.theLevels[0], minLevel:true, maxLevel:false, quiz:AppStore.theQuiz}

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

export default new AppStore()
