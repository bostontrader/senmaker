// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import Clause            from './Clause'
import ClauseActionTypes from './ClauseActionTypes'
import AppDispatcher     from '../AppDispatcher'
import {MakeMapOfClause} from '../JSONParseUtils'
import {clauseExamples}  from '../TestData'
import {validateClause}  from '../Validator'
import AppActionTypes    from '../app/AppActionTypes'

import {localStorageAvailable} from '../LocalStorage'
import {migrate}               from '../LocalStorage'
const localStorageKey = 'ClauseStore'

// We want to provide a migration capacity for the format of this store.  It's serialized
// into localStorage and there's no telling when old versions will be seen in the future.
const initialStates:Array<Object> = [
    Map({
        v:0,
        nextid:1,
        coll:Map()
    })
]

class ClauseStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = migrate(fromJS(JSON.parse(localStorageState)), initialStates)
                let newColl = MakeMapOfClause(originalParse.getIn(['coll']))
                return originalParse.set('coll',newColl)
            }
        }
        return initialStates.slice(-1)[0]

    }

    reduce(state:Object, action:Object):Object {

        function insertNewRecord(clause:Object):Object {
            validateClause(clause)
            const id:number = state.getIn(['nextid'])
            let newState = state.setIn(['nextid'], id + 1)

            return newState.setIn(['coll',id.toString()], Clause({
                id: id.toString(),
                np: clause.get('np'),
                vp: clause.get('vp'),
                generatedText: clause.get('generatedText')
            }))
        }

        let newState:Object = state
        
        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = initialStates.slice(-1)[0]
                break

            // Insert a new record or update an existing one, originating from a UI.
            case ClauseActionTypes.ON_CLICK_SAVE_CLAUSE:
                validateClause(action.clause)
                if(action.clause.id) {
                    // An id exists so update the existing record.
                    newState = newState.setIn(['coll', action.clause.id], Clause(action.clause))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(action.clause)
                }
                break
            
            case ClauseActionTypes.ON_CLICK_DELETE_CLAUSE:
                newState = newState.deleteIn(['coll',action.id])
                break

            // Insert a new record programmatically, w/o a UI.
            case ClauseActionTypes.INSERT_CLAUSE:
                validateClause(action.clause)
                newState = insertNewRecord(action.clause)
                break

            default:
                // do nothing, newState is already set to the existing state
                
        }
        
        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

export default new ClauseStore()
export {initialStates}
