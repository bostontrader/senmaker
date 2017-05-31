// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import Prepositiond            from './Prepositiond'
import PrepositiondActionTypes from './PrepositiondActionTypes'
import AppDispatcher           from '../../AppDispatcher'
import {MakeMapOfPrepositiond} from '../../JSONParseUtils'
import {validatePrepositiond}  from '../../Validator'
import AppActionTypes          from '../../app/AppActionTypes'

import {localStorageAvailable} from '../../LocalStorage'
import {migrateNG}             from '../../LocalStorage'
const localStorageKey:string = 'PrepositiondStore'

// This is how it starts in the very beginning.
const factoryReset:Object = Map({
    v:0,
    nextid:1,
    coll:Map()
})

// mutators[0] will mutate priorTemplate from v0 to v1
const mutators:Array<Function> = []

// This is what the structure should look like when finished.
// We only need this for testing.
const currentStateTemplate:Object = Map({
    v:0,
    nextid:1,
    coll:Map()
})

class PrepositiondStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState() {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = migrateNG(fromJS(JSON.parse(localStorageState)), mutators, factoryReset)
                let newColl = MakeMapOfPrepositiond(originalParse.getIn(['coll']))
                return originalParse.set('coll',newColl)
            }
        }

        return migrateNG(factoryReset, mutators, factoryReset)

    }

    reduce(state:Object, action:Object):Object {

        function insertNewRecord(prepositiond) {
            validatePrepositiond(prepositiond)
            const id:number = state.getIn(['nextid'])
            let newState = state.setIn(['nextid'], id + 1)

            return newState.setIn(['coll',id.toString()], Prepositiond({
                id: id.toString(),
                base: prepositiond.get('base')
            }))
        }

        let newState:Object = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            // Insert a new record or update an existing one, originating from a UI.
            case PrepositiondActionTypes.ON_CLICK_SAVE_PREPOSITIOND:
                validatePrepositiond(action.prepositiond)
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
export {currentStateTemplate}
export {factoryReset}
export {mutators}
