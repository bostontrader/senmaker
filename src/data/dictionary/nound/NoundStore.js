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

            // Save new record or update existing one.
            case NoundAEActionTypes.CLICK_SAVE_NOUND:
                if(action.nound.id) {
                    // An id exists so update the existing record.
                    return state.set(action.nound.id, action.nound)
                } else {
                    // No id exists so insert a new record.
                    return insertNewRecord(action.nound)
                }

            case NoundAEActionTypes.CLICK_DELETE_NOUND:
                return state.delete(action.id)

            case NoundActionTypes.INSERT_NOUND:
                return insertNewRecord(action.nound)

            default:
                return state
        }
    }
}

export default new NoundStore()
