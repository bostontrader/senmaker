// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import Nound            from './Nound'
import NoundActionTypes from './NoundActionTypes'
import AppDispatcher    from '../../AppDispatcher'
import {MakeMapOfNound} from '../../JSONParseUtils'
import {noundExamples}  from '../../TestData'
import {validateNound}  from '../../Validator'
import AppActionTypes   from '../../app/AppActionTypes'

import {localStorageAvailable} from '../../LocalStorage'
import {migrateNG}             from '../../LocalStorage'
const localStorageKey:string = 'NoundStore'

// This is how it starts in the very beginning.
const factoryReset:Object = Map({
    v:0,
    nextid:1,
    coll:Map()
})

// mutators[0] will mutate priorTemplate from v0 to v1
const mutators:Array<Function> = [
    (priorTemplate:Object):Object => {  // v0 -> v1
        return priorTemplate.merge({showExamplesButton:true}).set('v',1)
    }
]

// This is what the structure should look like when finished.
// We only need this for testing.
const currentStateTemplate:Object = Map({
    v:1,
    nextid:1,
    coll:Map(),
    showExamplesButton:true
})

class NoundStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = migrateNG(fromJS(JSON.parse(localStorageState)), mutators, factoryReset)
                let newColl = MakeMapOfNound(originalParse.getIn(['coll']))
                return originalParse.set('coll',newColl)
            }
        }

        return migrateNG(factoryReset, mutators, factoryReset)

    }

    reduce(state:Object, action:Object):Object {

        function insertNewRecord(presentState:Object, nound:Object) {
            validateNound(nound)
            const id:number = presentState.getIn(['nextid'])
            let newState:Object = presentState.setIn(['nextid'], id + 1)

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
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            // AppActionTypes
            case AppActionTypes.ON_CLICK_EXAMPLES:
                newState = insertNewRecord(newState, noundExamples.a)
                newState = insertNewRecord(newState, noundExamples.b)
                newState = insertNewRecord(newState, noundExamples.c)
                newState = insertNewRecord(newState, noundExamples.d)
                newState = newState.set('showExamplesButton',false)
                break

            // Insert a new record or update an existing one, originating from a UI.
            case NoundActionTypes.ON_CLICK_SAVE_NOUND:
                validateNound(action.nound)
                if(action.nound.id) {
                    // An id exists so update the existing record.
                    newState = newState.setIn(['coll', action.nound.id], Nound(action.nound))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(newState, action.nound)
                }
                break

            case NoundActionTypes.ON_CLICK_DELETE_NOUND:
                newState = newState.deleteIn(['coll',action.id])
                break

            // Insert a new record programmatically, w/o a UI.
            case NoundActionTypes.INSERT_NOUND:
                newState = insertNewRecord(newState, action.nound)
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
export {currentStateTemplate}
export {factoryReset}
export {mutators}
