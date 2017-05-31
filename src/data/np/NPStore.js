// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import NP             from './NP'
import NPActionTypes  from './NPActionTypes'
import AppDispatcher  from '../AppDispatcher'
import {MakeMapOfNP}  from '../JSONParseUtils'
import {npExamples}   from '../TestData'
import {validateNP}   from '../Validator'
import AppActionTypes from '../app/AppActionTypes'
import Nound          from '../dictionary/nound/Nound'

import {localStorageAvailable} from '../LocalStorage'
import {migrateNG}             from '../LocalStorage'
const localStorageKey:string = 'NPStore'

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

class NPStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = migrateNG(fromJS(JSON.parse(localStorageState)), mutators, factoryReset)
                let newColl = MakeMapOfNP(originalParse.getIn(['coll']))
                return originalParse.set('coll',newColl)
            }
        }
        return migrateNG(factoryReset, mutators, factoryReset)

    }

    reduce(state:Object, action:Object):Object {

        function insertNewRecord(presentState:Object, np:Object):Object {
            validateNP(np)
            const id:number = presentState.getIn(['nextid'])
            let newState:Object = presentState.setIn(['nextid'], id + 1)

            return newState.setIn(['coll',id.toString()], NP({
                id: id.toString(),
                nound: np.get('nound'),
                definiteness: np.get('definiteness'),
                generatedText: np.get('generatedText')
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
                if(action.store==='np') {
                    newState = insertNewRecord(newState, npExamples.a)
                    newState = insertNewRecord(newState, npExamples.b)
                    newState = insertNewRecord(newState, npExamples.c)
                    newState = newState.set('showExamplesButton', false)
                }
                break

            // Insert a new record or update an existing one, originating from a UI.
            case NPActionTypes.ON_CLICK_SAVE_NP: // string
                validateNP(action.np)
                if(action.np.id) {
                    // An id exists so update the existing record.
                    newState = newState.setIn(['coll', action.np.id], NP(action.np))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(newState, action.np)
                }
                break
            
            case NPActionTypes.ON_CLICK_DELETE_NP:
                newState = newState.deleteIn(['coll',action.id])
                break

            // Insert a new record programmatically, w/o a UI.
            case NPActionTypes.INSERT_NP:
                validateNP(action.np)
                newState = insertNewRecord(newState, action.np)
                break

            default:
                // do nothing, newState is already set to the existing state
                
        }
        
        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

export default new NPStore()
export {currentStateTemplate}
export {factoryReset}
export {mutators}
