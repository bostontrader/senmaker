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
const localStorageKey = 'ClauseStore'

class ClauseStore extends ReduceStore {
    constructor() {
        super(AppDispatcher)
    }

    getInitialState():Object {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = fromJS(JSON.parse(localStorageState))
                let newColl = MakeMapOfClause(originalParse.getIn(['coll']))
                return originalParse.set('coll',newColl)
            }
        }
        return ClauseStore.initialState

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
                newState = ClauseStore.initialState
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

ClauseStore.initialState = Map({
    nextid:1,
    coll:Map()  // the actual collection of clause
})

export default new ClauseStore()
