import NouniAEActionTypes from './NouniAEActionTypes'
import AppDispatcher from '../../AppDispatcher'

const NouniAEActions = {

    onClickAddNouni() {
        AppDispatcher.dispatch({
            type: NouniAEActionTypes.ON_CLICK_ADD_NOUNI
        })
    },
    onClickCancel() {
        AppDispatcher.dispatch({
            type: NouniAEActionTypes.ON_CLICK_CANCEL
        })
    },
    onClickDeleteNouni(id) {
        console.log('NouniAEActions',id)
        AppDispatcher.dispatch({
            type: NouniAEActionTypes.ON_CLICK_DELETE_NOUNI,
            id
        })
    },
    onClickEditNouni(nouni) {
        AppDispatcher.dispatch({
            type: NouniAEActionTypes.ON_CLICK_EDIT_NOUNI,
            nouni: nouni
        })
    },
    //onChangeBase(base) {
        //AppDispatcher.dispatch({
            //type: NouniAEActionTypes.ON_CHANGE_BASE,
            //base: base
        //})
    //},

    // The Save button for an add or edit is clicked.
    // For programmatic insert see NouniActionTypes INSERT_NOUNI
    onClickSaveNouni(nouni) {
        AppDispatcher.dispatch({
            type: NouniAEActionTypes.ON_CLICK_SAVE_NOUNI,
            nouni: nouni
        })
    },
    
    
    onChangeDefiniteness(newDefiniteness) {
        AppDispatcher.dispatch({
            type: NouniAEActionTypes.ON_CHANGE_DEFINITENESS,
            newDefiniteness: newDefiniteness
        })
    }

}

export default NouniAEActions
