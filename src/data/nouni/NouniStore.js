import {ReduceStore} from 'flux/utils'
import {fromJS, Map} from 'immutable'

import Nouni              from './Nouni'
import NouniActionTypes   from './NouniActionTypes'
import NouniAEActionTypes from './addedit/NouniAEActionTypes'
import AppDispatcher      from '../AppDispatcher'
import AppActionTypes     from '../app/AppActionTypes'
import Nound              from '../dictionary/nound/Nound'

import {localStorageAvailable} from '../../LocalStorage'
const localStorageKey = 'NouniStore'

class NouniStore extends ReduceStore {
    constructor() {
        super(AppDispatcher)
    }

    getInitialState() {

        if (localStorageAvailable) {
            const localStorageState = localStorage.getItem(localStorageKey)

            if(localStorageState)
                return fromJS(JSON.parse(localStorageState))
        }

        return NouniStore.initialState

    }

    reduce(state, action) {

        function insertNewRecord(nouni) {
            const id = state.getIn(['nextid'])
            let newState = state.setIn(['nextid'], id + 1)
            return newState.setIn(['coll',id], Nouni({
                id: id,
                nound: Nound(nouni.nound),
                definiteness: nouni.definiteness,
                generatedText: nouni.generatedText
            }))
        }

        let newState = state
        
        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_APP_RESET:
                newState = NouniStore.initialState
                break

            // Insert a new record or update an existing one, originating from a UI.
            case NouniAEActionTypes.ON_CLICK_SAVE_NOUNI:
                if(action.nouni.id) {
                    // An id exists so update the existing record.
                    newState = newState.setIn(['coll', action.nouni.id], Nouni(action.nouni))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(action.nouni)
                }
                break
            
            case NouniAEActionTypes.ON_CLICK_DELETE_NOUNI:
                // Use them both to make the UI and the test work. Why?
                newState = newState.deleteIn(['coll',action.id.toString()]) // this works for the UI
                newState = newState.deleteIn(['coll',action.id]) // this works for the test
                break

            //case NoundActionTypes.INSERT_NOUN:
                //const id = Counter.increment()
                //return state.set(id, new Nound({
                    //id: id,
                    //base: action.noun.base,
                    //plural: action.noun.plural,
                    //pluralization_rule: action.noun.pluralization_rule
                //}))

            //case NoundActionTypes.UPDATE_NOUN:
                //return state.set(action.noun.get('id'), action.noun)

            // Insert a new record programmatically, w/o a UI.
            case NouniActionTypes.INSERT_NOUNI:
                newState = insertNewRecord(action.nouni)
                break

            default:
                // do nothing, newState is already set to the existing state
                
        }
        
        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

NouniStore.initialState = Map({
    nextid:1,
    coll:Map()  // the actual collection of nouni
})

export default new NouniStore()
