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

                let plural = ''
                switch(action.noun.pluralization_rule) {
                    case 1:
                        plural = action.noun.base + 's'
                        break
                    case 2:
                        plural = action.noun.base + 'es'
                        break
                    default:
                }

                return state.set(id, new Noun({
                    id: id,
                    base: action.noun.base,
                    plural: plural,
                    pluralization_rule: action.noun.pluralization_rule
                }))

            default:
                return state
        }
    }
}

export default new NounStore()
