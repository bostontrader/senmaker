// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import Conjunctiond            from './Conjunctiond'
import ConjunctiondActionTypes from './ConjunctiondActionTypes'
import AppDispatcher           from '../../AppDispatcher'
import {MakeMapOfConjunctiond} from '../../JSONParseUtils'
import {conjunctiondExamples}  from '../../TestData'
import {validateConjunctiond}  from '../../Validator'
import AppActionTypes          from '../../app/AppActionTypes'

import {localStorageAvailable} from '../../LocalStorage'
import {migrateNG}             from '../../LocalStorage'
const localStorageKey:string = 'ConjunctiondStore'

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

class ConjunctiondStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = migrateNG(fromJS(JSON.parse(localStorageState)), mutators, factoryReset)
                let newColl = MakeMapOfConjunctiond(originalParse.getIn(['coll']))
                return originalParse.set('coll',newColl)
            }
        }

        return migrateNG(factoryReset, mutators, factoryReset)

    }

    reduce(state:Object, action:Object):Object {

        function insertNewRecord(presentState:Object, conjunctiond:Object) {
            validateConjunctiond(conjunctiond)
            const id:number = presentState.getIn(['nextid'])
            let newState:Object = presentState.setIn(['nextid'], id + 1)

            return newState.setIn(['coll',id.toString()], Conjunctiond({
                id: id.toString(),
                base: conjunctiond.get('base')
            }))
        }

        let newState:Object = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            // Insert a new record or update an existing one, originating from a UI.
            case ConjunctiondActionTypes.ON_CLICK_SAVE_CONJUNCTIOND:
                validateConjunctiond(action.conjunctiond)
                if(action.conjunctiond.id) {
                    // An id exists so update the existing record.
                    newState = newState.setIn(['coll', action.conjunctiond.id], Conjunctiond(action.conjunctiond))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(newState, action.conjunctiond)
                }
                break

            case ConjunctiondActionTypes.ON_CLICK_DELETE_CONJUNCTIOND:
                newState = newState.deleteIn(['coll',action.id])
                break

            // Insert a new record programmatically, w/o a UI.
            case ConjunctiondActionTypes.INSERT_CONJUNCTIOND:
                newState = insertNewRecord(newState, action.conjunctiond)
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
export {currentStateTemplate}
export {factoryReset}
export {mutators}
