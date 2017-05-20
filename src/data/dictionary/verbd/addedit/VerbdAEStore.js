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
const localStorageKey:string = 'VerbdAEStore'

/*
 This store manages all state required to support the add/edit operations on a verbd.
 This obviously includes the present state of whatever verbd is being added or created.
 If said verbd has an id, then this is an edit, otherwise we're creating a new verbd.

 We can use this information to manage the display of a suitable add/edit component.

 If the verbd has an id then we are editing an existing verbd and we thus want to display the
 VerbdAEForm component in edit mode.

 If the addVerbd flag = true, then we are adding a new verbd and we want to display the
 VerbdAEForm component in add mode.

 Else display nothing.

 We use the addVerbd flag for purposes of code clarity.

 */

// We want to provide a migration capacity for the format of this store.  It's serialized
// into localStorage and there's no telling when old versions will be seen in the future.
const initialStates:Array<Object> = [
    Map({
        addVerbd: false,
        verbd: new Verbd()
    }),
    Map({
        version:1,
        addVerbd: false,
        verbd: new Verbd()
    })
]

class VerbdAEStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = this.migrate(fromJS(JSON.parse(localStorageState)))
                let newVerbd = MakeVerbd(originalParse.getIn(['verbd']))
                return originalParse.set('verbd',newVerbd)
            }

        }

        return initialStates.slice(-1)[0]

    }

    // Given an originalFormat state object migrate to the most current version
    migrate(originalFormat:Object):Object {
        const currentInitialState:Object = initialStates.slice(-1)[0]
        const originalVersion:number = originalFormat.getIn(['version'])

        // If the version is undefined then we start fresh
        if(originalVersion === undefined)
            return currentInitialState

        // If the version is the most recent
        if (originalVersion === currentInitialState.getIn(['version']))
            return originalFormat

        // Else migrate from the originalVersion to the current version
        // But at this time there are no intermediate version to migrate through
        // so do nothing
        return currentInitialState
    }

    reduce(state:Object, action:Object):Object {

        let newState:Object = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = initialStates.slice(-1)[0]
                break

            // Signal the UI to open the VerbdAddForm
            case VerbdActionTypes.ON_CLICK_ADD_VERBD:
                newState = newState.set('addVerbd', true)
                break

            // Signal the UI to close VerbdAddForm or VerbdEditForm
            case VerbdActionTypes.ON_CLICK_CANCEL:
                newState = initialStates.slice(-1)[0]
                break

            // Signal the UI to close VerbdAddForm or VerbdEditForm (but the delete button
            // is only present on VerbEditForm.)
            // VerbdStore will also catch this event and it's responsible for the actual deletion.
            case VerbdActionTypes.ON_CLICK_DELETE_VERBD:
                newState = initialStates.slice(-1)[0]
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
                newState = initialStates.slice(-1)[0]
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

export default new VerbdAEStore()
export {initialStates}
