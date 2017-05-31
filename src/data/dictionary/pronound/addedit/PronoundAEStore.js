// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import Pronound            from '../Pronound'
import PronoundActionTypes from '../PronoundActionTypes'
import AppDispatcher       from '../../../AppDispatcher'
import {MakePronound}      from '../../../JSONParseUtils'
import {validatePronound}  from '../../../Validator'
import AppActionTypes      from '../../../app/AppActionTypes'

import {localStorageAvailable} from '../../../LocalStorage'
import {migrateNG}             from '../../../LocalStorage'
const localStorageKey:string = 'PronoundAEStore'

/*
 This store manages all state required to support the add/edit operations on a pronound.
 This obviously includes the present state of whatever pronound is being added or created.
 If said pronound has an id, then this is an edit, otherwise we're creating a new pronound.

 We can use this information to manage the display of a suitable add/edit component.

 If the pronound has an id then we are editing an existing pronound and we thus want to display the
 PronoundAEForm component in edit mode.

 If the addPronound flag = true, then we are adding a new pronound and we want to display the
 PronoundAEForm component in add mode.

 Else display nothing.

 We use the addPronound flag for purposes of code clarity.

 */

// This is how it starts in the very beginning.
const factoryReset:Object = Map({
    v:0,
    addPronound: false,
    pronound: new Pronound()
})

// mutators[0] will mutate priorTemplate from v0 to v1
const mutators:Array<Function> = []

// This is what the structure should look like when finished.
// We only need this for testing.
const currentStateTemplate:Object = factoryReset

class PronoundAEStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = migrateNG(fromJS(JSON.parse(localStorageState)), mutators, factoryReset)
                let newPronound = MakePronound(originalParse.getIn(['pronound']))
                return originalParse.set('pronound',newPronound)
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

            // Signal the UI to open the PronoundAddForm
            case PronoundActionTypes.ON_CLICK_ADD_PRONOUND:
                newState = newState.set('addPronound', true)
                break

            // Signal the UI to close PronoundAddForm or PronoundEditForm
            case PronoundActionTypes.ON_CLICK_CANCEL:
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            // Signal the UI to close PronoundAddForm or PronoundEditForm (but the delete button
            // is only present on NounEditForm.)
            // PronoundStore will also catch this event and it's responsible for the actual deletion.
            case PronoundActionTypes.ON_CLICK_DELETE_PRONOUND:
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            // Signal the UI to open PronoundEditForm and populate with the given data.
            case PronoundActionTypes.ON_CLICK_EDIT_PRONOUND:
                validatePronound(action.pronound)
                newState = newState.set('pronound', Pronound({
                    id: action.pronound.id,
                    base: action.pronound.base,
                }))
                break

            // Signal the UI to close PronoundAddForm or PronoundEditForm. We don't need to specify which,
            // the same state should close either one.
            case PronoundActionTypes.ON_CLICK_SAVE_PRONOUND:
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            case PronoundActionTypes.ON_CHANGE_BASE:
                newState = newState.updateIn(['pronound','base'],value => action.base)
                break

            default:
                // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

export default new PronoundAEStore()
export {currentStateTemplate}
export {factoryReset}
export {mutators}
