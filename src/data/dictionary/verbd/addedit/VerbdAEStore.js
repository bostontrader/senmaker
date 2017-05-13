// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import Verbd            from '../Verbd'
import VerbdActionTypes from '../VerbdActionTypes'
import AppDispatcher    from '../../../AppDispatcher'
import {MakeVerbd}      from '../../../JSONParseUtils'
import {validateVerbd}  from '../../../Validator'
import AppActionTypes   from '../../../app/AppActionTypes'

import {localStorageAvailable} from '../../../../LocalStorage'
const localStorageKey = 'VerbdAEStore'

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
        super(AppDispatcher)
    }

    getInitialState() {

        if (localStorageAvailable) {
            const localStorageState = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = fromJS(JSON.parse(localStorageState))
                let newVerbd = MakeVerbd(originalParse.getIn(['nound']))
                return originalParse.set('nound',newVerbd)
            }

        }

        return VerbdAEStore.initialState

    }

    reduce(state:Object, action:Object):Object {

        let newState:Object = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = VerbdAEStore.initialState
                break

            // Signal the UI to open the VerbdAddForm
            case VerbdActionTypes.ON_CLICK_ADD_VERBD:
                newState = newState.set('addVerbd', true)
                break

            // Signal the UI to close VerbdAddForm or VerbdEditForm
            case VerbdActionTypes.ON_CLICK_CANCEL:
                newState = VerbdAEStore.initialState
                break

            // Signal the UI to close VerbdAddForm or VerbdEditForm (but the delete button
            // is only present on VerbEditForm.)
            // VerbdStore will also catch this event and it's responsible for the actual deletion.
            case VerbdActionTypes.ON_CLICK_DELETE_VERBD:
                newState = VerbdAEStore.initialState
                break

            // Signal the UI to open VerbdEditForm and populate with the given data.
            case VerbdActionTypes.ON_CLICK_EDIT_VERBD:
                validateVerbd(action.verbd)
                newState = newState.set('verbd', Verbd({
                    id: action.verbd.id,
                    base: action.verbd.base,
                    pastForm: action.verbd.pastForm,
                    pastForm_rule: action.verbd.pastForm_rule
                }))
                break

            // Signal the UI to close VerbdAddForm or VerbdEditForm. We don't need to specify which,
            // the same state should close either one.
            case VerbdActionTypes.ON_CLICK_SAVE_VERBD:
                newState = VerbdAEStore.initialState
                break

            case VerbdActionTypes.ON_CHANGE_BASE:
                newState = newState.updateIn(['verbd','base'],value => action.base)
                break

            case VerbdActionTypes.ON_CHANGE_PAST_FORM:
                newState = newState.updateIn(['verbd','pastForm'],value => action.pastForm)
                break

            default:
                // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

VerbdAEStore.initialState = Map({
    addVerbd: false,
    verbd: new Verbd()
})

export default new VerbdAEStore()
