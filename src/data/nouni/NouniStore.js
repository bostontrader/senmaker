import {ReduceStore} from 'flux/utils'
import {Map} from 'immutable'

import AppDispatcher from '../AppDispatcher'
//import Counter from './Counter'
//import NounDictionaryItem from './NounDictionaryItem'
//import NounDictionaryItemActionTypes from './NounDictionaryItemActionTypes'

class NouniStore extends ReduceStore {
    constructor() {
        super(AppDispatcher)
    }

    getInitialState() {
        return Map()
    }

    reduce(state, action) {
        switch (action.type) {

            //case NounDictionaryItemActionTypes.DELETE_NOUN:
                //return state.delete(action.id)

            //case NounDictionaryItemActionTypes.INSERT_NOUN:
                //const id = Counter.increment()
                //return state.set(id, new NounDictionaryItem({
                    //id: id,
                    //base: action.noun.base,
                    //plural: action.noun.plural,
                    //pluralization_rule: action.noun.pluralization_rule
                //}))

            //case NounDictionaryItemActionTypes.UPDATE_NOUN:
                //return state.set(action.noun.get('id'), action.noun)

            default:
                return state
        }
    }
}

export default new NouniStore()
