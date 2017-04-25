// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS, Map} from 'immutable'

import Nound               from './Nound'
import NoundActionTypes    from './NoundActionTypes'
import {PluralizationRule} from './NoundConstants'
import AppActionTypes      from '../../app/AppActionTypes'
import AppDispatcher       from '../../AppDispatcher'

import {localStorageAvailable} from '../../../LocalStorage'
const localStorageKey = 'NoundStore'

class NoundStore extends ReduceStore {
    constructor() {
        super(AppDispatcher)
    }

    getInitialState() {

        if (localStorageAvailable) {
            const localStorageState = localStorage.getItem(localStorageKey)

            if(localStorageState)
                return fromJS(JSON.parse(localStorageState))
        }

        return NoundStore.initialState

    }

    reduce(state:Object, action:Object) {
        function insertNewRecord(nound) {
            const id = state.getIn(['nextid'])
            let newState = state.setIn(['nextid'], id + 1)
            return newState.setIn(['coll',id], Nound({
                id: id,
                base: nound.base,
                plural: nound.plural,
                pluralization_rule: nound.pluralization_rule
            }))
        }

        let newState = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_APP_RESET:
                newState = NoundStore.initialState
                break

            // Insert a new record or update an existing one, originating from a UI.
            case NoundActionTypes.ON_CLICK_SAVE_NOUND:
                if(action.nound.id) {
                    // An id exists so update the existing record.
                    newState = newState.setIn(['coll', action.nound.id], Nound(action.nound))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(action.nound)
                }
                break

            case NoundActionTypes.ON_CLICK_DELETE_NOUND:
                newState = newState.deleteIn(['coll',action.id])
                break

            // Insert a new record programmatically, w/o a UI.
            case NoundActionTypes.INSERT_NOUND:
                newState = insertNewRecord(action.nound)
                break

            default:
                // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

NoundStore.initialState = Map({
    nextid:1,
    coll:Map([
        ['1',Nound({id: '1', base: 'apple',  plural: 'apples', pluralization_rule: PluralizationRule.Append_s})],
        ['2',Nound({id: '2', base: 'box',    plural: 'boxes',  pluralization_rule: PluralizationRule.Append_es})],
        ['3',Nound({id: '3', base: 'fish',   plural: 'fish',   pluralization_rule: PluralizationRule.NoChange})],
        ['4',Nound({id: '4', base: 'person', plural: 'people', pluralization_rule: PluralizationRule.Irregular})]
    ])
})

export default new NoundStore()
