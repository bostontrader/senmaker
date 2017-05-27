// @flow
import AdverbdActionTypes from './AdverbdActionTypes'
import AppDispatcher      from '../../AppDispatcher'
import {validateAdverbd}  from '../../Validator'

const AdverbdActions = {

    // add/edit UI
    onClickAddAdverbd():void {
        AppDispatcher.dispatch({
            type: AdverbdActionTypes.ON_CLICK_ADD_ADVERBD
        })
    },
    onClickCancel():void {
        AppDispatcher.dispatch({
            type: AdverbdActionTypes.ON_CLICK_CANCEL
        })
    },
    onClickDeleteAdverbd(id:string):void {
        AppDispatcher.dispatch({
            type: AdverbdActionTypes.ON_CLICK_DELETE_ADVERBD,
            id
        })
    },
    onClickEditAdverbd(adverbd:Object):void {
        validateAdverbd(adverbd)
        AppDispatcher.dispatch({
            type: AdverbdActionTypes.ON_CLICK_EDIT_ADVERBD,
            adverbd: adverbd
        })
    },
    // The Save button for an add or edit is clicked.
    // For programmatic insert see AdverbdActionTypes INSERT_ADVERBD
    // If adverbd has an id then update an existing adverbd else insert a new one
    onClickSaveAdverbd(adverbd:Object):void {
        validateAdverbd(adverbd)
        AppDispatcher.dispatch({
            type: AdverbdActionTypes.ON_CLICK_SAVE_ADVERBD,
            adverbd: adverbd
        })
    },
    onChangeBase(base:string):void {
        AppDispatcher.dispatch({
            type: AdverbdActionTypes.ON_CHANGE_BASE,
            base: base
        })
    },

    // Pump a new adverbd directly into the db w/o dealing with any UI.
    insertAdverbd(adverbd:Object):void {
        validateAdverbd(adverbd)
        AppDispatcher.dispatch({
            type: AdverbdActionTypes.INSERT_ADVERBD,
            adverbd: adverbd
        })
    }
}

export default AdverbdActions
