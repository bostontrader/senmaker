import {ReduceStore} from 'flux/utils'
import {Map} from 'immutable'

import Nouni from './Nouni'
import NouniActionTypes from './NouniActionTypes'
import AppDispatcher from '../AppDispatcher'

/*
This store manages all state required to support the add/edit operations on a nouni.
This obviously includes the present state of whatever nouni is being added or created.
If said nouni has an id, then this is an edit, otherwise we're creating a new nouni.

We can use this information to manage the display of a suitable add/edit component.
If the nouni has an id then we are editing a nouni and we thus want to display the NouniEditForm component.
If the addNouni flag = true, then we are adding a new nouni and we want to display the NouniAddForm component.
Else display nothing.

We use the addNouni flag for purposes of code clarity.

 */
class NouniAddEditStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return Map({
            addNouni: false,
            nouni: new Nouni()
        })
    }

    reduce(state, action) {

        switch (action.type) {

            // Only open the add-noun UI
            //case NounDictionaryItemActionTypes.ADD_NOUN:
                //return state.set('addNoun', true)

            //case NounDictionaryItemActionTypes.CANCEL:
                //return state.set('addNoun', false).set('noun', NounDictionaryItem())

            //case NounDictionaryItemActionTypes.CHANGE_BASE:
                //return state.updateIn(['noun','base'],value => action.base)

            // Here we only close the UI form.
            // NounStore will also catch this event and it's responsible for the actual deletion.
            //case NounDictionaryItemActionTypes.DELETE_NOUN:
                //return state.set('addNoun', false).set('noun', NounDictionaryItem())

            //case NounDictionaryItemActionTypes.EDIT_NOUN:
                //return state.set('noun', NounDictionaryItem({
                    //id: action.payload.noun.get('id'),
                    //base: action.payload.noun.get('base'),
                    //pluralization_rule: action.payload.noun.get('pluralization_rule')
                //}))

            // Here we only close the UI form.
            // NounStore will also catch this event and it's responsible for the actual insert.
            //case NounDictionaryItemActionTypes.INSERT_NOUN:
                //return state.set('addNoun', false).set('noun', NounDictionaryItem())

            // Here we only close the UI form.
            // NounStore will also catch this event and it's responsible for the actual update.
            //case NounDictionaryItemActionTypes.UPDATE_NOUN:
                //return state.set('addNoun', false).set('noun', NounDictionaryItem())

            default:
                return state
        }
    }
}

export default new NouniAddEditStore()
