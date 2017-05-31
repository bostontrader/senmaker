// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import Nound            from '../Nound'
import NoundActionTypes from '../NoundActionTypes'
import AppDispatcher    from '../../../AppDispatcher'
import {MakeNound}      from '../../../JSONParseUtils'
import {validateNound}  from '../../../Validator'
import AppActionTypes   from '../../../app/AppActionTypes'

import {localStorageAvailable} from '../../../LocalStorage'
import {migrateNG}             from '../../../LocalStorage'
const localStorageKey:string = 'NoundAEStore'

/*
 This store manages all state required to support the add/edit operations on a nound.
 This obviously includes the present state of whatever nound is being added or created.
 If said nound has an id, then this is an edit, otherwise we're creating a new nound.

 We can use this information to manage the display of a suitable add/edit component.

 If the nound has an id then we are editing an existing nound and we thus want to display the
 NoundAEForm component in edit mode.

 If the addNound flag = true, then we are adding a new nound and we want to display the
 NoundAEForm component in add mode.

 Else display nothing.

 We use the addNound flag for purposes of code clarity.

 */

// This is how it starts in the very beginning.
const factoryReset:Object = Map({
    v:0,
    addNound: false,
    nound: new Nound()
})

// mutators[0] will mutate priorTemplate from v0 to v1
const mutators:Array<Function> = []

// This is what the structure should look like when finished.
// We only need this for testing.
const currentStateTemplate:Object = Map({
    v:0,
    addNound: false,
    nound: new Nound()
})


class NoundAEStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = migrateNG(fromJS(JSON.parse(localStorageState)), mutators, factoryReset)
                let newNound = MakeNound(originalParse.getIn(['nound']))
                return originalParse.set('nound',newNound)
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

            // Signal the UI to open the NoundAddForm
            case NoundActionTypes.ON_CLICK_ADD_NOUND:
                newState = newState.set('addNound', true)
                break

            // Signal the UI to close NoundAddForm or NoundEditForm
            case NoundActionTypes.ON_CLICK_CANCEL:
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            // Signal the UI to close NoundAddForm or NoundEditForm (but the delete button
            // is only present on NounEditForm.)
            // NoundStore will also catch this event and it's responsible for the actual deletion.
            case NoundActionTypes.ON_CLICK_DELETE_NOUND:
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            // Signal the UI to open NoundEditForm and populate with the given data.
            case NoundActionTypes.ON_CLICK_EDIT_NOUND:
                validateNound(action.nound)
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
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            case NoundActionTypes.ON_CHANGE_BASE:
                newState = newState.updateIn(['nound','base'],value => action.base)
                break

            case NoundActionTypes.ON_CHANGE_PLURALIZATION_RULE:
                newState = newState.updateIn(['nound','pluralization_rule'],value => action.newPluralizationRule)
                break

            case NoundActionTypes.ON_CHANGE_PLURAL:
                newState = newState.updateIn(['nound','plural'],value => action.plural)
                break

            default:
                // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

export default new NoundAEStore()
export {currentStateTemplate}
export {factoryReset}
export {mutators}
