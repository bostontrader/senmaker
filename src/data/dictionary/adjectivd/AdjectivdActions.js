import AdjectivdActionTypes from './AdjectivdActionTypes'
import AppDispatcher        from '../../AppDispatcher'

const AdjectivdActions = {

    // add/edit UI
    onClickAddAdjectivd() {
        AppDispatcher.dispatch({
            type: AdjectivdActionTypes.ON_CLICK_ADD_ADJECTIVD
        })
    },
    onClickCancel() {
        AppDispatcher.dispatch({
            type: AdjectivdActionTypes.ON_CLICK_CANCEL
        })
    },
    onClickDeleteAdjectiv(id) {
        AppDispatcher.dispatch({
            type: AdjectivdActionTypes.ON_CLICK_DELETE_ADJECTIVD,
            id
        })
    },
    onClickEditAdjectivd(adjectivd) {
        AppDispatcher.dispatch({
            type: AdjectivdActionTypes.ON_CLICK_EDIT_ADJECTIVD,
            adjectivd: adjectivd
        })
    },
    // The Save button for an add or edit is clicked.
    // For programmatic insert see AdjectivdActionTypes INSERT_ADJECTIVD
    onClickSaveAdjectivd(adjectivd) {
        AppDispatcher.dispatch({
            type: AdjectivdActionTypes.ON_CLICK_SAVE_ADJECTIVD,
            adjectivd: adjectivd
        })
    },
    onChangeBase(base) {
        AppDispatcher.dispatch({
            type: AdjectivdActionTypes.ON_CHANGE_BASE,
            base: base
        })
    },

    // Pump a new adjectivd directly into the db w/o dealing with any UI.
    insertAdjectivd(adjectivd) {
        AppDispatcher.dispatch({
            type: AdjectivdActionTypes.INSERT_ADJECTIVD,
            adjectivd: adjectivd
        })
    }
}

export default AdjectivdActions
