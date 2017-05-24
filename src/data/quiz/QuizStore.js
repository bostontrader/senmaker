// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import QuizActionTypes      from './QuizActionTypes'
import AppDispatcher        from '../AppDispatcher'
import AppActionTypes       from '../app/AppActionTypes'
import AdjectivdActionTypes from '../dictionary/adjectivd/AdjectivdActionTypes'
import NoundActionTypes     from '../dictionary/nound/NoundActionTypes'
import VerbdActionTypes     from '../dictionary/verbd/VerbdActionTypes'
import NPActionTypes        from '../np/NPActionTypes'

import {localStorageAvailable} from '../LocalStorage'
const localStorageKey:string = 'QuizStore'

// We want to provide a migration capacity for the format of this store.  It's serialized
// into localStorage and there's no telling when old versions will be seen in the future.
const initialStates:Array<Object> = [
    Map({
        intro: Map({ // 0
            iunderstand: false,
            passed: false
        }),
        nound: Map({ // 1
            insertNound: false,
            updateNound: false,
            deleteNound: false,
            passed: false
        }),
        definiteness: Map({ // 2
            definitenessChanged: false,
            noundChanged       : false,
            iseeArticleChanged : false,
            passed: false
        }),
        phrase: Map({ // 3
            iunderstand: false,
            passed: false
        }),
        np: Map({ // 4
            insertNP: false,
            updateNPNound: false,
            updateNPDefiniteness: false,
            deleteNP: false,
            passed: false
        }),
        adjectivd: Map({ // 5
            insertAdjectivd: false,
            updateAdjectivd: false,
            deleteAdjectivd: false,
            passed: false
        }),
        npAdjective: Map({ // 6
            addAdjectivd: false,
            removeAdjectivd: false,
            addTwoAdjectives: false,
            passed: false
        }),
        verbd: Map({ // 7
            insertVerbd: false,
            updateVerbd: false,
            deleteVerbd: false,
            passed: false
        })
    }),
    Map({
        v:1,
        intro: Map({ // 0
            iunderstand: false,
            passed: false
        }),
        nound: Map({ // 1
            insertNound: false,
            updateNound: false,
            deleteNound: false,
            passed: false
        }),
        definiteness: Map({ // 2
            definitenessChanged: false,
            noundChanged       : false,
            iseeArticleChanged : false,
            passed: false
        }),
        phrase: Map({ // 3
            iunderstand: false,
            passed: false
        }),
        np: Map({ // 4
            insertNP: false,
            updateNPNound: false,
            updateNPDefiniteness: false,
            deleteNP: false,
            passed: false
        }),
        adjectivd: Map({ // 5
            insertAdjectivd: false,
            updateAdjectivd: false,
            deleteAdjectivd: false,
            passed: false
        }),
        npAdjective: Map({ // 6
            addAdjectivd: false,
            removeAdjectivd: false,
            addTwoAdjectives: false,
            passed: true
        }),
        verbd: Map({ // 7
            insertVerbd: false,
            updateVerbd: false,
            deleteVerbd: false,
            passed: false
        }),
        verbConjugation: Map({ // 8
            iunderstand: false,
            passed: false
        })
    }),
    Map({
        v:2,
        intro: Map({ // 0
            iunderstand: false,
            passed: false
        }),
        nound: Map({ // 1
            insertNound: false,
            updateNound: false,
            deleteNound: false,
            passed: false
        }),
        definiteness: Map({ // 2
            definitenessChanged: false,
            noundChanged       : false,
            iseeArticleChanged : false,
            passed: false
        }),
        phrase: Map({ // 3
            iunderstand: false,
            passed: false
        }),
        np: Map({ // 4
            insertNP: false,
            updateNPNound: false,
            updateNPDefiniteness: false,
            deleteNP: false,
            passed: false
        }),
        adjectivd: Map({ // 5
            insertAdjectivd: false,
            updateAdjectivd: false,
            deleteAdjectivd: false,
            passed: false
        }),
        npAdjective: Map({ // 6
            addAdjectivd: false,
            removeAdjectivd: false,
            addTwoAdjectives: false,
            passed: false
        }),
        verbd: Map({ // 7
            insertVerbd: false,
            updateVerbd: false,
            deleteVerbd: false,
            passed: false
        }),
        verbConjugation: Map({ // 8
            iunderstand: false,
            passed: false
        }),
        pastForm: Map({ // 9
            iunderstand: false,
            passed: false
        }),
        verbTime: Map({ // 10
            iunderstand: false,
            passed: false
        }),
        vp: Map({ // 11
            insertVP: false,
            changeVPNound: false,
            changeVerbTime: false,
            deleteVP: false,
            passed: false
        })

    })
]

/*
 This store manages all state required to support the quizzes at the end of each lesson.
 */
class QuizStore extends ReduceStore {

    constructor() {super(AppDispatcher)}


    getInitialState():Object {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState)
                return this.migrate(fromJS(JSON.parse(localStorageState)))
        }

        return initialStates.slice(-1)[0]
    }

    // Given an originalFormat state object, as retrieved from local storage,
    // migrate to the most current version.
    migrate(originalFormat:Object):Object {
        const currentInitialState:Object = initialStates.slice(-1)[0]
        const originalVersion:number = originalFormat.getIn(['v'])

        // If the version is undefined then we start fresh
        if(originalVersion === undefined)
            return currentInitialState

        // If the version is the most recent then use it
        if (originalVersion === currentInitialState.getIn(['v']))
            return originalFormat

        // Else migrate from the originalVersion to the current version
        const currentVersion:number = currentInitialState.getIn(['v'])
        let p = originalVersion
        while(p < currentVersion)
            console.log(p++)
        return originalFormat
    }

    reduce(state:Object, action:Object):Object {

        // 1
        const noundQuizPassed:Function = (state:Object):boolean => {
            return(
                state.getIn(['nound','updateNound']) &&
                state.getIn(['nound','insertNound']) &&
                state.getIn(['nound','deleteNound'])
            )
        }

        // 2
        const definitenessQuizPassed:Function = (state:Object):boolean => {
            return(
                state.getIn(['definiteness','definitenessChanged']) &&
                state.getIn(['definiteness','noundChanged']) &&
                state.getIn(['definiteness','iseeArticleChanged'])
            )
        }

        // 4
        const npQuizPassed:Function = (state:Object):boolean => {
            return(
                state.getIn(['np','insertNP']) &&
                state.getIn(['np','updateNPNound']) &&
                state.getIn(['np','updateNPDefiniteness']) &&
                state.getIn(['np','deleteNP'])
            )
        }

        // 5
        const adjectivdQuizPassed:Function = (state:Object):boolean => {
            return(
                state.getIn(['adjectivd','updateAdjectivd']) &&
                state.getIn(['adjectivd','insertAdjectivd']) &&
                state.getIn(['adjectivd','deleteAdjectivd'])
            )
        }

        // 6 npAdjectiveQuizPassed

        // 7
        const verbdQuizPassed:Function = (state:Object):boolean => {
            return(
                state.getIn(['verbd','updateVerbd']) &&
                state.getIn(['verbd','insertVerbd']) &&
                state.getIn(['verbd','deleteVerbd'])
            )
        }

        let newState:Object = state

        switch (action.type) {

            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = initialStates.slice(-1)[0]
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

            // 2. definiteness
            case NPActionTypes.ON_CHANGE_SELECTED_NOUND_L1:
                newState = newState.setIn(['definiteness','noundChanged'],true)
                newState = newState.setIn(['definiteness','passed'],definitenessQuizPassed(newState))
                break

            // For the quiz we only care if the definiteness has changed, not which particular new value it changed to.
            case NPActionTypes.ON_CHANGE_DEFINITENESS_L1:
                newState = newState.setIn(['definiteness','definitenessChanged'],true)
                newState = newState.setIn(['definiteness','passed'],definitenessQuizPassed(newState))
                break

            case QuizActionTypes.definiteness.ON_ISEE_CHANGE_ARTICLE:
                newState = newState.setIn(['definiteness','iseeArticleChanged'],true)
                newState = newState.setIn(['definiteness','passed'],definitenessQuizPassed(newState))
                break

            // 3. phrase
            case QuizActionTypes.phrase.ON_I_UNDERSTAND:
                newState = newState.setIn(['phrase','iunderstand'],true)
                newState = newState.setIn(['phrase','passed'],true)
                break

            // 4. np
            case NPActionTypes.ON_CLICK_SAVE_NP:
                //if(action.np.id) { // if an id is present then this is an update
                    //newState = newState.setIn(['np','updateNP'],true)
                    //newState = newState.setIn(['np','passed'],npQuizPassed(newState))
                //} else { // otherwise it's an insert
                    newState = newState.setIn(['np','insertNP'],true)
                    newState = newState.setIn(['np','passed'],npQuizPassed(newState))
                //}
                break

            case NPActionTypes.ON_CHANGE_SELECTED_NOUND_L2:
                newState = newState.setIn(['np','updateNPNound'],true)
                newState = newState.setIn(['np','passed'],npQuizPassed(newState))
                break

            // For the quiz we only care if the definiteness has changed, not which particular new value it changed to.
            case NPActionTypes.ON_CHANGE_DEFINITENESS_L2:
                newState = newState.setIn(['np','updateNPDefiniteness'],true)
                newState = newState.setIn(['np','passed'],npQuizPassed(newState))
                break

            case NPActionTypes.ON_CLICK_DELETE_NP:
                newState = newState.setIn(['np','deleteNP'],true)
                newState = newState.setIn(['np','passed'],npQuizPassed(newState))
                break

            // 5. adjectivd
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

            // 6. npAdjective

            // 7. verbd
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

            // 8. verbConjugation
            case QuizActionTypes.verbConjugation.ON_I_UNDERSTAND:
                newState = newState.setIn(['verbConjugation','iunderstand'],true)
                newState = newState.setIn(['verbConjugation','passed'],true)
                break

            // 10. verbTime
            case QuizActionTypes.verbTime.ON_I_UNDERSTAND:
                newState = newState.setIn(['verbTime','iunderstand'],true)
                newState = newState.setIn(['verbTime','passed'],true)
                break
            
            // 10. sentences
            /*case QuizActionTypes.sentence.ON_I_UNDERSTAND:
                newState = newState.setIn(['sentence','iunderstand'],true)
                newState = newState.setIn(['sentence','passed'],true)
                break

            // 11. pluralization
            case QuizActionTypes.pluralization.ON_I_UNDERSTAND:
                newState = newState.setIn(['pluralization','iunderstand'],true)
                newState = newState.setIn(['pluralization','passed'],true)
                break

*/

            default:
                // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}


export default new QuizStore()
