import {ReduceStore} from 'flux/utils';
import NounActionTypes from './NounActionTypes';
import NounDispatcher from './NounDispatcher';

class NounEditStore extends ReduceStore {
    constructor() {
        super(NounDispatcher);
    }

    getInitialState() {
        return {base: '', pluralization_rule: -1}
    }

    reduce(state, action) {
        switch (action.type) {

            case NounActionTypes.EDIT_NOUN:
                return {
                    id: action.noun.get('id'),
                    base: action.noun.get('base'),
                    pluralization_rule: action.noun.get('pluralization_rule')
                }

            default:
                return state
        }
    }
}

export default new NounEditStore()