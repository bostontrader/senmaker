import AdjectivdAEActionTypes from './AdjectivdAEActionTypes'
import AppDispatcher          from '../../../AppDispatcher'

const AdjectivdAEActions = {
    onClickAddAdjectivd() {
        AppDispatcher.dispatch({
            type: AdjectivdAEActionTypes.ON_CLICK_ADD_ADJECTIVD
        })
    },
    onClickCancel() {
        AppDispatcher.dispatch({
            type: AdjectivdAEActionTypes.ON_CLICK_CANCEL
        })
    },
    onClickDeleteAdjectiv(id) {
        AppDispatcher.dispatch({
            type: AdjectivdAEActionTypes.ON_CLICK_DELETE_ADJECTIVD,
            id
        })
    },
    onClickEditAdjectivd(adjectivd) {
        AppDispatcher.dispatch({
            type: AdjectivdAEActionTypes.ON_CLICK_EDIT_ADJECTIVD,
            adjectivd: adjectivd
        })
    },
    onChangeBase(base) {
        AppDispatcher.dispatch({
            type: AdjectivdAEActionTypes.ON_CHANGE_BASE,
            base: base
        })
    },

    // The Save button for an add or edit is clicked.
    // For programmatic insert see AdjectivdActionTypes INSERT_ADJECTIVD
    onClickSaveAdjectivd(adjectivd) {
        AppDispatcher.dispatch({
            type: AdjectivdAEActionTypes.ON_CLICK_SAVE_ADJECTIVD,
            adjectivd: adjectivd
        })
    }
}

export default AdjectivdAEActions
