import {ReduceStore} from 'flux/utils';
import NounActionTypes from './NounActionTypes';
import NounDispatcher from './NounDispatcher';

class NounDraftStore extends ReduceStore {
    constructor() {
        super(NounDispatcher);
    }

    getInitialState() {
        return ''
    }

    reduce(state, action) {
        switch (action.type) {
            case NounActionTypes.ADD_NOUN:
                return ''

            case NounActionTypes.UPDATE_DRAFT:
                return action.text

            default:
                return state;
        }
    }
}

export default new NounDraftStore();