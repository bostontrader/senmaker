import {ReduceStore} from 'flux/utils'
import {OrderedMap} from 'immutable'

import AppDispatcher from '../../AppDispatcher'
import Counter from './Counter'
import Verb from './VerbDictionaryItem'
import VerbActionTypes from './VerbDictionaryActionTypes'

class VerbStore extends ReduceStore {
    constructor() {
        super(AppDispatcher)
    }

    getInitialState() {
        return OrderedMap()
    }

    reduce(state, action) {
        switch (action.type) {

            case VerbActionTypes.DELETE_VERB:
                return state.delete(action.id)

            case VerbActionTypes.INSERT_VERB:
                const id = Counter.increment()
                return state.set(id, new Verb({
                    id: id,
                    base: action.verb.base,
                    pastTense: action.verb.pastTense,
                    pastTense_rule: action.verb.pastTense_rule
                }))

            case VerbActionTypes.UPDATE_VERB:
                return state.set(action.verb.get('id'), action.verb)
            
            default:
                return state
        }
    }
}

export default new VerbStore()
