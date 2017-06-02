// @flow
import {ReduceStore} from 'flux/utils'

import NoundStoreState  from './NoundStoreState'
import Nound            from './Nound'
import NoundActionTypes from './NoundActionTypes'
import AppDispatcher        from '../../AppDispatcher'
import {deserialize}        from '../../Serializer'
import AppActionTypes       from '../../app/AppActionTypes'

import {localStorageAvailable} from '../../LocalStorage'
const localStorageKey:string = 'NoundStore'

class NoundStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable)
            if(localStorage.getItem(localStorageKey)) return deserialize(localStorage.getItem(localStorageKey))

        return NoundStoreState()
    }

    reduce(state:Object, action:Object):Object {

        function insertNewRecord(nound) {
            const id:number = state.getIn(['nextid'])
            let newState = state.setIn(['nextid'], id + 1)
            return newState.setIn(['coll',id.toString()], Nound({
                id: id.toString(),
                base: nound.get('base'),
                plural: nound.get('plural')
                // don't set t or v here
            }))
        }

        let newState:Object = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = NoundStoreState()
                break

            // Insert a new record or update an existing one, originating from a UI.
            case NoundActionTypes.ON_CLICK_SAVE_NOUND:
                if(action.nound.id) {
                    // An id exists so update the existing record.
                    newState = newState.setIn(['coll', action.nound.id], Nound(action.nound))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(action.nound)
                }
                break

            case NoundActionTypes.ON_CLICK_DELETE_NOUND:
                newState = newState.deleteIn(['coll',action.id])
                break

            // Insert a new record programmatically, w/o a UI.
            case NoundActionTypes.INSERT_NOUND:
                newState = insertNewRecord(action.nound)
                break

            default:
            // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

export default new NoundStore()
