import {ReduceStore} from 'flux/utils'
import {fromJS, Map} from 'immutable'

import QuizActionTypes      from './QuizActionTypes'
import AppDispatcher        from '../AppDispatcher'
import AppActionTypes       from '../app/AppActionTypes'
import AdjectivdActionTypes from '../dictionary/adjectivd/AdjectivdActionTypes'
import NoundActionTypes     from '../dictionary/nound/NoundActionTypes'
import VerbdActionTypes     from '../dictionary/verbd/VerbdActionTypes'
import NouniAEActionTypes   from '../nouni/addedit/NouniAEActionTypes'

import {localStorageAvailable} from '../../LocalStorage'
const localStorageKey = 'QuizStore'

/*
 This store manages all state required to support the quizzes at the end of each lesson.
 */
class QuizStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
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
        
        let newState = state

        switch (action.type) {

            case AppActionTypes.ON_APP_RESET:
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
            case NoundActionTypes.ON_CHANGE_SELECTED_NOUND:
                newState = newState.setIn(['definiteness','noundChanged'],true)
                newState = newState.setIn(['definiteness','passed'],definitenessQuizPassed(newState))
                break

            // For the quiz we only care if the definiteness has changed, not which particular new value it changed to.
            case NouniAEActionTypes.ON_CHANGE_DEFINITENESS:
                newState = newState.setIn(['definiteness','definitenessChanged'],true)
                newState = newState.setIn(['definiteness','passed'],definitenessQuizPassed(newState))
                break

            case QuizActionTypes.definiteness.ON_ISEE_CHANGE_ARTICLE:
                newState = newState.setIn(['definiteness','iseeArticleChanged'],true)
                newState = newState.setIn(['definiteness','passed'],definitenessQuizPassed(newState))
                break

            // 5. nouni
            case QuizActionTypes.nouni.ON_I_UNDERSTAND:
                newState = newState.setIn(['nouni','iunderstand'],true)
                newState = newState.setIn(['nouni','passed'],true)
                break
            
            // 6. phrases
            case QuizActionTypes.phrases.ON_I_UNDERSTAND:
                newState = newState.setIn(['phrases','iunderstand'],true)
                newState = newState.setIn(['phrases','passed'],true)
                break

            // 7. nounPhrases
            case QuizActionTypes.nounPhrases.ON_I_UNDERSTAND:
                newState = newState.setIn(['nounPhrases','iunderstand'],true)
                newState = newState.setIn(['nounPhrases','passed'],true)
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
    nouni: Map({
        iunderstand: false,
        passed: false
    }),
    phrases: Map({
        iunderstand: false,
        passed: false
    }),
    nounPhrases: Map({
        iunderstand: false,
        passed: false
    })
})

export default new QuizStore()
