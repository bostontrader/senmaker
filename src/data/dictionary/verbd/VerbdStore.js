// @flow
import {ReduceStore} from 'flux/utils'

import VerbdStoreState  from './VerbdStoreState'
import Verbd            from './Verbd'
import VerbdActionTypes from './VerbdActionTypes'
import AppDispatcher        from '../../AppDispatcher'
import {deserialize}        from '../../Serializer'
import AppActionTypes       from '../../app/AppActionTypes'

import {localStorageAvailable} from '../../LocalStorage'
const localStorageKey:string = 'VerbdStore'

class VerbdStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable)
            if(localStorage.getItem(localStorageKey)) return deserialize(localStorage.getItem(localStorageKey))

        return VerbdStoreState()
    }

    reduce(state:Object, action:Object):Object {

        function insertNewRecord(verbd) {
            const id:number = state.getIn(['nextid'])
            let newState = state.setIn(['nextid'], id + 1)
            return newState.setIn(['coll',id.toString()], Verbd({
                id: id.toString(),
                base: verbd.get('base'),
                pastForm: verbd.get('pastForm'),
                pastForm_rule: verbd.get('pastForm_rule'),
                aspectOrSimple: verbd.get('aspectOrSimple'),
                aspect: verbd.get('aspect')
                // don't set t or v here
            }))
        }

        let newState:Object = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = VerbdStoreState()
                break

            // Insert a new record or update an existing one, originating from a UI.
            case VerbdActionTypes.ON_CLICK_SAVE_VERBD:
                if(action.verbd.id) {
                    // An id exists so update the existing record.
                    newState = newState.setIn(['coll', action.verbd.id], Verbd(action.verbd))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(action.verbd)
                }
                break

            case VerbdActionTypes.ON_CLICK_DELETE_VERBD:
                newState = newState.deleteIn(['coll',action.id])
                break

            // Insert a new record programmatically, w/o a UI.
            case VerbdActionTypes.INSERT_VERBD:
                newState = insertNewRecord(action.verbd)
                break

            default:
            // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

export default new VerbdStore()
