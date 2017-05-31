// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import Pronound            from './Pronound'
import PronoundActionTypes from './PronoundActionTypes'
import AppDispatcher    from '../../AppDispatcher'
import {MakeMapOfPronound} from '../../JSONParseUtils'
import {pronoundExamples}  from '../../TestData'
import {validatePronound}  from '../../Validator'
import AppActionTypes   from '../../app/AppActionTypes'

import {localStorageAvailable} from '../../LocalStorage'
import {migrateNG}             from '../../LocalStorage'
const localStorageKey:string = 'PronoundStore'

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
const currentStateTemplate:Object = factoryReset

class PronoundStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = migrateNG(fromJS(JSON.parse(localStorageState)), mutators, factoryReset)
                let newColl = MakeMapOfPronound(originalParse.getIn(['coll']))
                return originalParse.set('coll',newColl)
            }
        }

        return migrateNG(factoryReset, mutators, factoryReset)

    }

    reduce(state:Object, action:Object):Object {

        function insertNewRecord(presentState:Object, pronound:Object) {
            validatePronound(pronound)
            const id:number = presentState.getIn(['nextid'])
            let newState:Object = presentState.setIn(['nextid'], id + 1)

            return newState.setIn(['coll',id.toString()], Pronound({
                id: id.toString(),
                base: pronound.get('base'),
                plural: pronound.get('plural'),
                pluralization_rule: pronound.get('pluralization_rule')
            }))
        }

        let newState:Object = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            // Insert a new record or update an existing one, originating from a UI.
            case PronoundActionTypes.ON_CLICK_SAVE_PRONOUND:
                validatePronound(action.pronound)
                if(action.pronound.id) {
                    // An id exists so update the existing record.
                    newState = newState.setIn(['coll', action.pronound.id], Pronound(action.pronound))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(newState, action.pronound)
                }
                break

            case PronoundActionTypes.ON_CLICK_DELETE_PRONOUND:
                newState = newState.deleteIn(['coll',action.id])
                break

            // Insert a new record programmatically, w/o a UI.
            case PronoundActionTypes.INSERT_PRONOUND:
                newState = insertNewRecord(newState, action.pronound)
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
export {currentStateTemplate}
export {factoryReset}
export {mutators}
