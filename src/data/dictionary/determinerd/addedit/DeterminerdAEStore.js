// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import Determinerd            from '../Determinerd'
import DeterminerdActionTypes from '../DeterminerdActionTypes'
import AppDispatcher          from '../../../AppDispatcher'
import {MakeDeterminerd}      from '../../../JSONParseUtils'
import {validateDeterminerd}  from '../../../Validator'
import AppActionTypes         from '../../../app/AppActionTypes'

import {localStorageAvailable} from '../../../LocalStorage'
import {migrateNG}             from '../../../LocalStorage'
const localStorageKey:string = 'DeterminerdAEStore'

/*
 This store manages all state required to support the add/edit operations on a determinerd.
 This obviously includes the present state of whatever determinerd is being added or created.
 If said determinerd has an id, then this is an edit, otherwise we're creating a new determinerd.

 We can use this information to manage the display of a suitable add/edit component.

 If the determinerd has an id then we are editing an existing determinerd and we thus want to display the
 DeterminerdAEForm component in edit mode.

 If the addDeterminerd flag = true, then we are adding a new determinerd and we want to display the
 DeterminerdAEForm component in add mode.

 Else display nothing.

 We use the addDeterminerd flag for purposes of code clarity.

 */

// This is how it starts in the very beginning.
const factoryReset:Object = Map({
    v:0,
    addDeterminerd: false,
    determinerd: new Determinerd()
})

// mutators[0] will mutate priorTemplate from v0 to v1
const mutators:Array<Function> = []

// This is what the structure should look like when finished.
// We only need this for testing.
const currentStateTemplate:Object = Map({
    v:0,
    addDeterminerd: false,
    determinerd: new Determinerd()
})


class DeterminerdAEStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = migrateNG(fromJS(JSON.parse(localStorageState)), mutators, factoryReset)
                let newDeterminerd = MakeDeterminerd(originalParse.getIn(['determinerd']))
                return originalParse.set('determinerd',newDeterminerd)
            }

        }

        return migrateNG(factoryReset, mutators, factoryReset)

    }

    reduce(state:Object, action:Object):Object {

        let newState:Object = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            // Signal the UI to open the DeterminerdAddForm
            case DeterminerdActionTypes.ON_CLICK_ADD_DETERMINERD:
                newState = newState.set('addDeterminerd', true)
                break

            // Signal the UI to close DeterminerdAddForm or DeterminerdEditForm
            case DeterminerdActionTypes.ON_CLICK_CANCEL:
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            // Signal the UI to close DeterminerdAddForm or DeterminerdEditForm (but the delete button
            // is only present on NounEditForm.)
            // DeterminerdStore will also catch this event and it's responsible for the actual deletion.
            case DeterminerdActionTypes.ON_CLICK_DELETE_DETERMINERD:
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            // Signal the UI to open DeterminerdEditForm and populate with the given data.
            case DeterminerdActionTypes.ON_CLICK_EDIT_DETERMINERD:
                validateDeterminerd(action.determinerd)
                newState = newState.set('determinerd', Determinerd({
                    id: action.determinerd.id,
                    base: action.determinerd.base,
                    plural: action.determinerd.plural,
                    pluralization_rule: action.determinerd.pluralization_rule
                }))
                break

            // Signal the UI to close DeterminerdAddForm or DeterminerdEditForm. We don't need to specify which,
            // the same state should close either one.
            case DeterminerdActionTypes.ON_CLICK_SAVE_DETERMINERD:
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            case DeterminerdActionTypes.ON_CHANGE_BASE:
                newState = newState.updateIn(['determinerd','base'],value => action.base)
                break

            case DeterminerdActionTypes.ON_CHANGE_PLURALIZATION_RULE:
                newState = newState.updateIn(['determinerd','pluralization_rule'],value => action.newPluralizationRule)
                break

            case DeterminerdActionTypes.ON_CHANGE_PLURAL:
                newState = newState.updateIn(['determinerd','plural'],value => action.plural)
                break

            default:
                // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

export default new DeterminerdAEStore()
export {currentStateTemplate}
export {factoryReset}
export {mutators}
