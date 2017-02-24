import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import VerbActionTypes from './VerbActionTypes';
import AppDispatcher from '../AppDispatcher';
import Counter from './Counter'
import Verb from './Verb'

class VerbStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return Immutable.OrderedMap();
    }

    reduce(state, action) {
        switch (action.type) {

            case VerbActionTypes.DELETE_VERB:
                return state.delete(action.id)

            case VerbActionTypes.INSERT_VERB:
                const id = Counter.increment();

                let plural = ''
                switch(action.verb.tense_rule) {
                    case 1:
                        plural = action.verb.base + 's'
                        break
                    case 2:
                        plural = action.verb.base + 'es'
                        break
                    default:
                }

                return state.set(id, new Verb({
                    id: id,
                    base: action.verb.base,
                    plural: plural,
                    tense_rule: action.verb.tense_rule
                }))

            default:
                return state
        }
    }
}

export default new VerbStore()
