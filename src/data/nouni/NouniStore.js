import {ReduceStore} from 'flux/utils'
import {fromJS, Map} from 'immutable'

import Counter            from './Counter'
import Nouni              from './Nouni'
import NouniActionTypes   from './NouniActionTypes'
import NouniAEActionTypes from './addedit/NouniAEActionTypes'
import AppDispatcher      from '../AppDispatcher'
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
            //console.log(nouni.toJSON())
            //console.log(nouni.nound.toJSON())

            const id = Counter.increment()
            return state.set(id, Nouni({
                id: id,
                nound: Nound(nouni.nound),
                definiteness: nouni.definiteness,
                generatedText: nouni.generatedText
            }))
        }

        let newState = state
        
        switch (action.type) {

            // Insert a new record or update an existing one, originating from a UI.
            case NouniAEActionTypes.ON_CLICK_SAVE_NOUNI:
                if(action.nouni.id) {
                    // An id exists so update the existing record.
                    //const nound = Nound(action.nouni.noud)
                    //const nouni = Nouni
                    const nouni = Nouni(action.nouni)
                    console.log(nouni)
                    newState = newState.set(action.nouni.id, Nouni(action.nouni))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(action.nouni)
                }
                break
            
            //case NoundActionTypes.DELETE_NOUN:
                //return state.delete(action.id)

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

NouniStore.initialState = Map()

export default new NouniStore()
