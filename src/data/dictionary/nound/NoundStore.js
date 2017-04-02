import {ReduceStore} from 'flux/utils'
import {OrderedMap} from 'immutable'

import AppDispatcher from '../../AppDispatcher'
import Counter from './Counter'
import Nound from './Nound'
import NoundActionTypes from './NoundActionTypes'
import NoundAEActionTypes from './addedit/NoundAEActionTypes'

class NoundStore extends ReduceStore {
    constructor() {
        super(AppDispatcher)
    }

    getInitialState() {
        return OrderedMap()
    }

    reduce(state, action) {

        function insertNewRecord(nound) {
            const id = Counter.increment()
            return state.set(id, Nound({
                id: id,
                base: nound.base,
                plural: nound.plural,
                pluralization_rule: nound.pluralization_rule
            }))
        }

        switch (action.type) {

            // Insert a new record or update an existing one, originating from a UI.
            case NoundAEActionTypes.ON_CLICK_SAVE_NOUND:
                if(action.nound.id) {
                    // An id exists so update the existing record.
                    return state.set(action.nound.id, action.nound)
                } else {
                    // No id exists so insert a new record.
                    return insertNewRecord(action.nound)
                }

            case NoundAEActionTypes.ON_CLICK_DELETE_NOUND:
                return state.delete(action.id)

            // Insert a new record programmatically, w/o a UI.
            case NoundActionTypes.INSERT_NOUND:
                return insertNewRecord(action.nound)

            //case NoundActionTypes.ON_CHANGE_SELECTED_NOUND:
                //console.log('NoundStore ON_CHANGE_SELECTED_NOUND',action)
                //return state

            default:
                return state
        }
    }
}

export default new NoundStore()
