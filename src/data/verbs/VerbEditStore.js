import {ReduceStore} from 'flux/utils';
import VerbActionTypes from './VerbActionTypes';
import AppDispatcher from '../AppDispatcher';

class VerbEditStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return {base: '', pastTense_rule: -1}
    }

    reduce(state, action) {

        const quitUI = {add:null, id:null} // return this to close the add or edit UI

        switch (action.type) {

            // Only open the add-verb UI
            case VerbActionTypes.ADD_VERB:
                return {add: true}

            case VerbActionTypes.CANCEL:
                return quitUI

            // Here we only close the UI form.
            // VerbStore will also catch this event and it's responsible for the actual deletion.
            case VerbActionTypes.DELETE_VERB:
                return quitUI

            case VerbActionTypes.EDIT_VERB:
                return {
                    id: action.verb.get('id'),
                    base: action.verb.get('base'),
                    pastTense_rule: action.verb.get('pastTense_rule')
                }

            // Here we only close the UI form.
            // VerbStore will also catch this event and it's responsible for the actual insert.
            case VerbActionTypes.INSERT_VERB:
                return quitUI

            default:
                return state
        }
    }
}

export default new VerbEditStore()
