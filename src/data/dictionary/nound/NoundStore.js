// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import Nound            from './Nound'
import NoundActionTypes from './NoundActionTypes'
import AppDispatcher    from '../../AppDispatcher'
import {MakeMapOfNound} from '../../JSONParseUtils'
import {validateNound}  from '../../Validator'
import AppActionTypes   from '../../app/AppActionTypes'

import {localStorageAvailable} from '../../LocalStorage'
const localStorageKey:string = 'NoundStore'

// We want to provide a migration capacity for the format of this store.  It's serialized
// into localStorage and there's no telling when old versions will be seen in the future.
const initialStates:Array<Object> = [
    Map({
        nextid:1,
        coll:Map()
    }),
    Map({
        v:0,
        nextid:1,
        coll:Map()
    })
]

class NoundStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = this.migrate(fromJS(JSON.parse(localStorageState)))
                let newColl = MakeMapOfNound(originalParse.getIn(['coll']))
                return originalParse.set('coll',newColl)
            }
        }

        return initialStates.slice(-1)[0]

    }

    // Given an originalFormat state object migrate to the most current version
    migrate(originalFormat:Object):Object {
        const currentInitialState:Object = initialStates.slice(-1)[0]
        const originalVersion:number = originalFormat.getIn(['v'])

        // If the version is undefined then we start fresh
        if(originalVersion === undefined)
            return currentInitialState

        // If the version is the most recent
        if (originalVersion === currentInitialState.getIn(['v']))
            return originalFormat

        // Else migrate from the originalVersion to the current version
        // But at this time there are no intermediate version to migrate through
        // so do nothing
        return currentInitialState
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
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = initialStates.slice(-1)[0]
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

export default new NoundStore()
export {initialStates}
