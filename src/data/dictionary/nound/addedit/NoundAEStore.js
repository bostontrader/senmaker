import {ReduceStore} from 'flux/utils'
import {Map} from 'immutable'

import Nound from '../Nound'
import NoundAEActionTypes from './NoundAEActionTypes'
import AppDispatcher from '../../../AppDispatcher'

/*
 This store manages all state required to support the add/edit operations on a nound.
 This obviously includes the present state of whatever nound is being added or created.
 If said nound has an id, then this is an edit, otherwise we're creating a new nound.

 We can use this information to manage the display of a suitable add/edit component.
 If the nound has an id then we are editing a nound and we thus want to display the NoundEditForm component.
 If the clickAddNound flag = true, then we are adding a new nound and we want to display the NoundAddForm component.
 Else display nothing.

 We use the clickAddNound flag for purposes of code clarity.

 */
class NoundAEStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return Map({
            addNound: false,
            nound: new Nound()
        })
    }

    reduce(state, action) {
        switch (action.type) {

            // Signal the UI to open the NoundAddForm
            case NoundAEActionTypes.CLICK_ADD_NOUND:
                return state.set('addNound', true)

            // Signal the UI to close NoundAddForm or NoundEditForm
            case NoundAEActionTypes.CLICK_CANCEL:
                return this.getInitialState()

            // Signal the UI to close NoundAddForm or NoundEditForm (but the delete button
            // is only present on NounEditForm.)
            // NoundStore will also catch this event and it's responsible for the actual deletion.
            case NoundAEActionTypes.CLICK_DELETE_NOUND:
                return this.getInitialState()

            // Signal the UI to open NoundEditForm and populate with the given data.
            case NoundAEActionTypes.CLICK_EDIT_NOUND:
                return state.set('nound', Nound({
                    id: action.nound.id,
                    base: action.nound.base,
                    plural: action.nound.plural,
                    pluralization_rule: action.nound.pluralization_rule
                }))

            // Signal the UI to close NoundAddForm or NoundEditForm. We don't need to specificy which,
            // the same state should close either one.
            case NoundAEActionTypes.CLICK_SAVE_NOUND:
                return this.getInitialState()

            case NoundAEActionTypes.ON_CHANGE_BASE:
                return state.updateIn(['nound','base'],value => action.base)

            default:
                return state
        }
    }
}

export default new NoundAEStore()
