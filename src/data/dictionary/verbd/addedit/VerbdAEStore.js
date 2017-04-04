import {ReduceStore} from 'flux/utils'
import {Map} from 'immutable'

import Verbd from '../Verbd'
import VerbdAEActionTypes from './VerbdAEActionTypes'
import AppDispatcher from '../../../AppDispatcher'

/*
This store manages all state required to support the add/edit operations on a verbd.
This obviously includes the present state of whatever verbd is being added or created.
If said verbd has an id, then this is an edit, otherwise we're creating a new verbd.

We can use this information to manage the display of a suitable add/edit component.
If the verbd has an id then we are editing a verbd and we thus want to display the VerbdEditForm component.
If the onClickAddVerbd flag = true, then we are adding a new verbd and we want to display the VerbdAddForm component.
Else display nothing.

We use the onClickAddVerbd flag for purposes of code clarity.

 */
class VerbdAEStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return Map({
            addVerbd: false,
            verbd: new Verbd()
        })
    }

    reduce(state, action) {
        switch (action.type) {

            // Signal the UI to open the VerbdAddForm
            case VerbdAEActionTypes.ON_CLICK_ADD_VERBD:
                return state.set('addVerbd', true)

            // Signal the UI to close VerbdAddForm or VerbdEditForm
            case VerbdAEActionTypes.ON_CLICK_CANCEL:
                return this.getInitialState()

            // Signal the UI to close VerbdAddForm or VerbdEditForm (but the delete button
            // is only present on VerbEditForm.)
            // VerbdStore will also catch this event and it's responsible for the actual deletion.
            case VerbdAEActionTypes.ON_CLICK_DELETE_VERBD:
                return this.getInitialState()

            // Signal the UI to open VerbdEditForm and populate with the given data.
            case VerbdAEActionTypes.ON_CLICK_EDIT_VERBD:
                return state.set('verbd', Verbd({
                    id: action.verbd.id,
                    base: action.verbd.base,
                    pastTense: action.verbd.pastTense,
                    pastTense_rule: action.verbd.pastTense_rule
                }))

            // Signal the UI to close VerbdAddForm or VerbdEditForm. We don't need to specify which,
            // the same state should close either one.
            case VerbdAEActionTypes.ON_CLICK_SAVE_VERBD:
                return this.getInitialState()

            case VerbdAEActionTypes.ON_CHANGE_BASE:
                return state.updateIn(['verbd','base'],value => action.base)

            default:
                return state
        }
    }
}

export default new VerbdAEStore()
