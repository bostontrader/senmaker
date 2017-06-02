// @flow
import {ReduceStore} from 'flux/utils'

import PronoundStoreState  from './PronoundStoreState'
import Pronound            from './Pronound'
import PronoundActionTypes from './PronoundActionTypes'
import AppDispatcher        from '../../AppDispatcher'
import {deserialize}        from '../../Serializer'
import AppActionTypes       from '../../app/AppActionTypes'

import {localStorageAvailable} from '../../LocalStorage'
const localStorageKey:string = 'PronoundStore'

class PronoundStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable)
            if(localStorage.getItem(localStorageKey)) return deserialize(localStorage.getItem(localStorageKey))

        return PronoundStoreState()
    }

    reduce(state:Object, action:Object):Object {

        function insertNewRecord(pronound) {
            const id:number = state.getIn(['nextid'])
            let newState = state.setIn(['nextid'], id + 1)
            return newState.setIn(['coll',id.toString()], Pronound({
                id: id.toString(),
                base: pronound.get('base')
                // don't set t or v here
            }))
        }

        let newState:Object = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = PronoundStoreState()
                break

            // Insert a new record or update an existing one, originating from a UI.
            case PronoundActionTypes.ON_CLICK_SAVE_PRONOUND:
                if(action.pronound.id) {
                    // An id exists so update the existing record.
                    newState = newState.setIn(['coll', action.pronound.id], Pronound(action.pronound))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(action.pronound)
                }
                break

            case PronoundActionTypes.ON_CLICK_DELETE_PRONOUND:
                newState = newState.deleteIn(['coll',action.id])
                break

            // Insert a new record programmatically, w/o a UI.
            case PronoundActionTypes.INSERT_PRONOUND:
                newState = insertNewRecord(action.pronound)
                break

            default:
            // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

export default new PronoundStore()
