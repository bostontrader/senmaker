import {fromJS, List,Map} from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppActionTypes from './AppActionTypes'
import AppDispatcher from './AppDispatcher'
import {langCode} from './I18NConstants'
import NounActionTypes from './dictionary/nouns/NounDictionaryItemActionTypes'
import {NounDictionaryItemPanelLevel} from './dictionary/nouns/NounDictionaryItemConstants'
import {VerbPanelLevel} from './dictionary/verbs/VerbDictionaryItemConstants'
import VerbActionTypes from './dictionary/verbs/VerbDictionaryActionTypes'

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
                return fromJS(JSON.parse(localStorageState))
        }

        return AppStore.initialState

    }
    
    reduce(state, action) {

        let newState

        // Has the quiz for Noun CRUD been completed?
        function nounCRUDQuizPassed(state) {
            const quizInsertNounFlag = state.getIn(['quizQuestions','insertNoun'])
            const quizUpdateNounFlag = state.getIn(['quizQuestions','updateNoun'])
            const quizDeleteNounFlag = state.getIn(['quizQuestions','deleteNoun'])
            return quizInsertNounFlag && quizUpdateNounFlag && quizDeleteNounFlag
        }

        // Has the quiz for Verb CRUD been completed?
        function verbCRUDQuizPassed(state) {
            const quizInsertVerbFlag = state.getIn(['quizQuestions', 'insertVerb'])
            const quizUpdateVerbFlag = state.getIn(['quizQuestions', 'updateVerb'])
            const quizDeleteVerbFlag = state.getIn(['quizQuestions', 'deleteVerb'])
            return quizInsertVerbFlag && quizUpdateVerbFlag && quizDeleteVerbFlag
        }

        switch (action.type) {
            case AppActionTypes.CHANGE_DEFINITENESS:
                return state

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
                    newState = Map({
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
                    newState = state.set('currentLevel',newCurrentLevel)
                    newState = newState.setIn(['quizResults',0], false) // new level starts as false
                    newState = newState.set('minLevel',false)
                    newState = newState.set('maxLevel',newMaxLevelFlag)
                    newState = newState.set('currentAppLevelConfig', AppStore.theLevelConfigs.get(newCurrentLevel))

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

                newState = state.setIn(['quizResults',state.get('currentLevel')],action.score)

                if(localStorageAvailable)
                    localStorage.setItem(localStorageKey, JSON.stringify(newState))

                return newState

            case NounActionTypes.INSERT_NOUN:
                action.ui ?
                    newState = state.setIn(['quizQuestions','insertNoun'],true) :
                    newState = state

                if(nounCRUDQuizPassed(newState))
                    newState = newState.setIn(['quizResults',newState.get('currentLevel')],true)

                if(localStorageAvailable)
                    localStorage.setItem(localStorageKey, JSON.stringify(newState))

                return newState

            case NounActionTypes.UPDATE_NOUN:

                newState = state.setIn(['quizQuestions','updateNoun'],true)

                if(nounCRUDQuizPassed(newState))
                    newState = newState.setIn(['quizResults',newState.get('currentLevel')],true)

                if(localStorageAvailable)
                    localStorage.setItem(localStorageKey, JSON.stringify(newState))

                return newState

            case NounActionTypes.DELETE_NOUN:

                newState = state.setIn(['quizQuestions','deleteNoun'],true)

                if(nounCRUDQuizPassed(newState))
                    newState = newState.setIn(['quizResults',newState.get('currentLevel')],true)

                if(localStorageAvailable)
                    localStorage.setItem(localStorageKey, JSON.stringify(newState))

                return newState

            case VerbActionTypes.INSERT_VERB:
                action.ui ?
                    newState = state.setIn(['quizQuestions','insertVerb'],true) :
                    newState = state

                if(verbCRUDQuizPassed(newState))
                    newState = newState.setIn(['quizResults',newState.get('currentLevel')],true)

                if(localStorageAvailable)
                    localStorage.setItem(localStorageKey, JSON.stringify(newState))

                return newState

            case VerbActionTypes.UPDATE_VERB:

                newState = state.setIn(['quizQuestions','updateVerb'],true)

                if(verbCRUDQuizPassed(newState))
                    newState = newState.setIn(['quizResults',newState.get('currentLevel')],true)

                if(localStorageAvailable)
                    localStorage.setItem(localStorageKey, JSON.stringify(newState))

                return newState

            case VerbActionTypes.DELETE_VERB:

                newState = state.setIn(['quizQuestions','deleteVerb'],true)

                if(verbCRUDQuizPassed(newState))
                    newState = newState.setIn(['quizResults',newState.get('currentLevel')],true)

                if(localStorageAvailable)
                    localStorage.setItem(localStorageKey, JSON.stringify(newState))

                return newState
            
            default:
                return state
        }
    }
}

//AppStore.currentLevel = 0
AppStore.theLevelConfigs = fromJS([
    {}, // level 0
    {nounPanel: NounDictionaryItemPanelLevel.BASE},
    {verbPanel: VerbPanelLevel.BASE},
    {nounPanel: NounDictionaryItemPanelLevel.PLURALIZATION},
    {nounPanel: NounDictionaryItemPanelLevel.PLURALIZATION, verbPanel: VerbPanelLevel.PAST_TENSE},
    {nounPanel: NounDictionaryItemPanelLevel.PLURALIZATION, verbPanel: VerbPanelLevel.PAST_TENSE}, // 5
    {nounPanel: NounDictionaryItemPanelLevel.PLURALIZATION, verbPanel: VerbPanelLevel.PAST_TENSE},
    {nounPanel: NounDictionaryItemPanelLevel.PLURALIZATION, verbPanel: VerbPanelLevel.PAST_TENSE}

])

AppStore.initialState = Map({
    currentLevel:0,
    minLevel:true,      // is this is lowest possible level?
    maxLevel:false,     // is this the highest possible level?
    quizQuestions: new Map({
        insertNoun: false,
        changeNoun: false,
        deleteNoun: false
    }),
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
