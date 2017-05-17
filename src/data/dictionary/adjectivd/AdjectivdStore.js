// @flow
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'
import {ReduceStore} from 'flux/utils'

import Adjectivd            from './Adjectivd'
import AdjectivdActionTypes from './AdjectivdActionTypes'
import AppDispatcher        from '../../AppDispatcher'
import {MakeMapOfAdjectivd} from '../../JSONParseUtils'
import {validateAdjectivd}  from '../../Validator'
import AppActionTypes       from '../../app/AppActionTypes'

import {localStorageAvailable} from '../../../LocalStorage'
const localStorageKey:string = 'AdjectivdStore'

// We want to provide a migration capacity for the format of this store.  It's serialized
// into localStorage and there's no telling when old versions will be seen in the future.
const initialStates:Array<Object> = [
    Map({
        nextid:1,
        coll:Map()
    }),
    Map({
        version:1,
        nextid:1,
        coll:Map()
    })
]

class AdjectivdStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState() {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = this.migrate(fromJS(JSON.parse(localStorageState)))
                let newColl = MakeMapOfAdjectivd(originalParse.getIn(['coll']))
                return originalParse.set('coll',newColl)
            }
        }

        return initialStates.slice(-1)[0]

    }

    // Given an originalFormat state object migrate to the most current version
    migrate(originalFormat:Object):Object {
        const currentInitialState:Object = initialStates.slice(-1)[0]
        const originalVersion:number = originalFormat.getIn(['version'])

        // If the version is undefined then we start fresh
        if(originalVersion === undefined)
            return currentInitialState

        // If the version is the most recent
        if (originalVersion === currentInitialState.getIn(['version']))
            return originalFormat

        // Else migrate from the originalVersion to the current version
        // But at this time there are no intermediate version to migrate through
        // so do nothing
        return currentInitialState
    }

    reduce(state:Object, action:Object):Object {

        function insertNewRecord(adjectivd) {
            validateAdjectivd(adjectivd)
            const id:number = state.getIn(['nextid'])
            let newState = state.setIn(['nextid'], id + 1)

            return newState.setIn(['coll',id.toString()], Adjectivd({
                id: id.toString(),
                base: adjectivd.get('base')
            }))
        }

        let newState:Object = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = initialStates.slice(-1)[0]
                break

            // Insert a new record or update an existing one, originating from a UI.
            case AdjectivdActionTypes.ON_CLICK_SAVE_ADJECTIVD:
                validateAdjectivd(action.adjectivd)
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
export {initialStates}
