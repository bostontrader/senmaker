// @flow
import {ReduceStore} from 'flux/utils'

import AdjectivdStoreState  from './AdjectivdStoreState'
import Adjectivd            from './Adjectivd'
import AdjectivdActionTypes from './AdjectivdActionTypes'
import AppDispatcher        from '../../AppDispatcher'
import {deserialize}        from '../../Serializer'
import AppActionTypes       from '../../app/AppActionTypes'

import {localStorageAvailable} from '../../LocalStorage'
const localStorageKey:string = 'AdjectivdStore'

class AdjectivdStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable)
            if(localStorage.getItem(localStorageKey)) return deserialize(localStorage.getItem(localStorageKey))

        return AdjectivdStoreState()
    }

    reduce(state:Object, action:Object):Object {

        function insertNewRecord(adjectivd) {
            const id:number = state.getIn(['nextid'])
            let newState = state.setIn(['nextid'], id + 1)
            return newState.setIn(['coll',id.toString()], Adjectivd({
                id: id.toString(),
                base: adjectivd.get('base')
                // don't set t or v here
            }))
        }

        let newState:Object = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = AdjectivdStoreState()
                break

            // Insert a new record or update an existing one, originating from a UI.
            case AdjectivdActionTypes.ON_CLICK_SAVE_ADJECTIVD:
                if(action.adjectivd.id) {
                    // An id exists so update the existing record.
                    newState = newState.setIn(['coll', action.adjectivd.id], Adjectivd(action.adjectivd))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(action.adjectivd)
                }
                break

            case AdjectivdActionTypes.ON_CLICK_DELETE_ADJECTIVD:
                newState = newState.deleteIn(['coll',action.id])
                break

            // Insert a new record programmatically, w/o a UI.
            case AdjectivdActionTypes.INSERT_ADJECTIVD:
                newState = insertNewRecord(action.adjectivd)
                break

            default:
                // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

export default new AdjectivdStore()
