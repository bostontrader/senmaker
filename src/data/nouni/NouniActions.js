import NouniActionTypes from './NouniActionTypes'
import AppDispatcher from '../AppDispatcher'

const NouniActions = {
    
    // add/edit UI
    onClickAddNouni() {
        AppDispatcher.dispatch({
            type: NouniActionTypes.ON_CLICK_ADD_NOUNI
        })
    },
    onClickCancel() {
        AppDispatcher.dispatch({
            type: NouniActionTypes.ON_CLICK_CANCEL
        })
    },
    onClickDeleteNouni(id) {
        AppDispatcher.dispatch({
            type: NouniActionTypes.ON_CLICK_DELETE_NOUNI,
            id
        })
    },
    onClickEditNouni(nouni) {
        AppDispatcher.dispatch({
            type: NouniActionTypes.ON_CLICK_EDIT_NOUNI,
            nouni: nouni
        })
    },
    // The Save button for an add or edit is clicked.
    // For programmatic insert see NouniActionTypes INSERT_NOUNI
    onClickSaveNouni(nouni) {
        AppDispatcher.dispatch({
            type: NouniActionTypes.ON_CLICK_SAVE_NOUNI,
            nouni: nouni
        })
    },
    //onChangeBase(base) {
    //AppDispatcher.dispatch({
    //type: NouniActionTypes.ON_CHANGE_BASE,
    //base: base
    //})
    //},
    onChangeDefiniteness(newDefiniteness) {
        AppDispatcher.dispatch({
            type: NouniActionTypes.ON_CHANGE_DEFINITENESS,
            newDefiniteness: newDefiniteness
        })
    },
    onChangeSelectedNound(newNound) {
        console.log('NouniActions.changeSelectedNoun =', newNound)

        AppDispatcher.dispatch({
            type: NouniActionTypes.ON_CHANGE_SELECTED_NOUND,
            newNound: newNound
        })
    },

    // Pump a new nouni directly into the db w/o dealing with any UI.
    insertNouni(nouni) {
        AppDispatcher.dispatch({
            type: NouniActionTypes.INSERT_NOUNI,
            nouni: nouni
        })
    },
}

export default NouniActions
