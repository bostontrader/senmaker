import NPAEActionTypes from './NPAEActionTypes'
import AppDispatcher   from '../../AppDispatcher'

const NPAEActions = {
    onClickAddNP() {
        AppDispatcher.dispatch({
            type: NPAEActionTypes.ON_CLICK_ADD_NP
        })
    },
    //onClickCancel() {
        //AppDispatcher.dispatch({
            //type: NPAEActionTypes.ON_CLICK_CANCEL
        //})
    //},
    //onClickDeleteNP(id) {
        //AppDispatcher.dispatch({
            //type: NPAEActionTypes.ON_CLICK_DELETE_NP,
            //id
        //})
    //},
    //onClickEditNP(np) {
        //AppDispatcher.dispatch({
            //type: NPAEActionTypes.ON_CLICK_EDIT_NP,
            //np: np
        //})
    //},
    //onChangeBase(base) {
        //AppDispatcher.dispatch({
            //type: NPAEActionTypes.ON_CHANGE_BASE,
            //base: base
        //})
    //},

    // The Save button for an add or edit is clicked.
    // For programmatic insert see NPActionTypes INSERT_NP
    //onClickSaveNP(np) {
        //AppDispatcher.dispatch({
            //type: NPAEActionTypes.ON_CLICK_SAVE_NP,
            //np: np
        //})
    //}
}

export default NPAEActions
