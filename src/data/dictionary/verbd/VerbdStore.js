import {ReduceStore} from 'flux/utils'
import {fromJS, Map} from 'immutable'

import VerbdAEActionTypes from './addedit/VerbdAEActionTypes'
import Counter            from './Counter'
import Verbd              from './Verbd'
import VerbdActionTypes   from './VerbdActionTypes'

import AppActionTypes from '../../app/AppActionTypes'
import AppDispatcher  from '../../AppDispatcher'

import {localStorageAvailable} from '../../../LocalStorage'
const localStorageKey = 'VerbdStore'

class VerbdStore extends ReduceStore {
    constructor() {
        super(AppDispatcher)
    }

    getInitialState() {

        if (localStorageAvailable) {
            const localStorageState = localStorage.getItem(localStorageKey)

            if(localStorageState)
                return fromJS(JSON.parse(localStorageState))
        }

        return VerbdStore.initialState

    }

    reduce(state, action) {

        function insertNewRecord(verbd) {
            const id = Counter.increment()
            return state.set(id, Verbd({
                id: id,
                base: verbd.base,
                pastTense: verbd.pastTense,
                pastTense_rule: verbd.pastTense_rule
            }))
        }

        let newState = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_APP_RESET:
                newState = VerbdStore.initialState
                break

            // Insert a new record or update an existing one, originating from a UI.
            case VerbdAEActionTypes.ON_CLICK_SAVE_VERBD:
                if(action.verbd.id) {
                    // An id exists so update the existing record.
                    newState = newState.set(action.verbd.id, Verbd(action.verbd))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(action.verbd)
                }
                break

            case VerbdAEActionTypes.ON_CLICK_DELETE_VERBD:
                newState = newState.delete(action.id)
                break

            // Insert a new record programmatically, w/o a UI.
            case VerbdActionTypes.INSERT_VERBD:
                newState = insertNewRecord(action.verbd)
                break
            
            default:
                // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState))

        return newState
    }
}

VerbdStore.initialState = Map()

export default new VerbdStore()
