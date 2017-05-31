// @flow
import DeterminerdActionTypes from './DeterminerdActionTypes'
import AppDispatcher    from '../../AppDispatcher'
import {validateDeterminerd}  from '../../Validator'

const DeterminerdActions = {

    // add/edit UI
    onClickAddDeterminerd():void {
        AppDispatcher.dispatch({
            type: DeterminerdActionTypes.ON_CLICK_ADD_DETERMINERD
        })
    },
    onClickCancel():void {
        AppDispatcher.dispatch({
            type: DeterminerdActionTypes.ON_CLICK_CANCEL
        })
    },
    onClickDeleteDeterminerd(id:string):void {
        AppDispatcher.dispatch({
            type: DeterminerdActionTypes.ON_CLICK_DELETE_DETERMINERD,
            id
        })
    },
    onClickEditDeterminerd(determinerd:Object):void {
        validateDeterminerd(determinerd)
        AppDispatcher.dispatch({
            type: DeterminerdActionTypes.ON_CLICK_EDIT_DETERMINERD,
            determinerd: determinerd
        })
    },
    // The Save button for an add or edit is clicked.
    // For programmatic insert see DeterminerdActionTypes INSERT_DETERMINERD
    // If determinerd has an id then update an existing determinerd else insert a new one
    onClickSaveDeterminerd(determinerd:Object):void {
        validateDeterminerd(determinerd)
        AppDispatcher.dispatch({
            type: DeterminerdActionTypes.ON_CLICK_SAVE_DETERMINERD,
            determinerd: determinerd
        })
    },
    onChangeBase(base:string):void {
        AppDispatcher.dispatch({
            type: DeterminerdActionTypes.ON_CHANGE_BASE,
            base: base
        })
    },
    // Pump a new determinerd directly into the db w/o dealing with any UI.
    insertDeterminerd(determinerd:Object):void {
        validateDeterminerd(determinerd)
        AppDispatcher.dispatch({
            type: DeterminerdActionTypes.INSERT_DETERMINERD,
            determinerd: determinerd
        })
    }
}

export default DeterminerdActions
