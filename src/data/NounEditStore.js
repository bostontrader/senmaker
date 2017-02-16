import {ReduceStore} from 'flux/utils';
import NounActionTypes from './NounActionTypes';
import NounDispatcher from './NounDispatcher';

class NounEditStore extends ReduceStore {
    constructor() {
        super(NounDispatcher);
    }

    getInitialState() {
        return ''
    }

    reduce(state, action) {
        switch (action.type) {
            case NounActionTypes.START_EDITING_NOUN:
                return action.id

            case NounActionTypes.STOP_EDITING_NOUN:
                return ''

            default:
                return state;
        }
    }
}

export default new NounEditStore();