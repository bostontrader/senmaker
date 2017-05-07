// @flow
import VerbdActionTypes from './VerbdActionTypes'
import AppDispatcher    from '../../AppDispatcher'
import {validateVerbd}  from '../../Validator'

const VerbdActions = {

    // add/edit UI
    onClickAddVerbd():void {
        AppDispatcher.dispatch({
            type: VerbdActionTypes.ON_CLICK_ADD_VERBD
        })
    },
    onClickCancel():void {
        AppDispatcher.dispatch({
            type: VerbdActionTypes.ON_CLICK_CANCEL
        })
    },
    onClickDeleteVerbd(id:string):void {
        AppDispatcher.dispatch({
            type: VerbdActionTypes.ON_CLICK_DELETE_VERBD,
            id
        })
    },
    onClickEditVerbd(verbd:Object):void {
        validateVerbd(verbd)
        AppDispatcher.dispatch({
            type: VerbdActionTypes.ON_CLICK_EDIT_VERBD,
            verbd: verbd
        })
    },
    // The Save button for an add or edit is clicked.
    // For programmatic insert see VerbdActionTypes INSERT_VERBD
    // If verbd has an id then update an existing verbd else insert a new one
    onClickSaveVerbd(verbd:Object):void {
        validateVerbd(verbd)
        AppDispatcher.dispatch({
            type: VerbdActionTypes.ON_CLICK_SAVE_VERBD,
            verbd: verbd
        })
    },
    onChangeBase(base:string):void {
        AppDispatcher.dispatch({
            type: VerbdActionTypes.ON_CHANGE_BASE,
            base: base
        })
    },
    onChangePastForm(pastForm:string):void {
        AppDispatcher.dispatch({
            type: VerbdActionTypes.ON_CHANGE_PAST_FORM,
            pastForm: pastForm
        })
    },
    // Pump a new verbd directly into the db w/o dealing with any UI.
    insertVerbd(verbd:Object):void {
        validateVerbd(verbd)
        AppDispatcher.dispatch({
            type: VerbdActionTypes.INSERT_VERBD,
            verbd: verbd
        })
    }
}

export default VerbdActions
