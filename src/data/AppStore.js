import {fromJS, List,Map} from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppActionTypes from './AppActionTypes'
import AppDispatcher  from './AppDispatcher'
import {langCode}     from './I18NConstants'
import NoundAEActionTypes from './dictionary/nound/addedit/NoundAEActionTypes'
import {NoundPanelLevel}  from './dictionary/nound/NoundConstants'
import VerbdAEActionTypes from './dictionary/verbd/addedit/VerbdAEActionTypes'
import {VerbdPanelLevel}  from './dictionary/verbd/VerbdConstants'

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

            case AppActionTypes.LANG_EN:
                newState = state.set('lang',langCode.en)
                break

            case AppActionTypes.LANG_ZH:
                newState = state.set('lang',langCode.zh)
                break

            case AppActionTypes.LEVEL_PREVIOUS:
                newState = state
                if (state.get('currentLevel') > 0) {
                    const newCurrentLevel = state.get('currentLevel') - 1
                    newState = Map({
                        currentLevel:newCurrentLevel,
                        minLevel:newCurrentLevel === 0,
                        maxLevel:false,
                        quiz: false
                    }).set('currentAppLevelConfig', AppStore.theLevelConfigs.get(newCurrentLevel))
                }
                break

            case AppActionTypes.LEVEL_NEXT:
                newState = state
                if(state.getIn(['level','currentLevel']) < AppStore.theLevelConfigs.size-1) {

                    const newCurrentLevel = state.getIn(['level','currentLevel']) + 1
                    const newMaxLevelFlag = newCurrentLevel === AppStore.theLevelConfigs.size-1
                    newState = state.setIn(['level','currentLevel'],newCurrentLevel)
                    newState = newState.setIn(['level','quizResults',0], false) // new level starts as false
                    newState = newState.setIn(['level','minLevel'],false)
                    newState = newState.setIn(['level','maxLevel'],newMaxLevelFlag)
                    newState = newState.setIn(['level','currentAppLevelConfig'], AppStore.theLevelConfigs.get(newCurrentLevel))
                }
                break

            case AppActionTypes.LEVEL_RESET:
                newState = AppStore.initialState
                break

            case AppActionTypes.QUIZ_SETSCORE:
                newState = state.setIn(['level','quizResults',state.getIn(['level','currentLevel'])],action.score)
                break


            // NoundAEActionTypes...
            case NoundAEActionTypes.CLICK_SAVE_NOUND:
                newState = (action.nound.id === undefined) ?
                    state.setIn(['level','quizQuestions','insertNound'],true) :
                    state.setIn(['level','quizQuestions','updateNound'],true)

                if(nounCRUDQuizPassed(newState))
                    newState = newState.setIn(['level','quizResults',newState.getIn(['level','currentLevel'])],true)
                break

            case NoundAEActionTypes.CLICK_DELETE_NOUND:

                newState = state.setIn(['level','quizQuestions','deleteNound'],true)

                if(nounCRUDQuizPassed(newState))
                    newState = newState.setIn(['level','quizResults',newState.getIn(['level','currentLevel'])],true)
                break


            // VerbdAEActionTypes...
            case VerbdAEActionTypes.CLICK_SAVE_VERBD:
                newState = (action.verbd.id === undefined) ?
                    state.setIn(['level','quizQuestions','insertVerbd'],true) :
                    state.setIn(['level','quizQuestions','updateVerbd'],true)

                if(verbCRUDQuizPassed(newState))
                    newState = newState.setIn(['level','quizResults',newState.getIn(['level','currentLevel'])],true)
                break

            case VerbdAEActionTypes.CLICK_DELETE_VERBD:
                newState = state.setIn(['level','quizQuestions','deleteVerbd'],true)

                if(verbCRUDQuizPassed(newState))
                    newState = newState.setIn(['level','quizResults',newState.getIn(['level','currentLevel'])],true)
                break

            default:
                newState = state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState))

        return newState
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

export default new AppStore()
