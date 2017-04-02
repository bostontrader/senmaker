import {fromJS, Map} from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppActionTypes from './AppActionTypes'
import AppDispatcher  from './AppDispatcher'
import {langCode}     from './I18NConstants'

import Nound              from './dictionary/nound/Nound'
//import NoundActionTypes   from './dictionary/nound/NoundActionTypes'
//import NoundAEActionTypes from './dictionary/nound/addedit/NoundAEActionTypes'
//import {NoundPanelLevel}  from './dictionary/nound/NoundConstants'
//import VerbdAEActionTypes from './dictionary/verbd/addedit/VerbdAEActionTypes'
//import {VerbdPanelLevel}  from './dictionary/verbd/VerbdConstants'
//import NouniAEActionTypes from './nouni/addedit/NouniAEActionTypes'
import {localStorageAvailable} from '../LocalStorage'
import Syllabus from './syllabus/Syllabus'

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
                return fromJS(JSON.parse(localStorageState))
        }

        return AppStore.initialState

    }
    
    reduce(state, action) {

        //console.log('AppStore reduce',action)
        let newState = state

        // Has the quiz for Level01 Noun CRUD been completed?
        //function nounCRUDQuizPassed(state) {
            //const quizInsertNounFlag = state.getIn(['level','quizQuestions','insertNound'])
            //const quizUpdateNounFlag = state.getIn(['level','quizQuestions','updateNound'])
            //const quizDeleteNounFlag = state.getIn(['level','quizQuestions','deleteNound'])
            //return quizInsertNounFlag && quizUpdateNounFlag && quizDeleteNounFlag
        //}

        // Has the quiz for Level02 Verb CRUD been completed?
        //function verbCRUDQuizPassed(state) {
            //const quizInsertVerbFlag = state.getIn(['level','quizQuestions', 'insertVerbd'])
            //const quizUpdateVerbFlag = state.getIn(['level','quizQuestions', 'updateVerbd'])
            //const quizDeleteVerbFlag = state.getIn(['level','quizQuestions', 'deleteVerbd'])
            //return quizInsertVerbFlag && quizUpdateVerbFlag && quizDeleteVerbFlag
        //}

        // Has the quiz for Level03 Nouni been completed?
        // Has the quiz for Level03 Nouni been completed?
        // As an ugly hack, omit noundChanged.  There's a problem with testing this
        // and I don't want this to hold me up.  Instead, wait for free-search to find the answer.
        //function nouniQuizPassed(state) {
            //return (
                //state.getIn(['level','quizQuestions', 'definitenessChanged']) &&
                //state.getIn(['level','quizQuestions', 'noundChanged']) &&
                //state.getIn(['level','quizQuestions', 'iseeArticleChanged'])
            //)
        //}

        switch (action.type) {

            // AppActionTypes
            //case AppActionTypes.LANG_EN:
                //newState = state.set('lang',langCode.en)
                //break

            //case AppActionTypes.LANG_ZH:
                //newState = state.set('lang',langCode.zh)
                //break

            //case AppActionTypes.LEVEL_PREVIOUS:
                //newState = state
                //if (state.get('currentLevel') > 0) {
                    //const newCurrentLevel = state.get('currentLevel') - 1
                    //newState = Map({
                        //currentLevel:newCurrentLevel,
                        //minLevel:newCurrentLevel === 0,
                        //maxLevel:false,
                        //quiz: false
                    //}).set('currentAppLevelConfig', AppStore.theLevelConfigs.get(newCurrentLevel))
                //}
                //break

            case AppActionTypes.ON_LESSON_NEXT:

                //console.log('AppStore',state)
                // 1. Determine the name of the next lesson and/or set suitable
                // flags to signal that we're at the last lesson.
                function *lessonGenerator() {for(let n in Syllabus) {yield n}}

                let nextEntryFound = false
                let syllabusEntry = {done:false}
                let gen = lessonGenerator()
                while ( !nextEntryFound && !syllabusEntry.done) {
                    syllabusEntry = gen.next()
                    // if this entry matches the current level...
                    if (syllabusEntry.value === state.getIn(['level','currentLesson'])) {
                        // then next again to find the next lesson
                        syllabusEntry = gen.next()
                        nextEntryFound = true // found it
                    } else {
                        // keep going. but are we at the end?
                        // syllabusEntry.done will signal if so
                    }
                }

                newState = state

                // If the current level is the last level then the UI should
                // not present a choice to advance to the non-existent next level.
                // Nevertheless, catch that here also.
                const lessonCount  = Object.keys(Syllabus).length
                const currentLevel = state.getIn(['level','currentLevel'])
                if(currentLevel < lessonCount-1) {
                    const newCurrentLevel = currentLevel + 1

                    newState = newState.setIn(['level','currentLevel'],newCurrentLevel)
                    newState = newState.setIn(['level','currentLesson'],syllabusEntry.value)
                    newState = newState.setIn(['level','firstLesson'],false)
                    newState = newState.setIn(['level','lastLesson'],newCurrentLevel >= lessonCount -1)
                }
                //console.log('AppStore ',newState)
                break

            //case AppActionTypes.LEVEL_RESET:
                //newState = AppStore.initialState
                //break

            //case AppActionTypes.QUIZ_SETSCORE:
                //newState = state.setIn(['level','quizResults',state.getIn(['level','currentLevel'])],action.score)
                //break


            // NoundActiontypes
            //case NoundActionTypes.ON_CHANGE_SELECTED_NOUND:
                //newState = state.set('mostRecentlySelectedNound',action.nound)
                //newState = newState.setIn(['level','quizQuestions','noundChanged'],true)
                //if(nouniQuizPassed(newState))
                    //newState = newState.setIn(['level','quizResults',newState.getIn(['level','currentLevel'])],true)
                //break

            // NoundAEActionTypes...
            //case NoundAEActionTypes.CLICK_SAVE_NOUND:
                //newState = (action.nound.id === undefined) ?
                    //state.setIn(['level','quizQuestions','insertNound'],true) :
                    //state.setIn(['level','quizQuestions','updateNound'],true)

                //if(nounCRUDQuizPassed(newState))
                    //newState = newState.setIn(['level','quizResults',newState.getIn(['level','currentLevel'])],true)
                //break

            //case NoundAEActionTypes.CLICK_DELETE_NOUND:

                //newState = state.setIn(['level','quizQuestions','deleteNound'],true)

                //if(nounCRUDQuizPassed(newState))
                    //newState = newState.setIn(['level','quizResults',newState.getIn(['level','currentLevel'])],true)
                //break

            // NouniAEActionTypes
            //case NouniAEActionTypes.ON_CHANGE_DEFINITENESS:
                //newState = state.setIn(['level','quizQuestions','definitenessChanged'],true)
                //if(nouniQuizPassed(newState))
                    //newState = newState.setIn(['level','quizResults',newState.getIn(['level','currentLevel'])],true)
                //break

            // VerbdAEActionTypes...
            //case VerbdAEActionTypes.CLICK_SAVE_VERBD:
                //newState = (action.verbd.id === undefined) ?
                    //state.setIn(['level','quizQuestions','insertVerbd'],true) :
                    //state.setIn(['level','quizQuestions','updateVerbd'],true)

                //if(verbCRUDQuizPassed(newState))
                    //newState = newState.setIn(['level','quizResults',newState.getIn(['level','currentLevel'])],true)
                //break

            //case VerbdAEActionTypes.CLICK_DELETE_VERBD:
                //newState = state.setIn(['level','quizQuestions','deleteVerbd'],true)

                //if(verbCRUDQuizPassed(newState))
                    //newState = newState.setIn(['level','quizResults',newState.getIn(['level','currentLevel'])],true)
                //break

            default:
                newState = state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState))

        return newState
    }
}

AppStore.initialState = Map({
    lang:langCode.zh,       // what language for the UI?
    level: Map({
        currentLevel:0,         // these two should
        currentLesson:'intro',  // should stay in sync
        firstLesson:true,       // is this the first lesson?
        lastLesson:false,
    }),
    mostRecentlySelectedNound:Nound()
})

export default new AppStore()
