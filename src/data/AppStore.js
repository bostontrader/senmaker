import {fromJS, List,Map} from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppActionTypes from './AppActionTypes'
import NouniActionTypes from './nouni/NouniActionTypes'

import AppDispatcher from './AppDispatcher'
import {langCode} from './I18NConstants'
import NoundAEActionTypes from './dictionary/nound/addedit/NoundAEActionTypes'
import {NoundPanelLevel} from './dictionary/nound/NoundConstants'
import {VerbdPanelLevel} from './dictionary/verbd/VerbdConstants'
import VerbdAEActionTypes from './dictionary/verbd/addedit/VerbdAEActionTypes'

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
            const quizInsertNounFlag = state.getIn(['level','quizQuestions','insertNound'])
            const quizUpdateNounFlag = state.getIn(['level','quizQuestions','updateNound'])
            const quizDeleteNounFlag = state.getIn(['level','quizQuestions','deleteNound'])
            return quizInsertNounFlag && quizUpdateNounFlag && quizDeleteNounFlag
        }

        // Has the quiz for Verb CRUD been completed?
        function verbCRUDQuizPassed(state) {
            const quizInsertVerbFlag = state.getIn(['level','quizQuestions', 'insertVerbd'])
            const quizUpdateVerbFlag = state.getIn(['level','quizQuestions', 'updateVerbd'])
            const quizDeleteVerbFlag = state.getIn(['level','quizQuestions', 'deleteVerbd'])
            return quizInsertVerbFlag && quizUpdateVerbFlag && quizDeleteVerbFlag
        }

        switch (action.type) {
            case AppActionTypes.CHANGE_DEFINITENESS:
                console.log('AppStore CHANGE_DEFINITENESS =',action.newDefiniteness)
                return state

                //console.log('NouniAddEditStore CHANGE_SELECTED_NOUN =',action.newNoun)

            case NouniActionTypes.CHANGE_SELECTED_NOUN:
                console.log('AppStore CHANGE_SELECTED_NOUN =',action.newNoun)
                console.log('AppStore CHANGE_SELECTED_NOUN =',state)

                //return state.nound.set('selectedNounId','n-1')
                //return state.updateIn(['nouni','noun'],value => action.newNoun)
                return state

            //case AppActionTypes.INSERT_NOUNI:
                //const id = Counter.increment()
                //console.log('AppStore INSERT_NOUNI =',action.nouni)

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

            case NoundAEActionTypes.CLICK_SAVE_NOUND:

                newState = state

                newState = (action.nound.id === undefined) ?
                    state.setIn(['level','quizQuestions','insertNound'],true) :
                    state.setIn(['level','quizQuestions','updateNound'],true)

                return newState

            case NoundAEActionTypes.CLICK_DELETE_NOUND:
                newState = state.setIn(['level','quizQuestions','deleteNound'],true)

                if(nounCRUDQuizPassed(newState))
                    newState = newState.setIn(['level','quizResults',newState.getIn(['level','currentLevel'])],true)

                if(localStorageAvailable)
                    localStorage.setItem(localStorageKey, JSON.stringify(newState))

                return newState

            case VerbdAEActionTypes.CLICK_SAVE_VERBD:

                newState = state

                newState = (action.verbd.id === undefined) ?
                    state.setIn(['level','quizQuestions','insertVerbd'],true) :
                    state.setIn(['level','quizQuestions','updateVerbd'],true)

                return newState

            case VerbdAEActionTypes.CLICK_DELETE_VERBD:
                newState = state.setIn(['level','quizQuestions','deleteVerbd'],true)

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
    {noundPanel: NoundPanelLevel.BASE},
    {verbdPanel: VerbdPanelLevel.BASE},
    {noundPanel: NoundPanelLevel.PLURALIZATION},
    {noundPanel: NoundPanelLevel.PLURALIZATION, verbdPanel: VerbdPanelLevel.PAST_TENSE},
    {noundPanel: NoundPanelLevel.PLURALIZATION, verbdPanel: VerbdPanelLevel.PAST_TENSE}, // 5
    {noundPanel: NoundPanelLevel.PLURALIZATION, verbdPanel: VerbdPanelLevel.PAST_TENSE},
    {noundPanel: NoundPanelLevel.PLURALIZATION, verbdPanel: VerbdPanelLevel.PAST_TENSE}

])

AppStore.initialState = Map({
    lang:langCode.zh,       // what language for the UI?
    level: Map({
        currentLevel:0,
        currentAppLevelConfig: AppStore.theLevelConfigs.get(0),
        minLevel:true,      // is this is lowest possible level?
        maxLevel:false,     // is this the highest possible level?
        quizQuestions: new Map({
            insertNound: false,
            updateNound: false,
            deleteNound: false,
            insertVerbd: false,
            updateVerbd: false,
            deleteVerbd: false
        }),
        quizResults: new List().push(false) // Level 00 starts with passed quiz = false
    }),
    nouni: Map()    // nound, instantiated
})
//console.log('n=',JSON.stringify(AppStore.initialState.toJSON()))

export default new AppStore()
