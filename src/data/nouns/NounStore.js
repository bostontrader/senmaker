import Immutable from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppDispatcher from '../AppDispatcher'
import Counter from './Counter'
import Noun from './Noun'
import NounActionTypes from './NounActionTypes'

class NounStore extends ReduceStore {
    constructor() {
        super(AppDispatcher)
    }

    getInitialState() {
        return Immutable.OrderedMap()
    }

    reduce(state, action) {
        switch (action.type) {

            case NounActionTypes.DELETE_NOUN:
                return state.delete(action.id)

            case NounActionTypes.INSERT_NOUN:
                const id = Counter.increment()

                return state.set(id, new Noun({
                    id: id,
                    base: action.noun.base,
                    plural: action.noun.plural,
                    pluralization_rule: action.noun.pluralization_rule
                }))

            case NounActionTypes.UPDATE_NOUN:
                return state.set(action.noun.get('id'), action.noun)

            default:
                return state
        }
    }
}

export default new NounStore()
