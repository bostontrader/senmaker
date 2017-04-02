import {ReduceStore} from 'flux/utils'
import {Map} from 'immutable'

import QuizActionTypes from './QuizActionTypes'
import AppDispatcher   from '../AppDispatcher'
import NoundActionTypes from '../dictionary/nound/NoundActionTypes'

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
            localStorage.removeItem(localStorageKey)
            const localStorageState = localStorage.getItem(localStorageKey)

            if(localStorageState)
                return fromJS(JSON.parse(localStorageState))
        }

        return Map({
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
            definiteness: Map({
                definitenessChanged: false,
                noundChanged       : false,
                iseeArticleChanged : false,
                passed: false
            })
        })
    }

    reduce(state, action) {

        const noundQuizPassed = (state) => {
            return state.getIn(['nound','updateNound']) &&
            state.getIn(['nound','insertNound']) &&
            state.getIn(['nound','deleteNound'])
        }

        let newState = state

        switch (action.type) {

            // 1. intro
            case QuizActionTypes.intro.ON_I_UNDERSTAND:
                newState = newState.setIn(['intro','iunderstand'],true)
                newState = newState.setIn(['intro','passed'],true)
                break

            // 2. nound
            case QuizActionTypes.nound.ON_CLICK_SAVE_NOUND:
                if(action.nound.id) { // if an id is present then this is an update
                    newState = newState.setIn(['nound','updateNound'],true)
                    newState = newState.setIn(['nound','passed'],noundQuizPassed(newState))
                } else { // otherwise it's an insert
                    newState = newState.setIn(['nound','insertNound'],true)
                    newState = newState.setIn(['nound','passed'],noundQuizPassed(newState))
                }
                break

            case QuizActionTypes.nound.ON_CLICK_DELETE_NOUND:
                newState = newState.setIn(['nound','deleteNound'],true)
                newState = newState.setIn(['nound','passed'],noundQuizPassed(newState))
                break

            // 3. verbd
            case QuizActionTypes.verbd.ON_CLICK_SAVE_VERBD:
                if(action.verbd.id) { // if an id is present then this is an update
                    newState = newState.setIn(['verbd','updateVerbd'],true)
                    newState = newState.setIn(['verbd','passed'],verbdQuizPassed(newState))
                } else { // otherwise it's an insert
                    newState = newState.setIn(['verbd','insertVerbd'],true)
                    newState = newState.setIn(['verbd','passed'],verbdQuizPassed(newState))
                }
                break

            case QuizActionTypes.verbd.ON_CLICK_DELETE_VERBD:
                newState = newState.setIn(['verbd','deleteVerbd'],true)
                newState = newState.setIn(['verbd','passed'],verbdQuizPassed(newState))
                break
            
            default:
                newState = state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState))

        return newState
    }
}

export default new QuizStore()
