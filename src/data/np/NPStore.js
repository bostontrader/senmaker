import {ReduceStore} from 'flux/utils'
import {fromJS, Map} from 'immutable'

//import NPAEActionTypes from './addedit/NPAEActionTypes'
import Counter            from './Counter'
import NP              from './NP'
import NPActionTypes   from './NPActionTypes'
import AppActionTypes     from '../app/AppActionTypes'
import AppDispatcher      from '../AppDispatcher'

import {localStorageAvailable} from '../../LocalStorage'
const localStorageKey = 'NPStore'

class NPStore extends ReduceStore {
    constructor() {
        super(AppDispatcher)
    }

    getInitialState() {

        if (localStorageAvailable) {
            const localStorageState = localStorage.getItem(localStorageKey)

            if(localStorageState)
                return fromJS(JSON.parse(localStorageState))
        }

        return NPStore.initialState

    }

    reduce(state, action) {

        function insertNewRecord(np) {
            const id = Counter.increment()
            return state.set(id, NP({
                id: id,
                base: np.base
            }))
        }

        let newState = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_APP_RESET:
                newState = NPStore.initialState
                break

            // Insert a new record or update an existing one, originating from a UI.
            /*case NPAEActionTypes.ON_CLICK_SAVE_NP:
                if(action.np.id) {
                    // An id exists so update the existing record.
                    newState = newState.set(action.np.id, NP(action.np))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(action.np)
                }
                break

            case NPAEActionTypes.ON_CLICK_DELETE_NP:
                newState = newState.delete(action.id)
                break*/

            // Insert a new record programmatically, w/o a UI.
            case NPActionTypes.INSERT_NP:
                newState = insertNewRecord(action.np)
                break

            default:
                // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

NPStore.initialState = Map()

export default new NPStore()
