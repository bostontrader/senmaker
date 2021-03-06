// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import Adverbd            from '../Adverbd'
import AdverbdActionTypes from '../AdverbdActionTypes'
import AppDispatcher        from '../../../AppDispatcher'
import {MakeAdverbd}      from '../../../JSONParseUtils'
import {validateAdverbd}  from '../../../Validator'
import AppActionTypes       from '../../../app/AppActionTypes'

import {localStorageAvailable} from '../../../LocalStorage'
import {migrateNG}             from '../../../LocalStorage'
const localStorageKey:string = 'AdverbdAEStore'

/*
 This store manages all state required to support the add/edit operations on a adverbd.
 This obviously includes the present state of whatever adverbd is being added or created.
 If said adverbd has an id, then this is an edit, otherwise we're creating a new adverbd.

 We can use this information to manage the display of a suitable add/edit component.
 If the adverbd has an id then we are editing a adverbd and we thus want to display the AdverbdEditForm component.
 If the onClickAddAdverbd flag = true, then we are adding a new adverbd and we want to display the AdverbdAddForm component.
 Else display nothing.

 We use the onClickAddAdverbd flag for purposes of code clarity.

 */

// This is how it starts in the very beginning.
const factoryReset:Object = Map({
    v:0,
    addAdverbd: false,
    adverbd: new Adverbd()
})

// mutators[0] will mutate priorTemplate from v0 to v1
const mutators:Array<Function> = []

// This is what the structure should look like when finished.
// We only need this for testing.
const currentStateTemplate:Object = Map({
    v:0,
    addAdverbd: false,
    adverbd: new Adverbd()
})

class AdverbdAEStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable) {
            const localStorageState = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = migrateNG(fromJS(JSON.parse(localStorageState)), mutators, factoryReset)
                let newAdverbd = MakeAdverbd(originalParse.getIn(['adverbd']))
                return originalParse.set('adverbd',newAdverbd)
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

            // Signal the UI to open the AdverbdAddForm
            case AdverbdActionTypes.ON_CLICK_ADD_ADVERBD:
                newState = newState.set('addAdverbd', true)
                break

            // Signal the UI to close AdverbdAddForm or AdverbdEditForm
            case AdverbdActionTypes.ON_CLICK_CANCEL:
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            // Signal the UI to close AdverbdAddForm or AdverbdEditForm (but the delete button
            // is only present on NounEditForm.)
            // AdverbdStore will also catch this event and it's responsible for the actual deletion.
            case AdverbdActionTypes.ON_CLICK_DELETE_ADVERBD:
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            // Signal the UI to open AdverbdEditForm and populate with the given data.
            case AdverbdActionTypes.ON_CLICK_EDIT_ADVERBD:
                validateAdverbd(action.adverbd)
                newState = newState.set('adverbd', Adverbd({
                    id: action.adverbd.id,
                    base: action.adverbd.base,
                    plural: action.adverbd.plural,
                    pluralization_rule: action.adverbd.pluralization_rule
                }))
                break

            // Signal the UI to close AdverbdAddForm or AdverbdEditForm. We don't need to specify which,
            // the same state should close either one.
            case AdverbdActionTypes.ON_CLICK_SAVE_ADVERBD:
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            case AdverbdActionTypes.ON_CHANGE_BASE:
                newState = newState.updateIn(['adverbd','base'],value => action.base)
                break

            default:
            // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

export default new AdverbdAEStore()
export {currentStateTemplate}
export {factoryReset}
export {mutators}
