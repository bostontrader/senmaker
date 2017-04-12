import {ReduceStore} from 'flux/utils'
import {fromJS, Map} from 'immutable'

import NPAEActionTypes from './NPAEActionTypes'
import NP              from '../NP'
import AppActionTypes  from '../../app/AppActionTypes'
import AppDispatcher   from '../../AppDispatcher'

import {localStorageAvailable} from '../../../LocalStorage'
const localStorageKey = 'NPAEStore'

/*
 This store manages all state required to support the add/edit operations on a np.
 This obviously includes the present state of whatever np is being added or created.
 If said np has an id, then this is an edit, otherwise we're creating a new np.

 We can use this information to manage the display of a suitable add/edit component.
 If the np has an id then we are editing a np and we thus want to display the NPEditForm component.
 If the onClickAddNP flag = true, then we are adding a new np and we want to display the NPAddForm component.
 Else display nothing.

 We use the onClickAddNP flag for purposes of code clarity.

 */
class NPAEStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {

        if (localStorageAvailable) {
            const localStorageState = localStorage.getItem(localStorageKey)

            if(localStorageState)
                return fromJS(JSON.parse(localStorageState))
        }

        return NPAEStore.initialState

    }

    reduce(state, action) {

        let newState = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_APP_RESET:
                newState = NPAEStore.initialState
                break

            // Signal the UI to open the NPAddForm
            case NPAEActionTypes.ON_CLICK_ADD_NP:
                newState = newState.set('addNP', true)
                break

            // Signal the UI to close NPAddForm or NPEditForm
            //case NPAEActionTypes.ON_CLICK_CANCEL:
                //newState = NPAEStore.initialState
                //break

            // Signal the UI to close NPAddForm or NPEditForm (but the delete button
            // is only present on NounEditForm.)
            // NPStore will also catch this event and it's responsible for the actual deletion.
            //case NPAEActionTypes.ON_CLICK_DELETE_NP:
                //newState = NPAEStore.initialState
                //break

            // Signal the UI to open NPEditForm and populate with the given data.
            //case NPAEActionTypes.ON_CLICK_EDIT_NP:
                //newState = newState.set('np', NP({
                    //id: action.np.id,
                    //base: action.np.base,
                    //plural: action.np.plural,
                    //pluralization_rule: action.np.pluralization_rule
                //}))
                //break

            // Signal the UI to close NPAddForm or NPEditForm. We don't need to specify which,
            // the same state should close either one.
            //case NPAEActionTypes.ON_CLICK_SAVE_NP:
                //newState = NPAEStore.initialState
                //break

            //case NPAEActionTypes.ON_CHANGE_BASE:
                //newState = newState.updateIn(['np','base'],value => action.base)
                //break

            default:
                // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

NPAEStore.initialState = Map({
    addNP: false,
    np: new NP()
})

export default new NPAEStore()
