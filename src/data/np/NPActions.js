// @flow
import NPActionTypes   from './NPActionTypes'
import AppDispatcher   from '../AppDispatcher'
import {validateNound} from '../Validator'
import {validateNP}    from '../Validator'

const NPActions = {
    
    // add/edit UI
    onClickAddNP():void {
        AppDispatcher.dispatch({
            type: NPActionTypes.ON_CLICK_ADD_NP
        })
    },
    onClickCancel():void {
        AppDispatcher.dispatch({
            type: NPActionTypes.ON_CLICK_CANCEL
        })
    },
    onClickDeleteNP(id:string):void {
        AppDispatcher.dispatch({
            type: NPActionTypes.ON_CLICK_DELETE_NP,
            id
        })
    },
    onClickEditNP(np:Object):void {
        validateNP(np)
        AppDispatcher.dispatch({
            type: NPActionTypes.ON_CLICK_EDIT_NP,
            np: np
        })
    },
    // The Save button for an add or edit is clicked.
    // For programmatic insert see NPActionTypes INSERT_NP
    // If np has an id then update an existing NP else insert a new one
    onClickSaveNP(np:Object):void {
        validateNP(np)
        AppDispatcher.dispatch({
            type: NPActionTypes.ON_CLICK_SAVE_NP, // string
            np: np // NP
        })
    },
    onChangeDefiniteness(newDefiniteness:number):void {
        AppDispatcher.dispatch({
            type: NPActionTypes.ON_CHANGE_DEFINITENESS,
            newDefiniteness: newDefiniteness
        })
    },
    onChangeSelectedNound(newNound:Object):void {
        validateNound(newNound)
        AppDispatcher.dispatch({
            type: NPActionTypes.ON_CHANGE_SELECTED_NOUND,
            newNound: newNound
        })
    },

    // Pump a new np directly into the db w/o dealing with any UI.
    insertNP(np:Object):void {
        validateNP(np)
        AppDispatcher.dispatch({
            type: NPActionTypes.INSERT_NP,
            np: np
        })
    }
}

export default NPActions
