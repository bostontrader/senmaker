import {ReduceStore} from 'flux/utils'
import {Map} from 'immutable'

import AppDispatcher from '../AppDispatcher'
//import Counter from './Counter'
//import Nound from './Nound'
//import NoundActionTypes from './NoundActionTypes'

class NouniStore extends ReduceStore {
    constructor() {
        super(AppDispatcher)
    }

    getInitialState() {
        return Map()
    }

    reduce(state, action) {
        switch (action.type) {

            //case NoundActionTypes.DELETE_NOUN:
                //return state.delete(action.id)

            //case NoundActionTypes.INSERT_NOUN:
                //const id = Counter.increment()
                //return state.set(id, new Nound({
                    //id: id,
                    //base: action.noun.base,
                    //plural: action.noun.plural,
                    //pluralization_rule: action.noun.pluralization_rule
                //}))

            //case NoundActionTypes.UPDATE_NOUN:
                //return state.set(action.noun.get('id'), action.noun)

            default:
                return state
        }
    }
}

export default new NouniStore()
