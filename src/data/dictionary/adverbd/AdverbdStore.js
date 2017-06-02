// @flow
import {ReduceStore} from 'flux/utils'

import AdverbdStoreState  from './AdverbdStoreState'
import Adverbd            from './Adverbd'
import AdverbdActionTypes from './AdverbdActionTypes'
import AppDispatcher        from '../../AppDispatcher'
import {deserialize}        from '../../Serializer'
import AppActionTypes       from '../../app/AppActionTypes'

import {localStorageAvailable} from '../../LocalStorage'
const localStorageKey:string = 'AdverbdStore'

class AdverbdStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable)
            if(localStorage.getItem(localStorageKey)) return deserialize(localStorage.getItem(localStorageKey))

        return AdverbdStoreState()
    }

    reduce(state:Object, action:Object):Object {

        function insertNewRecord(adverbd) {
            const id:number = state.getIn(['nextid'])
            let newState = state.setIn(['nextid'], id + 1)
            return newState.setIn(['coll',id.toString()], Adverbd({
                id: id.toString(),
                base: adverbd.get('base')
                // don't set t or v here
            }))
        }

        let newState:Object = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = AdverbdStoreState()
                break

            // Insert a new record or update an existing one, originating from a UI.
            case AdverbdActionTypes.ON_CLICK_SAVE_ADVERBD:
                if(action.adverbd.id) {
                    // An id exists so update the existing record.
                    newState = newState.setIn(['coll', action.adverbd.id], Adverbd(action.adverbd))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(action.adverbd)
                }
                break   

            case AdverbdActionTypes.ON_CLICK_DELETE_ADVERBD:
                newState = newState.deleteIn(['coll',action.id])
                break

            // Insert a new record programmatically, w/o a UI.
            case AdverbdActionTypes.INSERT_ADVERBD:
                newState = insertNewRecord(action.adverbd)
                break

            default:
            // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

export default new AdverbdStore()
