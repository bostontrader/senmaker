// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS, Map} from 'immutable'

import Verbd            from './Verbd'
import VerbdActionTypes from './VerbdActionTypes'
import {PastTenseRule}  from './VerbdConstants'
import AppActionTypes   from '../../app/AppActionTypes'
import AppDispatcher    from '../../AppDispatcher'

import {localStorageAvailable} from '../../../LocalStorage'
const localStorageKey = 'VerbdStore'

class VerbdStore extends ReduceStore {
    constructor() {
        super(AppDispatcher)
    }

    getInitialState() {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let n = fromJS(JSON.parse(localStorageState))
                n = n.set('coll',n.getIn(['coll']).map(verbd => (Verbd(verbd))))
                return n
            } else {
                return VerbdStore.initialState
            }

        }

        return VerbdStore.initialState

    }

    reduce(state:Object, action:Object) {

        function insertNewRecord(verbd) {
            const id = state.getIn(['nextid'])
            let newState = state.setIn(['nextid'], id + 1)
            return newState.setIn(['coll',id], Verbd({
                id: id,
                base: verbd.base,
                pastTense: verbd.pastTense,
                pastTense_rule: verbd.pastTense_rule
            }))
        }

        let newState = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_APP_RESET:
                newState = VerbdStore.initialState
                break

            // Insert a new record or update an existing one, originating from a UI.
            case VerbdActionTypes.ON_CLICK_SAVE_VERBD:
                if(action.verbd.id) {
                    // An id exists so update the existing record.
                    newState = newState.setIn(['coll', action.verbd.id], Verbd(action.verbd))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(action.verbd)
                }
                break

            case VerbdActionTypes.ON_CLICK_DELETE_VERBD:
                newState = newState.deleteIn(['coll',action.id])
                break

            // Insert a new record programmatically, w/o a UI.
            case VerbdActionTypes.INSERT_VERBD:
                newState = insertNewRecord(action.verbd)
                break
            
            default:
                // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState))

        return newState
    }
}

VerbdStore.initialState = Map({
    nextid:1,
    coll:Map([
        ['1',Verbd({id: '1', base: 'eat',  pastTense: 'ate',    pastTense_rule: PastTenseRule.Irregular})],
        ['2',Verbd({id: '2', base: 'hit',  pastTense: 'hit',    pastTense_rule: PastTenseRule.NoChange})],
        ['3',Verbd({id: '3', base: 'jump', pastTense: 'jumped', pastTense_rule: PastTenseRule.Append_ed})]
    ])
})

export default new VerbdStore()
