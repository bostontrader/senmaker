// @flow
import ClauseActionTypes from './ClauseActionTypes'
import AppDispatcher     from '../AppDispatcher'
import {validateClause}  from '../Validator'
import {validateNP}      from '../Validator'
import {validateVP}      from '../Validator'

const ClauseActions = {

    // add/edit UI
    onClickAddClause():void {
        AppDispatcher.dispatch({
            type: ClauseActionTypes.ON_CLICK_ADD_CLAUSE
        })
    },
    onClickCancel():void {
        AppDispatcher.dispatch({
            type: ClauseActionTypes.ON_CLICK_CANCEL
        })
    },
    onClickDeleteClause(id:string):void {
        AppDispatcher.dispatch({
            type: ClauseActionTypes.ON_CLICK_DELETE_CLAUSE,
            id
        })
    },
    onClickEditClause(clause:Object):void {
        validateClause(clause)
        AppDispatcher.dispatch({
            type: ClauseActionTypes.ON_CLICK_EDIT_CLAUSE,
            clause: clause
        })
    },
    // The Save button for an add or edit is clicked.
    // For programmatic insert see ClauseActionTypes INSERT_CLAUSE
    // If clause has an id then update an existing CLAUSE else insert a new one
    onClickSaveClause(clause:Object):void {
        validateClause(clause)
        AppDispatcher.dispatch({
            type: ClauseActionTypes.ON_CLICK_SAVE_CLAUSE, // string
            clause: clause // CLAUSE
        })
    },
    onChangeSelectedNP(newNP:Object):void {
        validateNP(newNP)
        AppDispatcher.dispatch({
            type: ClauseActionTypes.ON_CHANGE_SELECTED_NP,
            newNP: newNP
        })
    },
    onChangeSelectedVP(newVP:Object):void {
        validateVP(newVP)
        AppDispatcher.dispatch({
            type: ClauseActionTypes.ON_CHANGE_SELECTED_VP,
            newVP: newVP
        })
    },
    // Pump a new clause directly into the db w/o dealing with any UI.
    insertClause(clause:Object):void {
        validateClause(clause)
        AppDispatcher.dispatch({
            type: ClauseActionTypes.INSERT_CLAUSE,
            clause: clause
        })
    }
}

export default ClauseActions
