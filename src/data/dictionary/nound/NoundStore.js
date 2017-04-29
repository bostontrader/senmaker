// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS, Map} from 'immutable'

import Nound               from './Nound'
import NoundActionTypes    from './NoundActionTypes'
import AppActionTypes      from '../../app/AppActionTypes'
import AppDispatcher       from '../../AppDispatcher'
import {MakeMapOfNound}    from '../../JSONParseUtils'
import {validateNound}     from '../../Validator'

import {localStorageAvailable} from '../../../LocalStorage'
const localStorageKey = 'NoundStore'

class NoundStore extends ReduceStore {
    constructor() {
        super(AppDispatcher)
    }

    getInitialState() {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = fromJS(JSON.parse(localStorageState))
                let newColl = MakeMapOfNound(originalParse.getIn(['coll']))
                return originalParse.set('coll',newColl)
            }
        }

        return NoundStore.initialState

    }

    reduce(state:Object, action:Object):Object {

        function insertNewRecord(nound) {
            validateNound(nound)
            const id:number = state.getIn(['nextid'])
            let newState = state.setIn(['nextid'], id + 1)

            return newState.setIn(['coll',id.toString()], Nound({
                id: id.toString(),
                base: nound.get('base'),
                plural: nound.get('plural'),
                pluralization_rule: nound.get('pluralization_rule')
            }))
        }

        let newState:Object = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_APP_RESET:
                newState = NoundStore.initialState
                break

            // Insert a new record or update an existing one, originating from a UI.
            case NoundActionTypes.ON_CLICK_SAVE_NOUND:
                validateNound(action.nound)
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

NoundStore.initialState = Map({
    nextid:1,
    coll:Map()
})

export default new NoundStore()
