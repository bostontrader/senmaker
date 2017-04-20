import {ReduceStore} from 'flux/utils'
import {fromJS, Map} from 'immutable'

import NP            from './NP'
import NPActionTypes from './NPActionTypes'
import AppDispatcher    from '../AppDispatcher'
import AppActionTypes   from '../app/AppActionTypes'
import Nound            from '../dictionary/nound/Nound'

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

        function insertNewRecord(np:NP) {
            const id:string = state.getIn(['nextid'])
            let newState = state.setIn(['nextid'], id + 1)

            return newState.setIn(['coll',id], NP({
                id: id,
                nound: Nound(np.get('nound')),
                definiteness: np.get('definiteness'),
                generatedText: np.get('generatedText')
                //nound: Nound(np.nound),
                //definiteness: np.definiteness,
                //generatedText: np.generatedText
            }))
        }

        let newState = state
        
        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_APP_RESET:
                newState = NPStore.initialState
                break

            // Insert a new record or update an existing one, originating from a UI.
            case NPActionTypes.ON_CLICK_SAVE_NP: // string
                if(action.np.id) {
                    // An id exists so update the existing record.
                    console.log(newState)
                    newState = newState.setIn(['coll', action.np.id], NP(action.np))
                    console.log(newState)
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(action.np)
                }
                break
            
            case NPActionTypes.ON_CLICK_DELETE_NP:
                // Use them both to make the UI and the test work. Why?
                newState = newState.deleteIn(['coll',action.id.toString()]) // this works for the UI
                newState = newState.deleteIn(['coll',action.id]) // this works for the test
                break

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

NPStore.initialState = Map({
    nextid:1,
    coll:Map()  // the actual collection of np
})

export default new NPStore()
