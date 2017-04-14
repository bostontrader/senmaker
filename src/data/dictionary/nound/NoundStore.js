import {ReduceStore} from 'flux/utils'
import {fromJS, Map} from 'immutable'

import NoundAEActionTypes from './addedit/NoundAEActionTypes'
import Nound              from './Nound'
import NoundActionTypes   from './NoundActionTypes'
import AppActionTypes     from '../../app/AppActionTypes'
import AppDispatcher      from '../../AppDispatcher'

import {localStorageAvailable} from '../../../LocalStorage'
const localStorageKey = 'NoundStore'

class NoundStore extends ReduceStore {
    constructor() {
        super(AppDispatcher)
    }

    getInitialState() {

        if (localStorageAvailable) {
            const localStorageState = localStorage.getItem(localStorageKey)

            if(localStorageState)
                return fromJS(JSON.parse(localStorageState))
        }

        return NoundStore.initialState

    }

    reduce(state, action) {

        function insertNewRecord(nound) {
            const id = state.size + 1
            return state.set(id, Nound({
                id: id,
                base: nound.base,
                plural: nound.plural,
                pluralization_rule: nound.pluralization_rule
            }))
        }

        let newState = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_APP_RESET:
                newState = NoundStore.initialState
                break

            // Insert a new record or update an existing one, originating from a UI.
            case NoundAEActionTypes.ON_CLICK_SAVE_NOUND:
                if(action.nound.id) {
                    // An id exists so update the existing record.
                    newState = newState.set(action.nound.id, Nound(action.nound))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(action.nound)
                }
                break

            case NoundAEActionTypes.ON_CLICK_DELETE_NOUND:
                newState = newState.delete(action.id)
                break

            // Insert a new record programmatically, w/o a UI.
            case NoundActionTypes.INSERT_NOUND:
                newState = insertNewRecord(action.nound)
                break

            default:
                // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

NoundStore.initialState = Map()

export default new NoundStore()
