//import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils'
//import NounActionTypes from './NounActionTypes';
import AppDispatcher from './AppDispatcher'
//import Counter from './Counter'
//import Noun from './Noun'

class AppStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return 1
    }

    reduce(state, action) {
        //switch (action.type) {

            //default:
                return state
        //}
    }
}

export default new AppStore()
