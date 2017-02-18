import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import NounActionTypes from './NounActionTypes';
import NounDispatcher from './NounDispatcher';
import Counter from './Counter'
import Noun from './Noun'

class NounStore extends ReduceStore {
    constructor() {
        super(NounDispatcher);
    }

    getInitialState() {
        return Immutable.OrderedMap();
    }

    reduce(state, action) {
        switch (action.type) {
            case NounActionTypes.ADD_NOUN:

                const id = Counter.increment();

                let plural = ''
                switch(action.noun.pluralization_rule) {
                    case 0:
                        plural = action.noun.base + 's'
                        break
                    case 1:
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

            case NounActionTypes.DELETE_NOUN:
                return state.delete(action.id)

            default:
                return state
        }
    }
}

export default new NounStore()