import {ReduceStore} from 'flux/utils'
import {fromJS, Map} from 'immutable'

import Nound            from '../Nound'
import NoundActionTypes from '../NoundActionTypes'
import AppDispatcher    from '../../../AppDispatcher'
import AppActionTypes   from '../../../app/AppActionTypes'

import {localStorageAvailable} from '../../../../LocalStorage'
const localStorageKey = 'NoundAEStore'

/*
 This store manages all state required to support the add/edit operations on a nound.
 This obviously includes the present state of whatever nound is being added or created.
 If said nound has an id, then this is an edit, otherwise we're creating a new nound.

 We can use this information to manage the display of a suitable add/edit component.
 If the nound has an id then we are editing a nound and we thus want to display the NoundEditForm component.
 If the onClickAddNound flag = true, then we are adding a new nound and we want to display the NoundAddForm component.
 Else display nothing.

 We use the onClickAddNound flag for purposes of code clarity.

 */
class NoundAEStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {

        if (localStorageAvailable) {
            const localStorageState = localStorage.getItem(localStorageKey)

            if(localStorageState)
                return fromJS(JSON.parse(localStorageState))
        }

        return NoundAEStore.initialState

    }

    reduce(state, action) {

        let newState = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_APP_RESET:
                newState = NoundAEStore.initialState
                break

            // Signal the UI to open the NoundAddForm
            case NoundActionTypes.ON_CLICK_ADD_NOUND:
                newState = newState.set('addNound', true)
                break

            // Signal the UI to close NoundAddForm or NoundEditForm
            case NoundActionTypes.ON_CLICK_CANCEL:
                newState = NoundAEStore.initialState
                break

            // Signal the UI to close NoundAddForm or NoundEditForm (but the delete button
            // is only present on NounEditForm.)
            // NoundStore will also catch this event and it's responsible for the actual deletion.
            case NoundActionTypes.ON_CLICK_DELETE_NOUND:
                newState = NoundAEStore.initialState
                break

            // Signal the UI to open NoundEditForm and populate with the given data.
            case NoundActionTypes.ON_CLICK_EDIT_NOUND:
                newState = newState.set('nound', Nound({
                    id: action.nound.id,
                    base: action.nound.base,
                    plural: action.nound.plural,
                    pluralization_rule: action.nound.pluralization_rule
                }))
                break

            // Signal the UI to close NoundAddForm or NoundEditForm. We don't need to specify which,
            // the same state should close either one.
            case NoundActionTypes.ON_CLICK_SAVE_NOUND:
                newState = NoundAEStore.initialState
                break

            case NoundActionTypes.ON_CHANGE_BASE:
                newState = newState.updateIn(['nound','base'],value => action.base)
                break

            default:
                // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

NoundAEStore.initialState = Map({
    addNound: false,
    nound: new Nound()
})

export default new NoundAEStore()
