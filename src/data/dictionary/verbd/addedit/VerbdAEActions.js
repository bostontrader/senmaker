import VerbdAEActionTypes from './VerbdAEActionTypes'
import AppDispatcher from '../../../AppDispatcher'

const VerbdAEActions = {
    onClickAddVerbd() {
        AppDispatcher.dispatch({
            type: VerbdAEActionTypes.ON_CLICK_ADD_VERBD
        })
    },
    onClickCancel() {
        AppDispatcher.dispatch({
            type: VerbdAEActionTypes.ON_CLICK_CANCEL
        })
    },
    onClickDeleteVerbd(id) {
        AppDispatcher.dispatch({
            type: VerbdAEActionTypes.ON_CLICK_DELETE_VERBD,
            id
        })
    },
    onClickEditVerbd(verbd) {
        AppDispatcher.dispatch({
            type: VerbdAEActionTypes.ON_CLICK_EDIT_VERBD,
            verbd: verbd
        })
    },
    onChangeBase(base) {
        AppDispatcher.dispatch({
            type: VerbdAEActionTypes.ON_CHANGE_BASE,
            base: base
        })
    },

    // The Save button for an add or edit is clicked.
    // For programmatic insert see VerbdActionTypes INSERT_VERBD
    onClickSaveVerbd(verbd) {
        AppDispatcher.dispatch({
            type: VerbdAEActionTypes.ON_CLICK_SAVE_VERBD,
            verbd: verbd
        })
    },
}

export default VerbdAEActions
