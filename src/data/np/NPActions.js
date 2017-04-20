// @flow
import NPActionTypes from './NPActionTypes'
import AppDispatcher from '../AppDispatcher'

const NPActions = {
    
    // add/edit UI
    onClickAddNP() {
        AppDispatcher.dispatch({
            type: NPActionTypes.ON_CLICK_ADD_NP
        })
    },
    onClickCancel() {
        AppDispatcher.dispatch({
            type: NPActionTypes.ON_CLICK_CANCEL
        })
    },
    onClickDeleteNP(id:string) {
        AppDispatcher.dispatch({
            type: NPActionTypes.ON_CLICK_DELETE_NP,
            id
        })
    },
    onClickEditNP(np:string) {
        AppDispatcher.dispatch({
            type: NPActionTypes.ON_CLICK_EDIT_NP,
            np: np
        })
    },
    // The Save button for an add or edit is clicked.
    // For programmatic insert see NPActionTypes INSERT_NP
    // If np has an id then update an existing NP else insert a new one
    onClickSaveNP(np:NP) {
        AppDispatcher.dispatch({
            type: NPActionTypes.ON_CLICK_SAVE_NP, // string
            np: np // NP
        })
    },
    onChangeDefiniteness(newDefiniteness:string) {
        AppDispatcher.dispatch({
            type: NPActionTypes.ON_CHANGE_DEFINITENESS,
            newDefiniteness: newDefiniteness
        })
    },
    onChangeSelectedNound(newNound:Nound) {
        console.log('NPActions.changeSelectedNound =', newNound)

        AppDispatcher.dispatch({
            type: NPActionTypes.ON_CHANGE_SELECTED_NOUND,
            newNound: newNound
        })
    },

    // Pump a new np directly into the db w/o dealing with any UI.
    insertNP(np:string) {
        AppDispatcher.dispatch({
            type: NPActionTypes.INSERT_NP,
            np: np
        })
    }
}

export default NPActions
