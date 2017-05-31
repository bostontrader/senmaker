// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import QuizActionTypes         from './QuizActionTypes'
import AppDispatcher           from '../AppDispatcher'
import AppActionTypes          from '../app/AppActionTypes'
import AdjectivdActionTypes    from '../dictionary/adjectivd/AdjectivdActionTypes'
import AdverbdActionTypes      from '../dictionary/adverbd/AdverbdActionTypes'
import ConjunctiondActionTypes from '../dictionary/conjunctiond/ConjunctiondActionTypes'
import DeterminerdActionTypes  from '../dictionary/determinerd/DeterminerdActionTypes'
import NoundActionTypes        from '../dictionary/nound/NoundActionTypes'
import PrepositiondActionTypes from '../dictionary/prepositiond/PrepositiondActionTypes'
import PronoundActionTypes     from '../dictionary/pronound/PronoundActionTypes'
import VerbdActionTypes        from '../dictionary/verbd/VerbdActionTypes'
import NPActionTypes           from '../np/NPActionTypes'
import VPActionTypes           from '../vp/VPActionTypes'

import {localStorageAvailable} from '../LocalStorage'
import {migrateNG}             from '../LocalStorage'
const localStorageKey:string = 'QuizStore'

// This is how it starts in the very beginning.
const factoryReset:Object = Map({
    v:0,

    // The 8 word types
    adjectivd: Map({
        insertAdjectivd: false,
        updateAdjectivd: false,
        deleteAdjectivd: false,
        passed: false
    }),

    adverbd: Map({
        insertAdverbd: false,
        updateAdverbd: false,
        deleteAdverbd: false,
        passed: false
    }),

    conjunctiond: Map({
        insertConjunctiond: false,
        updateConjunctiond: false,
        deleteConjunctiond: false,
        passed: false
    }),

    determinerd: Map({
        insertDeterminerd: false,
        updateDeterminerd: false,
        deleteDeterminerd: false,
        passed: false
    }),

    nound: Map({
        insertNound: false,
        updateNound: false,
        deleteNound: false,
        passed: false
    }),

    prepositiond: Map({
        insertPrepositiond: false,
        updatePrepositiond: false,
        deletePrepositiond: false,
        passed: false
    }),

    pronound: Map({
        insertPronound: false,
        updatePronound: false,
        deletePronound: false,
        passed: false
    }),

    verbd: Map({
        insertVerbd: false,
        updateVerbd: false,
        deleteVerbd: false,
        passed: false
    }),


    // Other
    clause: Map({
        iunderstand: false,
        passed: false
    }),

    definiteness: Map({
        definitenessChanged: false,
        noundChanged       : false,
        iseeArticleChanged : false,
        passed: false
    }),

    intro: Map({
        iunderstand: false,
        passed: false
    }),

    np: Map({
        insertNP: false,
        updateNPNound: false,
        updateNPDefiniteness: false,
        deleteNP: false,
        passed: false
    }),

    npAdjective: Map({
        iunderstand: false,
        addAdjectivd: false,
        removeAdjectivd: false,
        addTwoAdjectives: false,
        passed: false
    }),

    pastForm: Map({
        iunderstand: false,
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

    verbTime: Map({
        iunderstand: false,
        passed: false
    }),

    vp: Map({
        insertVP: false,
        changeVPVerbd: false,
        changeVerbTime: false,
        deleteVP: false,
        passed: false
    })

})

// mutators[0] will mutate priorTemplate from v0 to v1
const mutators:Array<Function> = []

// This is what the structure should look like when finished.
// We only need this for testing.
const currentStateTemplate:Object = factoryReset // this means no migrations yet

/*
 This store manages all state required to support the quizzes at the end of each lesson.
 */
class QuizStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState)
                return migrateNG(fromJS(JSON.parse(localStorageState)), mutators, factoryReset)
        }

        return migrateNG(factoryReset, mutators, factoryReset)
    }

    reduce(state:Object, action:Object):Object {

        // The 8 types of words
        const clickSaveWord:Function = (newState:Object, wordType:string) => {
            const ucWordType:string = wordType.charAt(0).toUpperCase() + wordType.slice(1)
            if(action[wordType].id) { // if an id is present then this is an update
                newState = newState.setIn([wordType,'update' + ucWordType],true)
                newState = newState.setIn([wordType,'passed'],wordQuizPassed(newState, wordType))
            } else { // otherwise it's an insert
                newState = newState.setIn([wordType,'insert' + ucWordType],true)
                newState = newState.setIn([wordType,'passed'],wordQuizPassed(newState, wordType))
            }
            return newState
        }

        const wordQuizPassed:Function = (state:Object, wordType:string):boolean => {
            const ucWordType:string = wordType.charAt(0).toUpperCase() + wordType.slice(1)
            return(
                state.getIn([wordType,'update' + ucWordType]) &&
                state.getIn([wordType,'insert' + ucWordType]) &&
                state.getIn([wordType,'delete' + ucWordType])
            )
        }

        // Other
        const definitenessQuizPassed:Function = (state:Object):boolean => {
            return(
                state.getIn(['definiteness','definitenessChanged']) &&
                state.getIn(['definiteness','noundChanged']) &&
                state.getIn(['definiteness','iseeArticleChanged'])
            )
        }

        const npQuizPassed:Function = (state:Object):boolean => {
            return(
                state.getIn(['np','insertNP']) &&
                state.getIn(['np','updateNPNound']) &&
                state.getIn(['np','updateNPDefiniteness']) &&
                state.getIn(['np','deleteNP'])
            )
        }

        const vpQuizPassed:Function = (state:Object):boolean => {
            return(
                state.getIn(['vp','insertVP']) &&
                state.getIn(['vp','changeVPVerbd']) &&
                state.getIn(['vp','changeVerbTime']) &&
                state.getIn(['vp','deleteVP'])
            )
        }

        let newState:Object = state

        switch (action.type) {

            // The 8 word types
            case AdjectivdActionTypes.ON_CLICK_SAVE_ADJECTIVD:
                newState = clickSaveWord(newState, 'adjectivd')
                break

            case AdjectivdActionTypes.ON_CLICK_DELETE_ADJECTIVD:
                newState = newState.setIn(['adjectivd','deleteAdjectivd'],true)
                newState = newState.setIn(['adjectivd','passed'],wordQuizPassed(newState, 'adjectivd'))
                break

            case AdverbdActionTypes.ON_CLICK_SAVE_ADVERBD:
                newState = clickSaveWord(newState, 'adverbd')
                break

            case AdverbdActionTypes.ON_CLICK_DELETE_ADVERBD:
                newState = newState.setIn(['adverbd','deleteAdverbd'],true)
                newState = newState.setIn(['adverbd','passed'],wordQuizPassed(newState, 'adverbd'))
                break

            case ConjunctiondActionTypes.ON_CLICK_SAVE_CONJUNCTIOND:
                newState = clickSaveWord(newState, 'conjunctiond')
                break

            case ConjunctiondActionTypes.ON_CLICK_DELETE_CONJUNCTIOND:
                newState = newState.setIn(['conjunctiond','deleteConjunctiond'],true)
                newState = newState.setIn(['conjunctiond','passed'],wordQuizPassed(newState, 'conjunctiond'))
                break

            case DeterminerdActionTypes.ON_CLICK_SAVE_DETERMINERD:
                newState = clickSaveWord(newState, 'determinerd')
                break

            case DeterminerdActionTypes.ON_CLICK_DELETE_DETERMINERD:
                newState = newState.setIn(['determinerd','deleteDeterminerd'],true)
                newState = newState.setIn(['determinerd','passed'],wordQuizPassed(newState, 'determinerd'))
                break
            
            case NoundActionTypes.ON_CLICK_SAVE_NOUND:
                newState = clickSaveWord(newState, 'nound')
                break

            case NoundActionTypes.ON_CLICK_DELETE_NOUND:
                newState = newState.setIn(['nound','deleteNound'],true)
                newState = newState.setIn(['nound','passed'],wordQuizPassed(newState, 'nound'))
                break

            case PrepositiondActionTypes.ON_CLICK_SAVE_PREPOSITIOND:
                newState = clickSaveWord(newState, 'prepositiond')
                break

            case PrepositiondActionTypes.ON_CLICK_DELETE_PREPOSITIOND:
                newState = newState.setIn(['prepositiond','deletePrepositiond'],true)
                newState = newState.setIn(['prepositiond','passed'],wordQuizPassed(newState, 'prepositiond'))
                break

            case PronoundActionTypes.ON_CLICK_SAVE_PRONOUND:
                newState = clickSaveWord(newState, 'pronound')
                break

            case PronoundActionTypes.ON_CLICK_DELETE_PRONOUND:
                newState = newState.setIn(['pronound','deletePronound'],true)
                newState = newState.setIn(['pronound','passed'],wordQuizPassed(newState, 'pronound'))
                break
            
            case VerbdActionTypes.ON_CLICK_SAVE_VERBD:
                newState = clickSaveWord(newState, 'verbd')
                break

            case VerbdActionTypes.ON_CLICK_DELETE_VERBD:
                newState = newState.setIn(['verbd','deleteVerbd'],true)
                newState = newState.setIn(['verbd','passed'],wordQuizPassed(newState, 'verbd'))
                break

            // Other
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            case QuizActionTypes.intro.ON_I_UNDERSTAND:
                newState = newState.setIn(['intro','iunderstand'],true)
                newState = newState.setIn(['intro','passed'],true)
                break

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

            case QuizActionTypes.phrase.ON_I_UNDERSTAND:
                newState = newState.setIn(['phrase','iunderstand'],true)
                newState = newState.setIn(['phrase','passed'],true)
                break

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

            case QuizActionTypes.npAdjective.ON_I_UNDERSTAND:
                newState = newState.setIn(['npAdjective','iunderstand'],true)
                newState = newState.setIn(['npAdjective','passed'],true)
                break

            case QuizActionTypes.verbConjugation.ON_I_UNDERSTAND:
                newState = newState.setIn(['verbConjugation','iunderstand'],true)
                newState = newState.setIn(['verbConjugation','passed'],true)
                break

            case QuizActionTypes.pastForm.ON_I_UNDERSTAND:
                newState = newState.setIn(['pastForm','iunderstand'],true)
                newState = newState.setIn(['pastForm','passed'],true)
                break

            case QuizActionTypes.verbTime.ON_I_UNDERSTAND:
                newState = newState.setIn(['verbTime','iunderstand'],true)
                newState = newState.setIn(['verbTime','passed'],true)
                break

            case VPActionTypes.ON_CLICK_SAVE_VP:
                //if(action.vp.id) { // if an id is present then this is an update
                //newState = newState.setIn(['vp','updateVP'],true)
                //newState = newState.setIn(['vp','passed'],vpQuizPassed(newState))
                //} else { // otherwise it's an insert
                newState = newState.setIn(['vp','insertVP'],true)
                newState = newState.setIn(['vp','passed'],vpQuizPassed(newState))
                //}
                break

            case VPActionTypes.ON_CHANGE_SELECTED_VERBD:
                newState = newState.setIn(['vp','changeVPVerbd'],true)
                newState = newState.setIn(['vp','passed'],vpQuizPassed(newState))
                break

            // For the quiz we only care if the definiteness has changed, not which particular new value it changed to.
            case VPActionTypes.ON_CHANGE_ACTION_TIME:
                newState = newState.setIn(['vp','changeVerbTime'],true)
                newState = newState.setIn(['vp','passed'],vpQuizPassed(newState))
                break

            case VPActionTypes.ON_CLICK_DELETE_VP:
                newState = newState.setIn(['vp','deleteVP'],true)
                newState = newState.setIn(['vp','passed'],vpQuizPassed(newState))
                break

            case QuizActionTypes.clause.ON_I_UNDERSTAND:
                newState = newState.setIn(['clause','iunderstand'],true)
                newState = newState.setIn(['clause','passed'],true)
                break

            default:
                // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

export default new QuizStore()
export {currentStateTemplate}
export {factoryReset}
export {mutators}
