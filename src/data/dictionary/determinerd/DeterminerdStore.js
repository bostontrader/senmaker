// @flow
import {ReduceStore} from 'flux/utils'

import DeterminerdStoreState  from './DeterminerdStoreState'
import Determinerd            from './Determinerd'
import DeterminerdActionTypes from './DeterminerdActionTypes'
import AppDispatcher        from '../../AppDispatcher'
import {deserialize}        from '../../Serializer'
import AppActionTypes       from '../../app/AppActionTypes'

import {localStorageAvailable} from '../../LocalStorage'
const localStorageKey:string = 'DeterminerdStore'

class DeterminerdStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable)
            if(localStorage.getItem(localStorageKey)) return deserialize(localStorage.getItem(localStorageKey))

        return DeterminerdStoreState()
    }

    reduce(state:Object, action:Object):Object {

        function insertNewRecord(determinerd) {
            const id:number = state.getIn(['nextid'])
            let newState = state.setIn(['nextid'], id + 1)
            return newState.setIn(['coll',id.toString()], Determinerd({
                id: id.toString(),
                base: determinerd.get('base')
                // don't set t or v here
            }))
        }

        let newState:Object = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = DeterminerdStoreState()
                break

            // Insert a new record or update an existing one, originating from a UI.
            case DeterminerdActionTypes.ON_CLICK_SAVE_DETERMINERD:
                if(action.determinerd.id) {
                    // An id exists so update the existing record.
                    newState = newState.setIn(['coll', action.determinerd.id], Determinerd(action.determinerd))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(action.determinerd)
                }
                break

            case DeterminerdActionTypes.ON_CLICK_DELETE_DETERMINERD:
                newState = newState.deleteIn(['coll',action.id])
                break

            // Insert a new record programmatically, w/o a UI.
            case DeterminerdActionTypes.INSERT_DETERMINERD:
                newState = insertNewRecord(action.determinerd)
                break

            default:
            // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

export default new DeterminerdStore()
