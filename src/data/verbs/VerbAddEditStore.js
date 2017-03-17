import {ReduceStore} from 'flux/utils'
import {Map} from 'immutable'

import Verb from './Verb'
import VerbActionTypes from './VerbActionTypes'
import AppDispatcher from '../AppDispatcher'

/*
 This store manages all state required to support the add/edit operations on a verb.
 This obviously includes the present state of whatever verb is being added or created.
 If said verb has an id, then this is an edit, otherwise we're creating a new verb.

 We can use this information to manage the display of a suitable add/edit component.
 If the verb has an id then we are editing a verb and we thus want to display the VerbEditForm component.
 If the addVerb flag = true, then we are adding a new verb and we want to display the VerbAddForm component.
 Else display nothing.

 We use the addVerb flag for purposes of code clarity.

 */
class VerbAddEditStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return Map({
            addVerb: false,
            verb: new Verb()
        })
    }

    reduce(state, action) {
        
        switch (action.type) {

            // Only open the add-verb UI
            case VerbActionTypes.ADD_VERB:
                return state.set('addVerb', true)

            case VerbActionTypes.CANCEL:
                return state.set('addVerb', false).set('verb', Verb())

            case VerbActionTypes.CHANGE_BASE:
                return state.updateIn(['verb','base'],value => action.base)
            
            // Here we only close the UI form.
            // VerbStore will also catch this event and it's responsible for the actual deletion.
            case VerbActionTypes.DELETE_VERB:
                return state.set('addVerb', false).set('verb', Verb())

            case VerbActionTypes.EDIT_VERB:
                return state.set('verb', Verb({
                    id: action.payload.verb.get('id'),
                    base: action.payload.verb.get('base'),
                    pastTense_rule: action.payload.verb.get('pastTense_rule')
                }))

            // Here we only close the UI form.
            // VerbStore will also catch this event and it's responsible for the actual insert.
            case VerbActionTypes.INSERT_VERB:
                return state.set('addVerb', false).set('verb', Verb())

            // Here we only close the UI form.
            // VerbStore will also catch this event and it's responsible for the actual update.
            case VerbActionTypes.UPDATE_VERB:
                return state.set('addVerb', false).set('verb', Verb())
            
            default:
                return state
        }
    }
}

export default new VerbAddEditStore()
