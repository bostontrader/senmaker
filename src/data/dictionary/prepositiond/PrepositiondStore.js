// @flow
import {ReduceStore} from 'flux/utils'

import PrepositiondStoreState  from './PrepositiondStoreState'
import Prepositiond            from './Prepositiond'
import PrepositiondActionTypes from './PrepositiondActionTypes'
import AppDispatcher        from '../../AppDispatcher'
import {deserialize}        from '../../Serializer'
import AppActionTypes       from '../../app/AppActionTypes'

import {localStorageAvailable} from '../../LocalStorage'
const localStorageKey:string = 'PrepositiondStore'

class PrepositiondStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable)
            if(localStorage.getItem(localStorageKey)) return deserialize(localStorage.getItem(localStorageKey))

        return PrepositiondStoreState()
    }

    reduce(state:Object, action:Object):Object {

        function insertNewRecord(prepositiond) {
            const id:number = state.getIn(['nextid'])
            let newState = state.setIn(['nextid'], id + 1)
            return newState.setIn(['coll',id.toString()], Prepositiond({
                id: id.toString(),
                base: prepositiond.get('base')
                // don't set t or v here
            }))
        }

        let newState:Object = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = PrepositiondStoreState()
                break

            // Insert a new record or update an existing one, originating from a UI.
            case PrepositiondActionTypes.ON_CLICK_SAVE_PREPOSITIOND:
                if(action.prepositiond.id) {
                    // An id exists so update the existing record.
                    newState = newState.setIn(['coll', action.prepositiond.id], Prepositiond(action.prepositiond))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(action.prepositiond)
                }
                break

            case PrepositiondActionTypes.ON_CLICK_DELETE_PREPOSITIOND:
                newState = newState.deleteIn(['coll',action.id])
                break

            // Insert a new record programmatically, w/o a UI.
            case PrepositiondActionTypes.INSERT_PREPOSITIOND:
                newState = insertNewRecord(action.prepositiond)
                break

            default:
            // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

export default new PrepositiondStore()
