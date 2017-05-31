// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import Determinerd            from './Determinerd'
import DeterminerdActionTypes from './DeterminerdActionTypes'
import AppDispatcher    from '../../AppDispatcher'
import {MakeMapOfDeterminerd} from '../../JSONParseUtils'
import {determinerdExamples}  from '../../TestData'
import {validateDeterminerd}  from '../../Validator'
import AppActionTypes   from '../../app/AppActionTypes'

import {localStorageAvailable} from '../../LocalStorage'
import {migrateNG}             from '../../LocalStorage'
const localStorageKey:string = 'DeterminerdStore'

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
const currentStateTemplate:Object = factoryReset // means no migrations yet

class DeterminerdStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = migrateNG(fromJS(JSON.parse(localStorageState)), mutators, factoryReset)
                let newColl = MakeMapOfDeterminerd(originalParse.getIn(['coll']))
                return originalParse.set('coll',newColl)
            }
        }

        return migrateNG(factoryReset, mutators, factoryReset)

    }

    reduce(state:Object, action:Object):Object {

        function insertNewRecord(presentState:Object, determinerd:Object) {
            validateDeterminerd(determinerd)
            const id:number = presentState.getIn(['nextid'])
            let newState:Object = presentState.setIn(['nextid'], id + 1)

            return newState.setIn(['coll',id.toString()], Determinerd({
                id: id.toString(),
                base: determinerd.get('base')
            }))
        }

        let newState:Object = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            // Insert a new record or update an existing one, originating from a UI.
            case DeterminerdActionTypes.ON_CLICK_SAVE_DETERMINERD:
                validateDeterminerd(action.determinerd)
                if(action.determinerd.id) {
                    // An id exists so update the existing record.
                    newState = newState.setIn(['coll', action.determinerd.id], Determinerd(action.determinerd))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(newState, action.determinerd)
                }
                break

            case DeterminerdActionTypes.ON_CLICK_DELETE_DETERMINERD:
                newState = newState.deleteIn(['coll',action.id])
                break

            // Insert a new record programmatically, w/o a UI.
            case DeterminerdActionTypes.INSERT_DETERMINERD:
                newState = insertNewRecord(newState, action.determinerd)
                break

            default:
                // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

export default new DeterminerdStore()
export {currentStateTemplate}
export {factoryReset}
export {mutators}
