import {ReduceStore} from 'flux/utils'
import {Map} from 'immutable'

import Noun from './Noun'
import NounActionTypes from './NounActionTypes'
import AppDispatcher from '../AppDispatcher'

/*
This store manages all state required to support the add/edit operations on a noun.
This obviously includes the present state of whatever noun is being added or created.
If said noun has an id, then this is an edit, otherwise we're creating a new noun.

We can use this information to manage the display of a suitable add/edit component.
If the noun has an id then we are editing a noun and we thus want to display the NounEditForm component.
If the addNoun flag = true, then we are adding a new noun and we want to display the NounAddForm component.
Else display nothing.

We use the addNoun flag for purposes of code clarity.

 */
class NounAddEditStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return Map({
            addNoun: false,
            noun: new Noun()
        })
    }

    reduce(state, action) {

        switch (action.type) {

            // Only open the add-noun UI
            case NounActionTypes.ADD_NOUN:
                return state.set('addNoun', true)

            case NounActionTypes.CANCEL:
                return state.set('addNoun', false).set('noun', Noun())

            case NounActionTypes.CHANGE_BASE:
                return state.updateIn(['noun','base'],value => action.base)

            // Here we only close the UI form.
            // NounStore will also catch this event and it's responsible for the actual deletion.
            case NounActionTypes.DELETE_NOUN:
                return state.set('addNoun', false).set('noun', Noun())

            case NounActionTypes.EDIT_NOUN:
                return state.set('noun', Noun({
                    id: action.payload.noun.get('id'),
                    base: action.payload.noun.get('base'),
                    pluralization_rule: action.payload.noun.get('pluralization_rule')
                }))

            // Here we only close the UI form.
            // NounStore will also catch this event and it's responsible for the actual insert.
            case NounActionTypes.INSERT_NOUN:
                return state.set('addNoun', false).set('noun', Noun())

            // Here we only close the UI form.
            // NounStore will also catch this event and it's responsible for the actual update.
            case NounActionTypes.UPDATE_NOUN:
                return state.set('addNoun', false).set('noun', Noun())

            default:
                return state
        }
    }
}

export default new NounAddEditStore()
