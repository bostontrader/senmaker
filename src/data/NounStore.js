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
                // Don't add nouns with no text.
                if (!action.text) {
                    return state;
                }
                const id = Counter.increment();
                return state.set(id, new Noun({
                    id,
                    text: action.text,
                    complete: false,
                }));

            case NounActionTypes.DELETE_COMPLETED_NOUNS:
                return state.filter(noun => !noun.complete)

            case NounActionTypes.DELETE_NOUN:
                return state.delete(action.id)

            case NounActionTypes.EDIT_NOUN:
                return state.setIn([action.id, 'text'], action.text)

            case NounActionTypes.TOGGLE_ALL_NOUNS:
                const areAllComplete = state.every(noun => noun.complete)
                return state.map(noun => noun.set('complete', !areAllComplete))

            case NounActionTypes.TOGGLE_NOUN:
                return state.update(
                    action.id,
                    noun => noun.set('complete', !noun.complete)
                )

            default:
                return state
        }
    }
}

export default new NounStore()