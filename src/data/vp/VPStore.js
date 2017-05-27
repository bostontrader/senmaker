// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import VP             from './VP'
import VPActionTypes  from './VPActionTypes'
import AppDispatcher  from '../AppDispatcher'
import {MakeMapOfVP}  from '../JSONParseUtils'
import {vpExamples}   from '../TestData'
import {validateVP}   from '../Validator'
import AppActionTypes from '../app/AppActionTypes'
import Verbd          from '../dictionary/verbd/Verbd'

import {localStorageAvailable} from '../LocalStorage'
const localStorageKey:string = 'VPStore'

class VPStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = fromJS(JSON.parse(localStorageState))
                let newColl = MakeMapOfVP(originalParse.getIn(['coll']))
                return originalParse.set('coll',newColl)
            }
        }
        return VPStore.initialState

    }

    reduce(state:Object, action:Object):Object {

        function insertNewRecord(vp:Object):Object {
            validateVP(vp)
            const id:number = state.getIn(['nextid'])
            let newState = state.setIn(['nextid'], id + 1)

            return newState.setIn(['coll',id.toString()], VP({
                id: id.toString(),
                verbd: vp.get('verbd'),
                actionTime: vp.get('actionTime'),
                simple: vp.get('simple'),
                perfect: vp.get('perfect'),
                progressive: vp.get('progressive'),
                generatedText: vp.get('generatedText')
            }))
        }

        let newState:Object = state
        
        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = VPStore.initialState
                break

            // Insert a new record or update an existing one, originating from a UI.
            case VPActionTypes.ON_CLICK_SAVE_VP:
                validateVP(action.vp)
                if(action.vp.id) {
                    // An id exists so update the existing record.
                    newState = newState.setIn(['coll', action.vp.id], VP(action.vp))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(action.vp)
                }
                break
            
            case VPActionTypes.ON_CLICK_DELETE_VP:
                newState = newState.deleteIn(['coll',action.id])
                break

            // Insert a new record programmatically, w/o a UI.
            case VPActionTypes.INSERT_VP:
                validateVP(action.vp)
                newState = insertNewRecord(action.vp)
                break

            default:
                // do nothing, newState is already set to the existing state
                
        }
        
        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

VPStore.initialState = Map({
    v:0,
    nextid:1,
    coll:Map()  // the actual collection of vp
})

export default new VPStore()
