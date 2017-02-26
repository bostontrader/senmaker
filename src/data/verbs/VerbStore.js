import Immutable from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppDispatcher from '../AppDispatcher'
import Counter from './Counter'
import Verb from './Verb'
import VerbActionTypes from './VerbActionTypes'
import VerbConstants from './VerbConstants'

class VerbStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return Immutable.OrderedMap();
    }

    reduce(state, action) {
        switch (action.type) {

            case VerbActionTypes.DELETE_VERB:
                return state.delete(action.id)

            case VerbActionTypes.INSERT_VERB:
                const id = Counter.increment();

                //let pastTense = ''
                //switch(action.verb.pastTense_rule) {
                    //case VerbConstants.pastTense_NoChange:
                        //pastTense = action.verb.base
                        //break
                    //case VerbConstants.pastTense_Append_ed:
                        //pastTense = action.verb.base + 'ed'
                        //break
                    //default:
                //}

                return state.set(id, new Verb({
                    id: id,
                    base: action.verb.base,
                    pastTense: action.verb.pastTense,
                    pastTense_rule: action.verb.pastTense_rule
                }))

            default:
                return state
        }
    }
}

export default new VerbStore()
