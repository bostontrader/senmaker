import {ReduceStore} from 'flux/utils'
import {fromJS, Map} from 'immutable'

import QuizActionTypes      from './QuizActionTypes'
import AppDispatcher        from '../AppDispatcher'
import AppActionTypes       from '../app/AppActionTypes'
import AdjectivdActionTypes from '../dictionary/adjectivd/AdjectivdActionTypes'
import NoundActionTypes     from '../dictionary/nound/NoundActionTypes'
import VerbdActionTypes     from '../dictionary/verbd/VerbdActionTypes'
import NPActionTypes        from '../np/NPActionTypes'

import {localStorageAvailable} from '../../LocalStorage'
const localStorageKey = 'QuizStore'

/*
 This store manages all state required to support the quizzes at the end of each lesson.
 */
class QuizStore extends ReduceStore {
    constructor() {
        super(AppDispatcher)
    }

    getInitialState() {

        if (localStorageAvailable) {
            const localStorageState = localStorage.getItem(localStorageKey)

            if(localStorageState)
                return fromJS(JSON.parse(localStorageState))
        }

        return QuizStore.initialState
    }

    reduce(state, action) {
        const noundQuizPassed = (state) => {
            return state.getIn(['nound','updateNound']) &&
            state.getIn(['nound','insertNound']) &&
            state.getIn(['nound','deleteNound'])
        }

        const verbdQuizPassed = (state) => {
            return state.getIn(['verbd','updateVerbd']) &&
                state.getIn(['verbd','insertVerbd']) &&
                state.getIn(['verbd','deleteVerbd'])
        }

        const adjectivdQuizPassed = (state) => {
            return state.getIn(['adjectivd','updateAdjectivd']) &&
                state.getIn(['adjectivd','insertAdjectivd']) &&
                state.getIn(['adjectivd','deleteAdjectivd'])
        }

        const definitenessQuizPassed = (state) => {
            return state.getIn(['definiteness','definitenessChanged']) &&
                state.getIn(['definiteness','noundChanged']) &&
                state.getIn(['definiteness','iseeArticleChanged'])
        }

        const npQuizPassed = (state) => {
            return state.getIn(['np','updateNP']) &&
                state.getIn(['np','insertNP']) &&
                state.getIn(['np','deleteNP'])
        }
        
        let newState = state

        switch (action.type) {

            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = QuizStore.initialState
                break

            // 0. intro
            case QuizActionTypes.intro.ON_I_UNDERSTAND:
                newState = newState.setIn(['intro','iunderstand'],true)
                newState = newState.setIn(['intro','passed'],true)
                break

            // 1. nound
            case NoundActionTypes.ON_CLICK_SAVE_NOUND:
                if(action.nound.id) { // if an id is present then this is an update
                    newState = newState.setIn(['nound','updateNound'],true)
                    newState = newState.setIn(['nound','passed'],noundQuizPassed(newState))
                } else { // otherwise it's an insert
                    newState = newState.setIn(['nound','insertNound'],true)
                    newState = newState.setIn(['nound','passed'],noundQuizPassed(newState))
                }
                break

            case NoundActionTypes.ON_CLICK_DELETE_NOUND:
                newState = newState.setIn(['nound','deleteNound'],true)
                newState = newState.setIn(['nound','passed'],noundQuizPassed(newState))
                break

            // 2. verbd
            case VerbdActionTypes.ON_CLICK_SAVE_VERBD:
                if(action.verbd.id) { // if an id is present then this is an update
                    newState = newState.setIn(['verbd','updateVerbd'],true)
                    newState = newState.setIn(['verbd','passed'],verbdQuizPassed(newState))
                } else { // otherwise it's an insert
                    newState = newState.setIn(['verbd','insertVerbd'],true)
                    newState = newState.setIn(['verbd','passed'],verbdQuizPassed(newState))
                }
                break

            case VerbdActionTypes.ON_CLICK_DELETE_VERBD:
                newState = newState.setIn(['verbd','deleteVerbd'],true)
                newState = newState.setIn(['verbd','passed'],verbdQuizPassed(newState))
                break

            // 3. adjectivd
            case AdjectivdActionTypes.ON_CLICK_SAVE_ADJECTIVD:
                if(action.adjectivd.id) { // if an id is present then this is an update
                    newState = newState.setIn(['adjectivd','updateAdjectivd'],true)
                    newState = newState.setIn(['adjectivd','passed'],adjectivdQuizPassed(newState))
                } else { // otherwise it's an insert
                    newState = newState.setIn(['adjectivd','insertAdjectivd'],true)
                    newState = newState.setIn(['adjectivd','passed'],adjectivdQuizPassed(newState))
                }
                break

            case AdjectivdActionTypes.ON_CLICK_DELETE_ADJECTIVD:
                newState = newState.setIn(['adjectivd','deleteAdjectivd'],true)
                newState = newState.setIn(['adjectivd','passed'],adjectivdQuizPassed(newState))
                break

            // 4. definiteness
            case NPActionTypes.ON_CHANGE_SELECTED_NOUND:
                newState = newState.setIn(['definiteness','noundChanged'],true)
                newState = newState.setIn(['definiteness','passed'],definitenessQuizPassed(newState))
                break

            // For the quiz we only care if the definiteness has changed, not which particular new value it changed to.
            case NPActionTypes.ON_CHANGE_DEFINITENESS:
                newState = newState.setIn(['definiteness','definitenessChanged'],true)
                newState = newState.setIn(['definiteness','passed'],definitenessQuizPassed(newState))
                break

            case QuizActionTypes.definiteness.ON_ISEE_CHANGE_ARTICLE:
                newState = newState.setIn(['definiteness','iseeArticleChanged'],true)
                newState = newState.setIn(['definiteness','passed'],definitenessQuizPassed(newState))
                break

            // 5. phrases
            case QuizActionTypes.phrase.ON_I_UNDERSTAND:
                newState = newState.setIn(['phrase','iunderstand'],true)
                newState = newState.setIn(['phrase','passed'],true)
                break

            // 6. nounPhrases
            case NPActionTypes.ON_CLICK_SAVE_NP:
                if(action.np.id) { // if an id is present then this is an update
                    newState = newState.setIn(['np','updateNP'],true)
                    newState = newState.setIn(['np','passed'],npQuizPassed(newState))
                } else { // otherwise it's an insert
                    newState = newState.setIn(['np','insertNP'],true)
                    newState = newState.setIn(['np','passed'],npQuizPassed(newState))
                }
                break

            // 7. verbConjugation
            case QuizActionTypes.verbConjugation.ON_I_UNDERSTAND:
                newState = newState.setIn(['verbConjugation','iunderstand'],true)
                newState = newState.setIn(['verbConjugation','passed'],true)
                break

            // 10. sentences
            case QuizActionTypes.sentence.ON_I_UNDERSTAND:
                newState = newState.setIn(['sentence','iunderstand'],true)
                newState = newState.setIn(['sentence','passed'],true)
                break

            // 11. pluralization
            case QuizActionTypes.pluralization.ON_I_UNDERSTAND:
                newState = newState.setIn(['pluralization','iunderstand'],true)
                newState = newState.setIn(['pluralization','passed'],true)
                break

            case NPActionTypes.ON_CLICK_DELETE_NP:
                newState = newState.setIn(['np','deleteNP'],true)
                newState = newState.setIn(['np','passed'],npQuizPassed(newState))
                break

            default:
                // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

QuizStore.initialState = Map({
    intro: Map({
        iunderstand: false,
        passed: false
    }),
    nound: Map({
        insertNound: false,
        updateNound: false,
        deleteNound: false,
        passed: false
    }),
    verbd: Map({
        insertVerbd: false,
        updateVerbd: false,
        deleteVerbd: false,
        passed: false
    }),
    adjectivd: Map({
        insertAdjectivd: false,
        updateAdjectivd: false,
        deleteAdjectivd: false,
        passed: false
    }),
    definiteness: Map({
        definitenessChanged: false,
        noundChanged       : false,
        iseeArticleChanged : false,
        passed: false
    }),
    phrase: Map({
        iunderstand: false,
        passed: false
    }),
    verbConjugation: Map({
        iunderstand: false,
        passed: false
    }),
    np: Map({
        insertNP: false,
        updateNP: false,
        deleteNP: false,
        passed: false
    }),
    sentence: Map({
        iunderstand: false,
        passed: false
    }),
    pluralization: Map({
        iunderstand: false,
        passed: false
    }),
})

export default new QuizStore()
