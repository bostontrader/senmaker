// @flow
import VPActionTypes   from './VPActionTypes'
import AppDispatcher   from '../AppDispatcher'
import {validateVerbd} from '../Validator'
import {validateVP}    from '../Validator'

const VPActions = {

    // add/edit UI
    onClickAddVP():void {
        AppDispatcher.dispatch({
            type: VPActionTypes.ON_CLICK_ADD_VP
        })
    },
    onClickCancel():void {
        AppDispatcher.dispatch({
            type: VPActionTypes.ON_CLICK_CANCEL
        })
    },
    onClickDeleteVP(id:string):void {
        AppDispatcher.dispatch({
            type: VPActionTypes.ON_CLICK_DELETE_VP,
            id
        })
    },
    onClickEditVP(vp:Object):void {
        validateVP(vp)
        AppDispatcher.dispatch({
            type: VPActionTypes.ON_CLICK_EDIT_VP,
            vp: vp
        })
    },
    // The Save button for an add or edit is clicked.
    // For programmatic insert see VPActionTypes INSERT_VP
    // If vp has an id then update an existing VP else insert a new one
    onClickSaveVP(vp:Object):void {
        validateVP(vp)
        AppDispatcher.dispatch({
            type: VPActionTypes.ON_CLICK_SAVE_VP, // string
            vp: vp // VP
        })
    },
    onChangeActionTime(newActionTime:number):void {
        AppDispatcher.dispatch({
            type: VPActionTypes.ON_CHANGE_ACTION_TIME,
            newActionTime: newActionTime
        })
    },
    onChangeSelectedVerbd(newVerbd:Object):void {
        validateVerbd(newVerbd)
        AppDispatcher.dispatch({
            type: VPActionTypes.ON_CHANGE_SELECTED_VERBD,
            newVerbd: newVerbd
        })
    },

    // Pump a new vp directly into the db w/o dealing with any UI.
    insertVP(vp:Object):void {
        validateVP(vp)
        AppDispatcher.dispatch({
            type: VPActionTypes.INSERT_VP,
            vp: vp
        })
    }
}

export default VPActions
