// @flow
import {ReduceStore} from 'flux/utils'

import ConjunctiondStoreState  from './ConjunctiondStoreState'
import Conjunctiond            from './Conjunctiond'
import ConjunctiondActionTypes from './ConjunctiondActionTypes'
import AppDispatcher        from '../../AppDispatcher'
import {deserialize}        from '../../Serializer'
import AppActionTypes       from '../../app/AppActionTypes'

import {localStorageAvailable} from '../../LocalStorage'
const localStorageKey:string = 'ConjunctiondStore'

class ConjunctiondStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable)
            if(localStorage.getItem(localStorageKey)) return deserialize(localStorage.getItem(localStorageKey))

        return ConjunctiondStoreState()
    }

    reduce(state:Object, action:Object):Object {

        function insertNewRecord(conjunctiond) {
            const id:number = state.getIn(['nextid'])
            let newState = state.setIn(['nextid'], id + 1)
            return newState.setIn(['coll',id.toString()], Conjunctiond({
                id: id.toString(),
                base: conjunctiond.get('base')
                // don't set t or v here
            }))
        }

        let newState:Object = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = ConjunctiondStoreState()
                break

            // Insert a new record or update an existing one, originating from a UI.
            case ConjunctiondActionTypes.ON_CLICK_SAVE_CONJUNCTIOND:
                if(action.conjunctiond.id) {
                    // An id exists so update the existing record.
                    newState = newState.setIn(['coll', action.conjunctiond.id], Conjunctiond(action.conjunctiond))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(action.conjunctiond)
                }
                break

            case ConjunctiondActionTypes.ON_CLICK_DELETE_CONJUNCTIOND:
                newState = newState.deleteIn(['coll',action.id])
                break

            // Insert a new record programmatically, w/o a UI.
            case ConjunctiondActionTypes.INSERT_CONJUNCTIOND:
                newState = insertNewRecord(action.conjunctiond)
                break

            default:
            // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

export default new ConjunctiondStore()
