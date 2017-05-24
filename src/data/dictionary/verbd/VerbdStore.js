// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import Verbd            from './Verbd'
import VerbdActionTypes from './VerbdActionTypes'
//import {PastFormRule}   from './VerbdConstants'
import AppDispatcher    from '../../AppDispatcher'
import {MakeMapOfVerbd} from '../../JSONParseUtils'
import {validateVerbd}  from '../../Validator'
import AppActionTypes   from '../../app/AppActionTypes'

import {localStorageAvailable} from '../../LocalStorage'
const localStorageKey:string = 'VerbdStore'

// We want to provide a migration capacity for the format of this store.  It's serialized
// into localStorage and there's no telling when old versions will be seen in the future.
const initialStates:Array<Object> = [
    Map({
        nextid:1,
        coll:Map()
    }),
    Map({
        v:1,
        nextid:1,
        coll:Map()
    })
]

class VerbdStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState() {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = this.migrate(fromJS(JSON.parse(localStorageState)))
                let newColl = MakeMapOfVerbd(originalParse.getIn(['coll']))
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

        function insertNewRecord(verbd) {
            validateVerbd(verbd)
            const id:number = state.getIn(['nextid'])
            let newState = state.setIn(['nextid'], id + 1)

            return newState.setIn(['coll',id.toString()], Verbd({
                id: id.toString(),
                base: verbd.get('base'),
                pastForm: verbd.get('pastForm'),
                pastForm_rule: verbd.get('pastForm_rule'),
                aspectOrSimple: verbd.get('aspectOrSimple'),
                aspect: verbd.get('aspect')
            }))
        }

        let newState:Object = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = initialStates.slice(-1)[0]
                break

            // Insert a new record or update an existing one, originating from a UI.
            case VerbdActionTypes.ON_CLICK_SAVE_VERBD:
                validateVerbd(action.verbd)
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
            localStorage.setItem(localStorageKey, JSON.stringify(newState))

        return newState
    }
}

export default new VerbdStore()
export {initialStates}
