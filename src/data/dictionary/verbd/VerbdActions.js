import VerbdActionTypes from './VerbdActionTypes'
import AppDispatcher    from '../../AppDispatcher'

const VerbdActions = {

    // add/edit UI
    onClickAddVerbd() {
        AppDispatcher.dispatch({
            type: VerbdActionTypes.ON_CLICK_ADD_VERBD
        })
    },
    onClickCancel() {
        AppDispatcher.dispatch({
            type: VerbdActionTypes.ON_CLICK_CANCEL
        })
    },
    onClickDeleteVerbd(id) {
        AppDispatcher.dispatch({
            type: VerbdActionTypes.ON_CLICK_DELETE_VERBD,
            id
        })
    },
    onClickEditVerbd(verbd) {
        AppDispatcher.dispatch({
            type: VerbdActionTypes.ON_CLICK_EDIT_VERBD,
            verbd: verbd
        })
    },
    // The Save button for an add or edit is clicked.
    // For programmatic insert see VerbdActionTypes INSERT_VERBD
    onClickSaveVerbd(verbd) {
        AppDispatcher.dispatch({
            type: VerbdActionTypes.ON_CLICK_SAVE_VERBD,
            verbd: verbd
        })
    },
    onChangeBase(base) {
        AppDispatcher.dispatch({
            type: VerbdActionTypes.ON_CHANGE_BASE,
            base: base
        })
    },

    // Pump a new verbd directly into the db w/o dealing with any UI.
    insertVerbd(verbd) {
        AppDispatcher.dispatch({
            type: VerbdActionTypes.INSERT_VERBD,
            verbd: verbd
        })
    },

    // Special for VerbdSelect
    //onChangeSelectedVerbd(verbd) {
        //AppDispatcher.dispatch({
            //type: VerbdActionTypes.ON_CHANGE_SELECTED_VERBD,
            //verbd: verbd
        //})
    //}
}

export default VerbdActions
