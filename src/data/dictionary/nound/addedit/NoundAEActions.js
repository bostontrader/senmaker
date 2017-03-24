import NoundAEActionTypes from './NoundAEActionTypes'
import AppDispatcher from '../../../AppDispatcher'

const NoundAEActions = {
    clickAddNound() {
        AppDispatcher.dispatch({
            type: NoundAEActionTypes.CLICK_ADD_NOUND
        })
    },
    clickDeleteNoun(id) {
        AppDispatcher.dispatch({
            type: NoundAEActionTypes.CLICK_DELETE_NOUND,
            id
        })
    },
    clickEditNound(nound) {
        AppDispatcher.dispatch({
            type: NoundAEActionTypes.CLICK_EDIT_NOUND,
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
    clickSaveNound(nound) {
        AppDispatcher.dispatch({
            type: NoundAEActionTypes.CLICK_SAVE_NOUND,
            nound: nound
        })
    },

    //cancel() {
        //AppDispatcher.dispatch({
            //type: NoundAEActionTypes.CANCEL
        //})
    //},
}

export default NoundAEActions
