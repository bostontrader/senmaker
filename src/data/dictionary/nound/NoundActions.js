// @flow
import NoundActionTypes from './NoundActionTypes'
import AppDispatcher    from '../../AppDispatcher'
import {validateNound}  from '../../Validator'

const NoundActions = {

    // add/edit UI
    onClickAddNound():void {
        AppDispatcher.dispatch({
            type: NoundActionTypes.ON_CLICK_ADD_NOUND
        })
    },
    onClickCancel():void {
        AppDispatcher.dispatch({
            type: NoundActionTypes.ON_CLICK_CANCEL
        })
    },
    onClickDeleteNound(id:string):void {
        AppDispatcher.dispatch({
            type: NoundActionTypes.ON_CLICK_DELETE_NOUND,
            id
        })
    },
    onClickEditNound(nound:Object):void {
        validateNound(nound)
        AppDispatcher.dispatch({
            type: NoundActionTypes.ON_CLICK_EDIT_NOUND,
            nound: nound
        })
    },
    // The Save button for an add or edit is clicked.
    // For programmatic insert see NoundActionTypes INSERT_NOUND
    // If nound has an id then update an existing nound else insert a new one
    onClickSaveNound(nound:Object):void {
        validateNound(nound)
        AppDispatcher.dispatch({
            type: NoundActionTypes.ON_CLICK_SAVE_NOUND,
            nound: nound
        })
    },
    onChangeBase(base:string):void {
        AppDispatcher.dispatch({
            type: NoundActionTypes.ON_CHANGE_BASE,
            base: base
        })
    },
    /*onChangeBase(base:string):void {
        AppDispatcher.dispatch({
            type: NoundActionTypes.ON_CHANGE_BASE,
            base: base
        })
    },*/
    onChangePlural(plural:string):void {
        AppDispatcher.dispatch({
            type: NoundActionTypes.ON_CHANGE_PLURAL,
            plural: plural
        })
    },
    // Pump a new nound directly into the db w/o dealing with any UI.
    insertNound(nound:Object):void {
        validateNound(nound)
        AppDispatcher.dispatch({
            type: NoundActionTypes.INSERT_NOUND,
            nound: nound
        })
    }
}

export default NoundActions
