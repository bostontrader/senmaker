import Immutable from 'immutable'
import {List,Map} from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppActionTypes from './AppActionTypes'
import AppDispatcher from './AppDispatcher'
import {langCode} from './I18NConstants'
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
            localStorage.removeItem(localStorageKey)
            const localStorageState = localStorage.getItem(localStorageKey)

            if(localStorageState)
                return Immutable.fromJS(JSON.parse(localStorageState))
        }

        return AppStore.initialState

    }

    reduce(state, action) {
        let newState
        switch (action.type) {
            case AppActionTypes.LANG_EN:
                newState = state.set('lang',langCode.en)

                if(localStorageAvailable)
                    localStorage.setItem(localStorageKey, JSON.stringify(newState))

                return newState

            case AppActionTypes.LANG_ZH:
                newState = state.set('lang',langCode.zh)

                if(localStorageAvailable)
                    localStorage.setItem(localStorageKey, JSON.stringify(newState))

                return newState


            case AppActionTypes.LEVEL_PREVIOUS:
                if (state.get('currentLevel') > 0) {
                    const newCurrentLevel = state.get('currentLevel') - 1
                    newState = Immutable.Map({
                        currentLevel:newCurrentLevel,
                        minLevel:newCurrentLevel === 0,
                        maxLevel:false,
                        quiz: false
                    }).set('currentAppLevelConfig', AppStore.theLevelConfigs.get(newCurrentLevel))

                    if(localStorageAvailable)
                        localStorage.setItem(localStorageKey, JSON.stringify(newState))

                    return newState
                } else
                    return state

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

            case AppActionTypes.QUIZ_SETSCORE:
                console.log('AppStore QUIZ_SETSCORE =',action.score)
                const n = state.get('currentLevel')
                //newState = state.set('quiz',!state.get('quiz'))
                newState = state.setIn(['quizResults',n],action.score)

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
    {nounPanel: NounPanelLevel.PLURALIZATION, verbPanel: VerbPanelLevel.PAST_TENSE},
    {nounPanel: NounPanelLevel.PLURALIZATION, verbPanel: VerbPanelLevel.PAST_TENSE}, // 5
    {nounPanel: NounPanelLevel.PLURALIZATION, verbPanel: VerbPanelLevel.PAST_TENSE},
    {nounPanel: NounPanelLevel.PLURALIZATION, verbPanel: VerbPanelLevel.PAST_TENSE}

])

AppStore.initialState = Immutable.Map({
    currentLevel:0,
    minLevel:true,      // is this is lowest possible level?
    maxLevel:false,     // is this the highest possible level?
    quizQuestions: {
        addNoun: false,
        changeNoun: false,
        deleteNoun: false
    },
    //quizResults: {false}, // level 0 starts as false
    // Elements 0, 1, ... should be set to true or false, depending upon
    // whether or not the quiz for level 0, 1, ... is passed
    //quizResults:[false,false], // Start with Level 00 false
    lang:langCode.zh    // what language for the UI?
})
    .set('currentAppLevelConfig', AppStore.theLevelConfigs.get(0))
    .set('quizResults', new List().push(false))
//console.log('n=',JSON.stringify(AppStore.initialState.toJSON()))

export default new AppStore()
