// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import Prepositiond            from '../Prepositiond'
import PrepositiondActionTypes from '../PrepositiondActionTypes'
import AppDispatcher           from '../../../AppDispatcher'
import {MakePrepositiond}      from '../../../JSONParseUtils'
import {validatePrepositiond}  from '../../../Validator'
import AppActionTypes          from '../../../app/AppActionTypes'

import {localStorageAvailable} from '../../../LocalStorage'
import {migrateNG}             from '../../../LocalStorage'
const localStorageKey:string = 'PrepositiondAEStore'

/*
 This store manages all state required to support the add/edit operations on a prepositiond.
 This obviously includes the present state of whatever prepositiond is being added or created.
 If said prepositiond has an id, then this is an edit, otherwise we're creating a new prepositiond.

 We can use this information to manage the display of a suitable add/edit component.
 If the prepositiond has an id then we are editing a prepositiond and we thus want to display the PrepositiondEditForm component.
 If the onClickAddPrepositiond flag = true, then we are adding a new prepositiond and we want to display the PrepositiondAddForm component.
 Else display nothing.

 We use the onClickAddPrepositiond flag for purposes of code clarity.

 */

// This is how it starts in the very beginning.
const factoryReset:Object = Map({
    v:0,
    addPrepositiond: false,
    prepositiond: new Prepositiond()
})

// mutators[0] will mutate priorTemplate from v0 to v1
const mutators:Array<Function> = []

// This is what the structure should look like when finished.
// We only need this for testing.
const currentStateTemplate:Object = Map({
    v:0,
    addPrepositiond: false,
    prepositiond: new Prepositiond()
})

class PrepositiondAEStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable) {
            const localStorageState = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = migrateNG(fromJS(JSON.parse(localStorageState)), mutators, factoryReset)
                let newPrepositiond = MakePrepositiond(originalParse.getIn(['prepositiond']))
                return originalParse.set('prepositiond',newPrepositiond)
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

            // Signal the UI to open the PrepositiondAddForm
            case PrepositiondActionTypes.ON_CLICK_ADD_PREPOSITIOND:
                newState = newState.set('addPrepositiond', true)
                break

            // Signal the UI to close PrepositiondAddForm or PrepositiondEditForm
            case PrepositiondActionTypes.ON_CLICK_CANCEL:
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            // Signal the UI to close PrepositiondAddForm or PrepositiondEditForm (but the delete button
            // is only present on NounEditForm.)
            // PrepositiondStore will also catch this event and it's responsible for the actual deletion.
            case PrepositiondActionTypes.ON_CLICK_DELETE_PREPOSITIOND:
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            // Signal the UI to open PrepositiondEditForm and populate with the given data.
            case PrepositiondActionTypes.ON_CLICK_EDIT_PREPOSITIOND:
                validatePrepositiond(action.prepositiond)
                newState = newState.set('prepositiond', Prepositiond({
                    id: action.prepositiond.id,
                    base: action.prepositiond.base,
                    plural: action.prepositiond.plural,
                    pluralization_rule: action.prepositiond.pluralization_rule
                }))
                break

            // Signal the UI to close PrepositiondAddForm or PrepositiondEditForm. We don't need to specify which,
            // the same state should close either one.
            case PrepositiondActionTypes.ON_CLICK_SAVE_PREPOSITIOND:
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            case PrepositiondActionTypes.ON_CHANGE_BASE:
                newState = newState.updateIn(['prepositiond','base'],value => action.base)
                break

            default:
            // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

export default new PrepositiondAEStore()
export {currentStateTemplate}
export {factoryReset}
export {mutators}
