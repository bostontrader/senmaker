import NoundActionTypes from './NoundActionTypes'
import AppDispatcher    from '../../AppDispatcher'

const NoundActions = {

    // add/edit UI
    onClickAddNound() {
        AppDispatcher.dispatch({
            type: NoundActionTypes.ON_CLICK_ADD_NOUND
        })
    },
    onClickCancel() {
        AppDispatcher.dispatch({
            type: NoundActionTypes.ON_CLICK_CANCEL
        })
    },
    onClickDeleteNound(id) {
        AppDispatcher.dispatch({
            type: NoundActionTypes.ON_CLICK_DELETE_NOUND,
            id
        })
    },
    onClickEditNound(nound) {
        AppDispatcher.dispatch({
            type: NoundActionTypes.ON_CLICK_EDIT_NOUND,
            nound: nound
        })
    },
    // The Save button for an add or edit is clicked.
    // For programmatic insert see NoundActionTypes INSERT_NOUND
    onClickSaveNound(nound) {
        AppDispatcher.dispatch({
            type: NoundActionTypes.ON_CLICK_SAVE_NOUND,
            nound: nound
        })
    },
    onChangeBase(base) {
        AppDispatcher.dispatch({
            type: NoundActionTypes.ON_CHANGE_BASE,
            base: base
        })
    },

    // Pump a new nound directly into the db w/o dealing with any UI.
    insertNound(nound) {
        AppDispatcher.dispatch({
            type: NoundActionTypes.INSERT_NOUND,
            nound: nound
        })
    }
}

export default NoundActions
