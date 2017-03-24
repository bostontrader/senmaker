import {ReduceStore} from 'flux/utils'
import {Map} from 'immutable'

import Verbd from '../Verbd'
import VerbdAEActionTypes from './VerbdAEActionTypes'
import AppDispatcher from '../../../AppDispatcher'

/*
This store manages all state required to support the add/edit operations on a noun.
This obviously includes the present state of whatever noun is being added or created.
If said noun has an id, then this is an edit, otherwise we're creating a new noun.

We can use this information to manage the display of a suitable add/edit component.
If the noun has an id then we are editing a noun and we thus want to display the NounEditForm component.
If the clickAddVerbd flag = true, then we are adding a new noun and we want to display the NounAddForm component.
Else display nothing.

We use the clickAddVerbd flag for purposes of code clarity.

 */
class VerbdAEStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return Map({
            addVerbd: false,
            verbd: new Verbd()
        })
    }

    reduce(state, action) {
        switch (action.type) {

            // Only open the add-noun UI
            case VerbdAEActionTypes.CLICK_ADD_VERBD:
                const newState = state.set('addVerbd', true)

                console.log('VerbdAEStore CLICK_ADD_VERBD',JSON.stringify(newState.toJSON()))
                return newState
                //return state.set('addVerbd', true)
                //return state.setIn(['addEditVerbd','addVerbd'],true)

            case VerbdAEActionTypes.CLICK_EDIT_VERBD:
                return state.set('verbd', Verbd({
                    id: action.verbd.id,
                    base: action.verbd.base,
                    pastTense: action.verbd.pastTense,
                    pastTense_rule: action.verbd.pastTense_rule
                }))

            // Here we only close the UI form.
            // VerbdStore will also catch this event and it's responsible for the actual deletion.
            case VerbdAEActionTypes.CLICK_DELETE_VERBD:
                console.log('VerbdAEStore', action)
                return this.getInitialState()

            // Here we only close the UI form.
            // VerbdStore will also catch this event and it's responsible for the actual insert or update.
            case VerbdAEActionTypes.CLICK_SAVE_VERBD:
                return this.getInitialState()

            //case VerbdActionTypes.CANCEL:
                //return state.set('clickAddVerbd', false).set('noun', Verbd())

            case VerbdAEActionTypes.ON_CHANGE_BASE:
                return state.updateIn(['verbd','base'],value => action.base)



            // Here we only close the UI form.
            // NounStore will also catch this event and it's responsible for the actual insert.
            //case VerbdActionTypes.INSERT_NOUN:
                //return state.set('clickAddVerbd', false).set('noun', Verbd())

            // Here we only close the UI form.
            // NounStore will also catch this event and it's responsible for the actual update.
            //case VerbdActionTypes.UPDATE_NOUN:
                //return state.set('clickAddVerbd', false).set('noun', Verbd())

            default:
                return state
        }
    }
}

export default new VerbdAEStore()
