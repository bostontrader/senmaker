// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import Adjectivd            from '../Adjectivd'
import AdjectivdActionTypes from '../AdjectivdActionTypes'
import AppDispatcher    from '../../../AppDispatcher'
import {MakeAdjectivd}      from '../../../JSONParseUtils'
import {validateAdjectivd}  from '../../../Validator'
import AppActionTypes   from '../../../app/AppActionTypes'

import {localStorageAvailable} from '../../../../LocalStorage'
const localStorageKey = 'AdjectivdAEStore'

/*
 This store manages all state required to support the add/edit operations on a adjectivd.
 This obviously includes the present state of whatever adjectivd is being added or created.
 If said adjectivd has an id, then this is an edit, otherwise we're creating a new adjectivd.

 We can use this information to manage the display of a suitable add/edit component.
 If the adjectivd has an id then we are editing a adjectivd and we thus want to display the AdjectivdEditForm component.
 If the onClickAddAdjectivd flag = true, then we are adding a new adjectivd and we want to display the AdjectivdAddForm component.
 Else display nothing.

 We use the onClickAddAdjectivd flag for purposes of code clarity.

 */
class AdjectivdAEStore extends ReduceStore {
    constructor() {
        super(AppDispatcher)
    }

    getInitialState():Object {

        if (localStorageAvailable) {
            const localStorageState = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = fromJS(JSON.parse(localStorageState))
                let newAdjectivd = MakeAdjectivd(originalParse.getIn(['adjectivd']))
                return originalParse.set('adjectivd',newAdjectivd)
            }

        }

        return AdjectivdAEStore.initialState

    }

    reduce(state:Object, action:Object):Object {

        let newState:Object = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = AdjectivdAEStore.initialState
                break

            // Signal the UI to open the AdjectivdAddForm
            case AdjectivdActionTypes.ON_CLICK_ADD_ADJECTIVD:
                newState = newState.set('addAdjectivd', true)
                break

            // Signal the UI to close AdjectivdAddForm or AdjectivdEditForm
            case AdjectivdActionTypes.ON_CLICK_CANCEL:
                newState = AdjectivdAEStore.initialState
                break

            // Signal the UI to close AdjectivdAddForm or AdjectivdEditForm (but the delete button
            // is only present on NounEditForm.)
            // AdjectivdStore will also catch this event and it's responsible for the actual deletion.
            case AdjectivdActionTypes.ON_CLICK_DELETE_ADJECTIVD:
                newState = AdjectivdAEStore.initialState
                break

            // Signal the UI to open AdjectivdEditForm and populate with the given data.
            case AdjectivdActionTypes.ON_CLICK_EDIT_ADJECTIVD:
                validateAdjectivd(action.adjectivd)
                newState = newState.set('adjectivd', Adjectivd({
                    id: action.adjectivd.id,
                    base: action.adjectivd.base,
                    plural: action.adjectivd.plural,
                    pluralization_rule: action.adjectivd.pluralization_rule
                }))
                break

            // Signal the UI to close AdjectivdAddForm or AdjectivdEditForm. We don't need to specify which,
            // the same state should close either one.
            case AdjectivdActionTypes.ON_CLICK_SAVE_ADJECTIVD:
                newState = AdjectivdAEStore.initialState
                break

            case AdjectivdActionTypes.ON_CHANGE_BASE:
                newState = newState.updateIn(['adjectivd','base'],value => action.base)
                break

            default:
            // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

AdjectivdAEStore.initialState = Map({
    addAdjectivd: false,
    adjectivd: new Adjectivd()
})

export default new AdjectivdAEStore()
