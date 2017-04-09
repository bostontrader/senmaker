import NoundAEActionTypes from './NoundAEActionTypes'
import AppDispatcher      from '../../../AppDispatcher'

const NoundAEActions = {
    onClickAddNound() {
        AppDispatcher.dispatch({
            type: NoundAEActionTypes.ON_CLICK_ADD_NOUND
        })
    },
    onClickCancel() {
        AppDispatcher.dispatch({
            type: NoundAEActionTypes.ON_CLICK_CANCEL
        })
    },
    onClickDeleteNound(id) {
        AppDispatcher.dispatch({
            type: NoundAEActionTypes.ON_CLICK_DELETE_NOUND,
            id
        })
    },
    onClickEditNound(nound) {
        AppDispatcher.dispatch({
            type: NoundAEActionTypes.ON_CLICK_EDIT_NOUND,
            nound: nound
        })
    },
    onChangeBase(base) {
        AppDispatcher.dispatch({
            type: NoundAEActionTypes.ON_CHANGE_BASE,
            base: base
        })
    },

    // The Save button for an add or edit is clicked.
    // For programmatic insert see NoundActionTypes INSERT_NOUND
    onClickSaveNound(nound) {
        AppDispatcher.dispatch({
            type: NoundAEActionTypes.ON_CLICK_SAVE_NOUND,
            nound: nound
        })
    }
}

export default NoundAEActions
