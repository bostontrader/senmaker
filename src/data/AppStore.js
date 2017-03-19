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
            const quizInsertNounFlag = state.getIn(['level','quizQuestions','insertNoun'])
            const quizUpdateNounFlag = state.getIn(['level','quizQuestions','updateNoun'])
            const quizDeleteNounFlag = state.getIn(['level','quizQuestions','deleteNoun'])
            return quizInsertNounFlag && quizUpdateNounFlag && quizDeleteNounFlag
        }

        // Has the quiz for Verb CRUD been completed?
        function verbCRUDQuizPassed(state) {
            const quizInsertVerbFlag = state.getIn(['level','quizQuestions', 'insertVerb'])
            const quizUpdateVerbFlag = state.getIn(['level','quizQuestions', 'updateVerb'])
            const quizDeleteVerbFlag = state.getIn(['level','quizQuestions', 'deleteVerb'])
            return quizInsertVerbFlag && quizUpdateVerbFlag && quizDeleteVerbFlag
        }

        switch (action.type) {
            case AppActionTypes.CHANGE_DEFINITENESS:
                console.log('AppStore CHANGE_DEFINITENESS =',action.newDefiniteness)
                return state

            case AppActionTypes.INSERT_NOUNI:
                //const id = Counter.increment()
                console.log('AppStore INSERT_NOUNI =',action.nouni)

                //const id = 'example_nouni'
                //return state.set(id, new Nouni({
                    //id: id,
                    //noun: action.nouni.noun,
                    //definiteness: action.nouni.definiteness
                //}))


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

                if(state.getIn(['level','currentLevel']) < AppStore.theLevelConfigs.size-1) {

                    const newCurrentLevel = state.getIn(['level','currentLevel']) + 1
                    const newMaxLevelFlag = newCurrentLevel === AppStore.theLevelConfigs.size-1
                    newState = state.setIn(['level','currentLevel'],newCurrentLevel)
                    newState = newState.setIn(['level','quizResults',0], false) // new level starts as false
                    newState = newState.setIn(['level','minLevel'],false)
                    newState = newState.setIn(['level','maxLevel'],newMaxLevelFlag)
                    newState = newState.setIn(['level','currentAppLevelConfig'], AppStore.theLevelConfigs.get(newCurrentLevel))

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

                newState = state.setIn(['level','quizResults',state.getIn(['level','currentLevel'])],action.score)

                if(localStorageAvailable)
                    localStorage.setItem(localStorageKey, JSON.stringify(newState))

                return newState

            case NounActionTypes.INSERT_NOUN:
                action.ui ?
                    newState = state.setIn(['level','quizQuestions','insertNoun'],true) :
                    newState = state

                if(nounCRUDQuizPassed(newState))
                    newState = newState.setIn(['level','quizResults',newState.getIn(['level','currentLevel'])],true)

                if(localStorageAvailable)
                    localStorage.setItem(localStorageKey, JSON.stringify(newState))

                return newState

            case NounActionTypes.UPDATE_NOUN:

                newState = state.setIn(['level','quizQuestions','updateNoun'],true)

                if(nounCRUDQuizPassed(newState))
                    newState = newState.setIn(['level','quizResults',newState.getIn(['level','currentLevel'])],true)

                if(localStorageAvailable)
                    localStorage.setItem(localStorageKey, JSON.stringify(newState))

                return newState

            case NounActionTypes.DELETE_NOUN:

                newState = state.setIn(['level','quizQuestions','deleteNoun'],true)

                if(nounCRUDQuizPassed(newState))
                    newState = newState.setIn(['level','quizResults',newState.getIn(['level','currentLevel'])],true)

                if(localStorageAvailable)
                    localStorage.setItem(localStorageKey, JSON.stringify(newState))

                return newState

            case VerbActionTypes.INSERT_VERB:
                action.ui ?
                    newState = state.setIn(['level','quizQuestions','insertVerb'],true) :
                    newState = state

                if(verbCRUDQuizPassed(newState))
                    newState = newState.setIn(['level','quizResults',newState.getIn(['level','currentLevel'])],true)

                if(localStorageAvailable)
                    localStorage.setItem(localStorageKey, JSON.stringify(newState))

                return newState

            case VerbActionTypes.UPDATE_VERB:

                newState = state.setIn(['level','quizQuestions','updateVerb'],true)

                if(verbCRUDQuizPassed(newState))
                    newState = newState.setIn(['level','quizResults',newState.getIn(['level','currentLevel'])],true)

                if(localStorageAvailable)
                    localStorage.setItem(localStorageKey, JSON.stringify(newState))

                return newState

            case VerbActionTypes.DELETE_VERB:

                newState = state.setIn(['level','quizQuestions','deleteVerb'],true)

                if(verbCRUDQuizPassed(newState))
                    newState = newState.setIn(['level','quizResults',newState.getIn(['level','currentLevel'])],true)

                if(localStorageAvailable)
                    localStorage.setItem(localStorageKey, JSON.stringify(newState))

                return newState
            
            default:
                return state
        }
    }
}

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
    lang:langCode.zh,       // what language for the UI?
    level: Map({
        currentLevel:0,
        currentAppLevelConfig: AppStore.theLevelConfigs.get(0),
        minLevel:true,      // is this is lowest possible level?
        maxLevel:false,     // is this the highest possible level?
        quizQuestions: new Map({
            insertNoun: false,
            updateNoun: false,
            deleteNoun: false
        }),
        quizResults: new List().push(false) // Level 00 starts with passed quiz = false
    }),
    nouni: Map()    // nouns, instantiated
})
//console.log('n=',JSON.stringify(AppStore.initialState.toJSON()))

export default new AppStore()
