import VerbdAEActionTypes from './VerbdAEActionTypes'
import AppDispatcher from '../../../AppDispatcher'

const VerbdAEActions = {
    clickAddVerbd() {
        AppDispatcher.dispatch({
            type: VerbdAEActionTypes.CLICK_ADD_VERBD
        })
    },
    clickCancel() {
        AppDispatcher.dispatch({
            type: VerbdAEActionTypes.CLICK_CANCEL
        })
    },
    clickDeleteVerbd(id) {
        AppDispatcher.dispatch({
            type: VerbdAEActionTypes.CLICK_DELETE_VERBD,
            id
        })
    },
    clickEditVerbd(verbd) {
        AppDispatcher.dispatch({
            type: VerbdAEActionTypes.CLICK_EDIT_VERBD,
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
    clickSaveVerbd(verbd) {
        AppDispatcher.dispatch({
            type: VerbdAEActionTypes.CLICK_SAVE_VERBD,
            verbd: verbd
        })
    },
}

export default VerbdAEActions