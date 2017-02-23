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

        const quitUI = {add:null, id:null} // return this to close the add or edit UI

        switch (action.type) {

            // Only open the add-noun UI
            case NounActionTypes.ADD_NOUN:
                return {add: true}

            case NounActionTypes.CANCEL:
                return quitUI

            // Here we only close the UI form.
            // NounStore will also catch this event and it's responsible for the actual deletion.
            case NounActionTypes.DELETE_NOUN:
                return quitUI

            case NounActionTypes.EDIT_NOUN:
                return {
                    id: action.noun.get('id'),
                    base: action.noun.get('base'),
                    pluralization_rule: action.noun.get('pluralization_rule')
                }

            // Here we only close the UI form.
            // NounStore will also catch this event and it's responsible for the actual insert.
            case NounActionTypes.INSERT_NOUN:
                return quitUI

            default:
                return state
        }
    }
}

export default new NounEditStore()
