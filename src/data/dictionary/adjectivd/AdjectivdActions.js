// @flow
import AdjectivdActionTypes from './AdjectivdActionTypes'
import AppDispatcher    from '../../AppDispatcher'
import {validateAdjectivd}  from '../../Validator'

const AdjectivdActions = {

    // add/edit UI
    onClickAddAdjectivd():void {
        AppDispatcher.dispatch({
            type: AdjectivdActionTypes.ON_CLICK_ADD_ADJECTIVD
        })
    },
    onClickCancel():void {
        AppDispatcher.dispatch({
            type: AdjectivdActionTypes.ON_CLICK_CANCEL
        })
    },
    onClickDeleteAdjectivd(id:string):void {
        AppDispatcher.dispatch({
            type: AdjectivdActionTypes.ON_CLICK_DELETE_ADJECTIVD,
            id
        })
    },
    onClickEditAdjectivd(adjectivd:Object):void {
        validateAdjectivd(adjectivd)
        AppDispatcher.dispatch({
            type: AdjectivdActionTypes.ON_CLICK_EDIT_ADJECTIVD,
            adjectivd: adjectivd
        })
    },
    // The Save button for an add or edit is clicked.
    // For programmatic insert see AdjectivdActionTypes INSERT_ADJECTIVD
    // If adjectivd has an id then update an existing adjectivd else insert a new one
    onClickSaveAdjectivd(adjectivd:Object):void {
        validateAdjectivd(adjectivd)
        AppDispatcher.dispatch({
            type: AdjectivdActionTypes.ON_CLICK_SAVE_ADJECTIVD,
            adjectivd: adjectivd
        })
    },
    onChangeBase(base:string):void {
        AppDispatcher.dispatch({
            type: AdjectivdActionTypes.ON_CHANGE_BASE,
            base: base
        })
    },

    // Pump a new adjectivd directly into the db w/o dealing with any UI.
    insertAdjectivd(adjectivd:Object):void {
        validateAdjectivd(adjectivd)
        AppDispatcher.dispatch({
            type: AdjectivdActionTypes.INSERT_ADJECTIVD,
            adjectivd: adjectivd
        })
    }
}

export default AdjectivdActions
