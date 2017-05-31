// @flow
import PronoundActionTypes from './PronoundActionTypes'
import AppDispatcher    from '../../AppDispatcher'
import {validatePronound}  from '../../Validator'

const PronoundActions = {

    // add/edit UI
    onClickAddPronound():void {
        AppDispatcher.dispatch({
            type: PronoundActionTypes.ON_CLICK_ADD_PRONOUND
        })
    },
    onClickCancel():void {
        AppDispatcher.dispatch({
            type: PronoundActionTypes.ON_CLICK_CANCEL
        })
    },
    onClickDeletePronound(id:string):void {
        AppDispatcher.dispatch({
            type: PronoundActionTypes.ON_CLICK_DELETE_PRONOUND,
            id
        })
    },
    onClickEditPronound(pronound:Object):void {
        validatePronound(pronound)
        AppDispatcher.dispatch({
            type: PronoundActionTypes.ON_CLICK_EDIT_PRONOUND,
            pronound: pronound
        })
    },
    // The Save button for an add or edit is clicked.
    // For programmatic insert see PronoundActionTypes INSERT_PRONOUND
    // If pronound has an id then update an existing pronound else insert a new one
    onClickSavePronound(pronound:Object):void {
        validatePronound(pronound)
        AppDispatcher.dispatch({
            type: PronoundActionTypes.ON_CLICK_SAVE_PRONOUND,
            pronound: pronound
        })
    },
    onChangeBase(base:string):void {
        AppDispatcher.dispatch({
            type: PronoundActionTypes.ON_CHANGE_BASE,
            base: base
        })
    },

    // Pump a new pronound directly into the db w/o dealing with any UI.
    insertPronound(pronound:Object):void {
        validatePronound(pronound)
        AppDispatcher.dispatch({
            type: PronoundActionTypes.INSERT_PRONOUND,
            pronound: pronound
        })
    }
}

export default PronoundActions
