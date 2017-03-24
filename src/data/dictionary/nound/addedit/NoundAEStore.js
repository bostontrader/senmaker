import {ReduceStore} from 'flux/utils'
import {Map} from 'immutable'

import Nound from '../Nound'
import NoundAEActionTypes from './NoundAEActionTypes'
import AppDispatcher from '../../../AppDispatcher'

/*
This store manages all state required to support the add/edit operations on a noun.
This obviously includes the present state of whatever noun is being added or created.
If said noun has an id, then this is an edit, otherwise we're creating a new noun.

We can use this information to manage the display of a suitable add/edit component.
If the noun has an id then we are editing a noun and we thus want to display the NounEditForm component.
If the clickAddNound flag = true, then we are adding a new noun and we want to display the NounAddForm component.
Else display nothing.

We use the clickAddNound flag for purposes of code clarity.

 */
class NoundAEStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return Map({
            addNound: false,
            nound: new Nound()
        })
    }

    reduce(state, action) {
        switch (action.type) {

            // Only open the add-noun UI
            case NoundAEActionTypes.CLICK_ADD_NOUND:
                const newState = state.set('addNound', true)

                console.log('NoundAEStore CLICK_ADD_NOUND',JSON.stringify(newState.toJSON()))
                return newState
                //return state.set('addNound', true)
                //return state.setIn(['addEditNound','addNound'],true)

            case NoundAEActionTypes.CLICK_EDIT_NOUND:
                return state.set('nound', Nound({
                    id: action.nound.id,
                    base: action.nound.base,
                    plural: action.nound.plural,
                    pluralization_rule: action.nound.pluralization_rule
                }))

            // Here we only close the UI form.
            // NoundStore will also catch this event and it's responsible for the actual deletion.
            case NoundAEActionTypes.CLICK_DELETE_NOUND:
                console.log('NoundAEStore', action)
                return this.getInitialState()

            // Here we only close the UI form.
            // NoundStore will also catch this event and it's responsible for the actual insert or update.
            case NoundAEActionTypes.CLICK_SAVE_NOUND:
                return this.getInitialState()

            //case NoundActionTypes.CANCEL:
                //return state.set('clickAddNound', false).set('noun', Nound())

            case NoundAEActionTypes.ON_CHANGE_BASE:
                return state.updateIn(['nound','base'],value => action.base)



            // Here we only close the UI form.
            // NounStore will also catch this event and it's responsible for the actual insert.
            //case NoundActionTypes.INSERT_NOUN:
                //return state.set('clickAddNound', false).set('noun', Nound())

            // Here we only close the UI form.
            // NounStore will also catch this event and it's responsible for the actual update.
            //case NoundActionTypes.UPDATE_NOUN:
                //return state.set('clickAddNound', false).set('noun', Nound())

            default:
                return state
        }
    }
}

export default new NoundAEStore()
