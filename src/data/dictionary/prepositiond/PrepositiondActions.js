// @flow
import PrepositiondActionTypes from './PrepositiondActionTypes'
import AppDispatcher           from '../../AppDispatcher'
import {validatePrepositiond}  from '../../Validator'

const PrepositiondActions = {

    // add/edit UI
    onClickAddPrepositiond():void {
        AppDispatcher.dispatch({
            type: PrepositiondActionTypes.ON_CLICK_ADD_PREPOSITIOND
        })
    },
    onClickCancel():void {
        AppDispatcher.dispatch({
            type: PrepositiondActionTypes.ON_CLICK_CANCEL
        })
    },
    onClickDeletePrepositiond(id:string):void {
        AppDispatcher.dispatch({
            type: PrepositiondActionTypes.ON_CLICK_DELETE_PREPOSITIOND,
            id
        })
    },
    onClickEditPrepositiond(prepositiond:Object):void {
        validatePrepositiond(prepositiond)
        AppDispatcher.dispatch({
            type: PrepositiondActionTypes.ON_CLICK_EDIT_PREPOSITIOND,
            prepositiond: prepositiond
        })
    },
    // The Save button for an add or edit is clicked.
    // For programmatic insert see PrepositiondActionTypes INSERT_PREPOSITIOND
    // If prepositiond has an id then update an existing prepositiond else insert a new one
    onClickSavePrepositiond(prepositiond:Object):void {
        validatePrepositiond(prepositiond)
        AppDispatcher.dispatch({
            type: PrepositiondActionTypes.ON_CLICK_SAVE_PREPOSITIOND,
            prepositiond: prepositiond
        })
    },
    onChangeBase(base:string):void {
        AppDispatcher.dispatch({
            type: PrepositiondActionTypes.ON_CHANGE_BASE,
            base: base
        })
    },

    // Pump a new prepositiond directly into the db w/o dealing with any UI.
    insertPrepositiond(prepositiond:Object):void {
        validatePrepositiond(prepositiond)
        AppDispatcher.dispatch({
            type: PrepositiondActionTypes.INSERT_PREPOSITIOND,
            prepositiond: prepositiond
        })
    }
}

export default PrepositiondActions
