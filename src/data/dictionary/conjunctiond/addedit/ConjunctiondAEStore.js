// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import Conjunctiond            from '../Conjunctiond'
import ConjunctiondActionTypes from '../ConjunctiondActionTypes'
import AppDispatcher    from '../../../AppDispatcher'
import {MakeConjunctiond}      from '../../../JSONParseUtils'
import {validateConjunctiond}  from '../../../Validator'
import AppActionTypes   from '../../../app/AppActionTypes'

import {localStorageAvailable} from '../../../LocalStorage'
import {migrateNG}             from '../../../LocalStorage'
const localStorageKey:string = 'ConjunctiondAEStore'

/*
 This store manages all state required to support the add/edit operations on a conjunctiond.
 This obviously includes the present state of whatever conjunctiond is being added or created.
 If said conjunctiond has an id, then this is an edit, otherwise we're creating a new conjunctiond.

 We can use this information to manage the display of a suitable add/edit component.

 If the conjunctiond has an id then we are editing an existing conjunctiond and we thus want to display the
 ConjunctiondAEForm component in edit mode.

 If the addConjunctiond flag = true, then we are adding a new conjunctiond and we want to display the
 ConjunctiondAEForm component in add mode.

 Else display nothing.

 We use the addConjunctiond flag for purposes of code clarity.

 */

// This is how it starts in the very beginning.
const factoryReset:Object = Map({
    v:0,
    addConjunctiond: false,
    conjunctiond: new Conjunctiond()
})

// mutators[0] will mutate priorTemplate from v0 to v1
const mutators:Array<Function> = []

// This is what the structure should look like when finished.
// We only need this for testing.
const currentStateTemplate:Object = Map({
    v:0,
    addConjunctiond: false,
    conjunctiond: new Conjunctiond()
})


class ConjunctiondAEStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = migrateNG(fromJS(JSON.parse(localStorageState)), mutators, factoryReset)
                let newConjunctiond = MakeConjunctiond(originalParse.getIn(['conjunctiond']))
                return originalParse.set('conjunctiond',newConjunctiond)
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

            // Signal the UI to open the ConjunctiondAddForm
            case ConjunctiondActionTypes.ON_CLICK_ADD_CONJUNCTIOND:
                newState = newState.set('addConjunctiond', true)
                break

            // Signal the UI to close ConjunctiondAddForm or ConjunctiondEditForm
            case ConjunctiondActionTypes.ON_CLICK_CANCEL:
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            // Signal the UI to close ConjunctiondAddForm or ConjunctiondEditForm (but the delete button
            // is only present on NounEditForm.)
            // ConjunctiondStore will also catch this event and it's responsible for the actual deletion.
            case ConjunctiondActionTypes.ON_CLICK_DELETE_CONJUNCTIOND:
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            // Signal the UI to open ConjunctiondEditForm and populate with the given data.
            case ConjunctiondActionTypes.ON_CLICK_EDIT_CONJUNCTIOND:
                validateConjunctiond(action.conjunctiond)
                newState = newState.set('conjunctiond', Conjunctiond({
                    id: action.conjunctiond.id,
                    base: action.conjunctiond.base,
                    plural: action.conjunctiond.plural,
                    pluralization_rule: action.conjunctiond.pluralization_rule
                }))
                break

            // Signal the UI to close ConjunctiondAddForm or ConjunctiondEditForm. We don't need to specify which,
            // the same state should close either one.
            case ConjunctiondActionTypes.ON_CLICK_SAVE_CONJUNCTIOND:
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            case ConjunctiondActionTypes.ON_CHANGE_BASE:
                newState = newState.updateIn(['conjunctiond','base'],value => action.base)
                break

            case ConjunctiondActionTypes.ON_CHANGE_PLURALIZATION_RULE:
                newState = newState.updateIn(['conjunctiond','pluralization_rule'],value => action.newPluralizationRule)
                break

            case ConjunctiondActionTypes.ON_CHANGE_PLURAL:
                newState = newState.updateIn(['conjunctiond','plural'],value => action.plural)
                break

            default:
                // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

export default new ConjunctiondAEStore()
export {currentStateTemplate}
export {factoryReset}
export {mutators}
