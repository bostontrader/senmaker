import {ReduceStore} from 'flux/utils'
import {fromJS, Map} from 'immutable'

import AppDispatcher from '../../AppDispatcher'
import Counter from './Counter'
import Verbd from './Verbd'
import VerbdActionTypes from './VerbdActionTypes'
import VerbdAEActionTypes from './addedit/VerbdAEActionTypes'

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

            // Save new record or update existing one.
            case VerbdAEActionTypes.ON_CLICK_SAVE_VERBD:
                if(action.verbd.id) {
                    // An id exists so update the existing record.
                    newState = state.set(action.verbd.id, action.verbd)
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(action.verbd)
                }
                break

            case VerbdAEActionTypes.ON_CLICK_DELETE_VERBD:
                newState = state.delete(action.id)
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
