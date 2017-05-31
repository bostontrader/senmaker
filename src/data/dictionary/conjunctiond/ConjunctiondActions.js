// @flow
import ConjunctiondActionTypes from './ConjunctiondActionTypes'
import AppDispatcher           from '../../AppDispatcher'
import {validateConjunctiond}  from '../../Validator'

const ConjunctiondActions = {

    // add/edit UI
    onClickAddConjunctiond():void {
        AppDispatcher.dispatch({
            type: ConjunctiondActionTypes.ON_CLICK_ADD_CONJUNCTIOND
        })
    },
    onClickCancel():void {
        AppDispatcher.dispatch({
            type: ConjunctiondActionTypes.ON_CLICK_CANCEL
        })
    },
    onClickDeleteConjunctiond(id:string):void {
        AppDispatcher.dispatch({
            type: ConjunctiondActionTypes.ON_CLICK_DELETE_CONJUNCTIOND,
            id
        })
    },
    onClickEditConjunctiond(conjunctiond:Object):void {
        validateConjunctiond(conjunctiond)
        AppDispatcher.dispatch({
            type: ConjunctiondActionTypes.ON_CLICK_EDIT_CONJUNCTIOND,
            conjunctiond: conjunctiond
        })
    },
    // The Save button for an add or edit is clicked.
    // For programmatic insert see ConjunctiondActionTypes INSERT_CONJUNCTIOND
    // If conjunctiond has an id then update an existing conjunctiond else insert a new one
    onClickSaveConjunctiond(conjunctiond:Object):void {
        validateConjunctiond(conjunctiond)
        AppDispatcher.dispatch({
            type: ConjunctiondActionTypes.ON_CLICK_SAVE_CONJUNCTIOND,
            conjunctiond: conjunctiond
        })
    },
    onChangeBase(base:string):void {
        AppDispatcher.dispatch({
            type: ConjunctiondActionTypes.ON_CHANGE_BASE,
            base: base
        })
    },
    // Pump a new conjunctiond directly into the db w/o dealing with any UI.
    insertConjunctiond(conjunctiond:Object):void {
        validateConjunctiond(conjunctiond)
        AppDispatcher.dispatch({
            type: ConjunctiondActionTypes.INSERT_CONJUNCTIOND,
            conjunctiond: conjunctiond
        })
    }
}

export default ConjunctiondActions
