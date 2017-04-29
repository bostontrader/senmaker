// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS, Map} from 'immutable'

import NP             from './NP'
import NPActionTypes  from './NPActionTypes'
import AppDispatcher  from '../AppDispatcher'
import {MakeMapOfNP}  from '../JSONParseUtils'
import {npExamples}   from '../TestData'
import {validateNP}   from '../Validator'
import AppActionTypes from '../app/AppActionTypes'
import Nound          from '../dictionary/nound/Nound'

import {localStorageAvailable} from '../../LocalStorage'
const localStorageKey = 'NPStore'

class NPStore extends ReduceStore {
    constructor() {
        super(AppDispatcher)
    }

    getInitialState():Object {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = fromJS(JSON.parse(localStorageState))
                let newColl = MakeMapOfNP(originalParse.getIn(['coll']))
                return originalParse.set('coll',newColl)
            }
        }
        return NPStore.initialState

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
            case AppActionTypes.ON_APP_RESET:
                newState = NPStore.initialState
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

NPStore.initialState = Map({
    nextid:1,
    coll:Map()  // the actual collection of np
})

export default new NPStore()
