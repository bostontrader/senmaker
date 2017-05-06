// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS, Map} from 'immutable'

import Verbd            from './Verbd'
import VerbdActionTypes from './VerbdActionTypes'
import {PastTenseRule}  from './VerbdConstants'
import AppActionTypes   from '../../app/AppActionTypes'
import AppDispatcher    from '../../AppDispatcher'
import {MakeMapOfVerbd} from '../../JSONParseUtils'
import {validateVerbd}  from '../../Validator'

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
                let originalParse = fromJS(JSON.parse(localStorageState))
                let newColl = MakeMapOfVerbd(originalParse.getIn(['coll']))
                return originalParse.set('coll',newColl)
            }
        }

        return VerbdStore.initialState

    }

    reduce(state:Object, action:Object):Object {

        function insertNewRecord(verbd) {
            validateVerbd(verbd)
            const id:number = state.getIn(['nextid'])
            let newState = state.setIn(['nextid'], id + 1)

            return newState.setIn(['coll',id.toString()], Verbd({
                id: id.toString(),
                base: verbd.get('base'),
                pastTense: verbd.get('pastTense'),
                pastTense_rule: verbd.get('pastTense_rule')
            }))
        }

        let newState:Object = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_APP_RESET:
                newState = VerbdStore.initialState
                break

            // Insert a new record or update an existing one, originating from a UI.
            case VerbdActionTypes.ON_CLICK_SAVE_VERBD:
                validateVerbd(action.verbd)
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
        //['1',Verbd({id: '1', base: 'eat',  pastTense: 'ate',    pastTense_rule: PastTenseRule.Irregular})],
        //['2',Verbd({id: '2', base: 'hit',  pastTense: 'hit',    pastTense_rule: PastTenseRule.NoChange})],
        //['3',Verbd({id: '3', base: 'jump', pastTense: 'jumped', pastTense_rule: PastTenseRule.Append_ed})]
    ])
})

export default new VerbdStore()
