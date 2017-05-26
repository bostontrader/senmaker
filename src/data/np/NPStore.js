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
import {migrate}               from '../LocalStorage'
const localStorageKey:string = 'NPStore'

// We want to provide a migration capacity for the format of this store.  It's serialized
// into localStorage and there's no telling when old versions will be seen in the future.
const initialStates:Array<Object> = [
    Map({
        v:1,
        nextid:1,
        coll:Map()
    })
]

class NPStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = migrate(fromJS(JSON.parse(localStorageState)), initialStates)
                let newColl = MakeMapOfNP(originalParse.getIn(['coll']))
                return originalParse.set('coll',newColl)
            }
        }
        return initialStates.slice(-1)[0]

    }

    reduce(state:Object, action:Object):Object {

        function insertNewRecord(np:Object):Object {
            validateNP(np)
            const id:number = state.getIn(['nextid'])
            let newState = state.setIn(['nextid'], id + 1)

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
                newState = initialStates.slice(-1)[0]
                break

            // Insert a new record or update an existing one, originating from a UI.
            case NPActionTypes.ON_CLICK_SAVE_NP: // string
                validateNP(action.np)
                if(action.np.id) {
                    // An id exists so update the existing record.
                    newState = newState.setIn(['coll', action.np.id], NP(action.np))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(action.np)
                }
                break
            
            case NPActionTypes.ON_CLICK_DELETE_NP:
                newState = newState.deleteIn(['coll',action.id])
                break

            // Insert a new record programmatically, w/o a UI.
            case NPActionTypes.INSERT_NP:
                validateNP(action.np)
                newState = insertNewRecord(action.np)
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
export {initialStates}
