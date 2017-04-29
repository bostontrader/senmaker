// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS, Map} from 'immutable'

import Adjectivd            from './Adjectivd'
import AdjectivdActionTypes from './AdjectivdActionTypes'
import AppActionTypes       from '../../app/AppActionTypes'
import AppDispatcher        from '../../AppDispatcher'
import {MakeMapOfAdjectivd} from '../../JSONParseUtils'
import {validateAdjectivd}  from '../../Validator'

import {localStorageAvailable} from '../../../LocalStorage'
const localStorageKey = 'AdjectivdStore'

class AdjectivdStore extends ReduceStore {
    constructor() {
        super(AppDispatcher)
    }

    getInitialState() {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = fromJS(JSON.parse(localStorageState))
                let newColl = MakeMapOfAdjectivd(originalParse.getIn(['coll']))
                return originalParse.set('coll',newColl)
            }
        }

        return AdjectivdStore.initialState

    }

    reduce(state:Object, action:Object):Object {

        function insertNewRecord(adjectivd) {
            validateAdjectivd(adjectivd)
            const id:number = state.getIn(['nextid'])
            let newState = state.setIn(['nextid'], id + 1)

            return newState.setIn(['coll',id.toString()], Adjectivd({
                id: id.toString(),
                base: adjectivd.get('base')
            }))
        }

        let newState:Object = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_APP_RESET:
                newState = AdjectivdStore.initialState
                break

            // Insert a new record or update an existing one, originating from a UI.
            case AdjectivdActionTypes.ON_CLICK_SAVE_ADJECTIVD:
                validateAdjectivd(action.adjectivd)
                if(action.adjectivd.id) {
                    // An id exists so update the existing record.
                    newState = newState.setIn(['coll', action.adjectivd.id], Adjectivd(action.adjectivd))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(action.adjectivd)
                }
                break

            case AdjectivdActionTypes.ON_CLICK_DELETE_ADJECTIVD:
                newState = newState.deleteIn(['coll',action.id])
                break

            // Insert a new record programmatically, w/o a UI.
            case AdjectivdActionTypes.INSERT_ADJECTIVD:
                newState = insertNewRecord(action.adjectivd)
                break

            default:
            // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

AdjectivdStore.initialState = Map({
    nextid:1,
    coll:Map()
})

export default new AdjectivdStore()
