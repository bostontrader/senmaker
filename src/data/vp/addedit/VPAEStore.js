// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import VP              from '../VP'
import VPActionTypes   from '../VPActionTypes'
import AppDispatcher   from '../../AppDispatcher'
import {MakeVP}        from '../../JSONParseUtils'
import {validateVerbd} from '../../Validator'
import {validateVP}    from '../../Validator'
import AppActionTypes  from '../../app/AppActionTypes'
import Verbd           from '../../dictionary/verbd/Verbd'
import {ActionTime}    from '../../dictionary/verbd/VerbdConstants'

import {localStorageAvailable} from '../../../LocalStorage'
const localStorageKey = 'VPAEStore'

/*
 This store manages all state required to support the add/edit operations on a vp.
 This obviously includes the present state of whatever vp is being added or created.
 If said vp has an id, then this is an edit, otherwise we're creating a new vp.

 We can use this information to manage the display of a suitable add/edit component.
 If the vp has an id then we are editing a vp and we thus want to display the VPEditForm component.
 If the clickAddVP flag = true, then we are adding a new vp and we want to display the VPAddForm component.
 Else display nothing.

 We use the clickAddVP flag for purposes of code clarity.

 */
class VPAEStore extends ReduceStore {
    constructor() {
        super(AppDispatcher)
    }

    getInitialState():Object {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = fromJS(JSON.parse(localStorageState))
                let newVP = MakeVP(originalParse.getIn(['vp']))
                return originalParse.set('vp',newVP)
            }

        }
        return VPAEStore.initialState

    }

    reduce(state:Object, action:Object):Object {

        let newState:Object = state

        const calcResultText = (actionTime:string, verbd:Object):string => {
            validateVerbd(verbd)

            let generatedText:string = verbd.get('base')

            switch(parseInt(actionTime)) {
                case ActionTime.Past:
                    generatedText = verbd.get('pastForm')
                    break
                case ActionTime.Present:
                    generatedText = verbd.get('base') + 's'
                    break
                case ActionTime.Future:
                    generatedText = 'will ' + verbd.get('base')
                    break
                default:
                    // do nothing
            }

            return generatedText
        }

        let presentActionTime:number
        let presentVerbd:Object
        let generatedText:string

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_APP_RESET:
                newState = VPAEStore.initialState
                break

            // Signal the UI to open the VPAddForm
            case VPActionTypes.ON_CLICK_ADD_VP:
                newState = newState.set('addVP', true)
                break

            // Signal the UI to close VPAddForm or VPEditForm
            case VPActionTypes.ON_CLICK_CANCEL:
                newState = VPAEStore.initialState
                break

            // Signal the UI to close VPAddForm or VPEditForm (but the delete button
            // is only present on NounEditForm.)
            // VPStore will also catch this event and it's responsible for the actual deletion.
            case VPActionTypes.ON_CLICK_DELETE_VP:
                newState = VPAEStore.initialState
                break

            // Signal the UI to open VPEditForm and populate with the given data.
            case VPActionTypes.ON_CLICK_EDIT_VP:
                validateVP(action.vp)
                newState = newState.set('vp', VP({
                    id: action.vp.id,
                    verbd: action.vp.verbd,
                    actionTime: action.vp.actionTime,
                    generatedText: action.vp.generatedText
                }))
                break

            // Signal the UI to close VPAddForm or VPEditForm. We don't need to specify which,
            // the same state should close either one.
            case VPActionTypes.ON_CLICK_SAVE_VP:
                newState = VPAEStore.initialState
                break

            case VPActionTypes.ON_CHANGE_ACTION_TIME:
                presentActionTime = action.newActionTime
                presentVerbd = state.getIn(['vp','verbd'])
                generatedText = calcResultText(presentActionTime, presentVerbd)
                newState = newState.updateIn(['vp','actionTime'],value => action.newActionTime)
                newState = newState.updateIn(['vp','generatedText'], value => generatedText)
                break

            // Should be VERBD because that's what's being changed!
            case VPActionTypes.ON_CHANGE_SELECTED_VERBD:
                validateVerbd(action.newVerbd)
                presentActionTime = state.getIn(['vp','actionTime'])
                presentVerbd = action.newVerbd
                generatedText = calcResultText(presentActionTime, presentVerbd)
                newState = newState.updateIn(['vp','verbd'],value => presentVerbd)
                newState = newState.updateIn(['vp','generatedText'], value => generatedText)
                break

            default:
                // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

VPAEStore.initialState =  Map({
    addVP: false,
    vp: new VP()
})

export default new VPAEStore()
