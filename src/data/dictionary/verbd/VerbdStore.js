import {ReduceStore} from 'flux/utils'
import {OrderedMap} from 'immutable'

import AppDispatcher from '../../AppDispatcher'
import Counter from './Counter'
import Verbd from './Verbd'
import VerbdActionTypes from './VerbdActionTypes'
import VerbdAEActionTypes from './addedit/VerbdAEActionTypes'

class VerbdStore extends ReduceStore {
    constructor() {
        super(AppDispatcher)
    }

    getInitialState() {
        return OrderedMap()
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

        switch (action.type) {

            // Save new record or update existing one.
            case VerbdAEActionTypes.ON_CLICK_SAVE_VERBD:
                if(action.verbd.id) {
                    // An id exists so update the existing record.
                    return state.set(action.verbd.id, action.verbd)
                } else {
                    // No id exists so insert a new record.
                    return insertNewRecord(action.verbd)
                }

            case VerbdAEActionTypes.ON_CLICK_DELETE_VERBD:
                return state.delete(action.id)

            // Insert a new record programmatically, w/o a UI.
            case VerbdActionTypes.INSERT_VERBD:
                return insertNewRecord(action.verbd)

            default:
                return state
        }
    }
}

export default new VerbdStore()
