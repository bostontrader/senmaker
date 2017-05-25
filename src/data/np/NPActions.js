// @flow
import NPActionTypes       from './NPActionTypes'
import {NPPanelLevel}      from './NPConstants'
import AppDispatcher       from '../AppDispatcher'
import {validateAdjectivd} from '../Validator'
import {validateNound}     from '../Validator'
import {validateNP}        from '../Validator'

const NPActions = {
    
    // add/edit UI
    onClickAddNP():void {
        AppDispatcher.dispatch({
            type: NPActionTypes.ON_CLICK_ADD_NP
        })
    },
    onClickCancel():void {
        AppDispatcher.dispatch({
            type: NPActionTypes.ON_CLICK_CANCEL
        })
    },
    onClickDeleteNP(id:string):void {
        AppDispatcher.dispatch({
            type: NPActionTypes.ON_CLICK_DELETE_NP,
            id
        })
    },
    onClickEditNP(np:Object):void {
        validateNP(np)
        console.log(np)
        AppDispatcher.dispatch({
            type: NPActionTypes.ON_CLICK_EDIT_NP,
            np: np
        })
    },
    // The Save button for an add or edit is clicked.
    // For programmatic insert see NPActionTypes INSERT_NP
    // If np has an id then update an existing NP else insert a new one
    onClickSaveNP(np:Object):void {
        validateNP(np)
        AppDispatcher.dispatch({
            type: NPActionTypes.ON_CLICK_SAVE_NP,
            np: np
        })
    },
    onChangeDefiniteness(newDefiniteness:number, npPanelLevel:number):void {

        let action

        if(npPanelLevel === NPPanelLevel.L1)
            action = {type: NPActionTypes.ON_CHANGE_DEFINITENESS_L1, newDefiniteness: newDefiniteness}
        else if(npPanelLevel >= NPPanelLevel.L2)
            action = {type: NPActionTypes.ON_CHANGE_DEFINITENESS_L2, newDefiniteness: newDefiniteness}
        // else max fubar error

        AppDispatcher.dispatch(action)
    },

    onChangeSelectedNound(newNound:Object, npPanelLevel:number):void {
        validateNound(newNound)
        let action

        if(npPanelLevel === NPPanelLevel.L1)
            action = {type: NPActionTypes.ON_CHANGE_SELECTED_NOUND_L1,newNound: newNound}
        else if(npPanelLevel >= NPPanelLevel.L2)
            action = {type: NPActionTypes.ON_CHANGE_SELECTED_NOUND_L2, newNound: newNound}
        // else max fubar error

        console.log(action)
        AppDispatcher.dispatch(action)
    },

    onChangeSelectedAdjectivds(newAdjectivds:Array<Object>):void {
        newAdjectivds.map( (adjectivd) => {validateAdjectivd(adjectivd)})
        AppDispatcher.dispatch({
            type: NPActionTypes.ON_CHANGE_SELECTED_ADJECTIVD,
            newAdjectivds: newAdjectivds
        })
    },
    
    // Pump a new np directly into the db w/o dealing with any UI.
    insertNP(np:Object):void {
        validateNP(np)
        AppDispatcher.dispatch({
            type: NPActionTypes.INSERT_NP,
            np: np
        })
    }
}

export default NPActions
