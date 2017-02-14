import Immutable from 'immutable'
import {ReduceStore} from 'flux/utils'
import NounActionTypes from './NounActionTypes'
import NounDispatcher from './NounDispatcher'
import Counter from './Counter'
import Noun from './Noun'

class NounStore extends ReduceStore {
    constructor() {
        super(NounDispatcher)
    }

    getInitialState() {
        return Immutable.OrderedMap()
    }

    reduce(state, action) {
        switch (action.type) {
            case NounActionTypes.ADD_NOUN:
                // Don't add nouns with no base.
                if (!action.base) {
                    return state
                }
                const id = Counter.increment()
                return state.set(id, new Noun({
                    id,
                    base: action.base
                }))

            case NounActionTypes.DELETE_NOUN:
                return state.delete(action.id)

            default:
                return state
        }
    }
}

export default new NounStore()