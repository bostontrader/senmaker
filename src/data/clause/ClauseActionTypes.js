// @flow
const ClauseActionTypes = {

    // add/edit UI
    ON_CLICK_ADD_CLAUSE:    'ON_CLICK_ADD_CLAUSE',
    ON_CLICK_CANCEL:        'ON_CLICK_CANCEL',
    ON_CLICK_DELETE_CLAUSE: 'ON_CLICK_DELETE_CLAUSE',
    ON_CLICK_EDIT_CLAUSE:   'ON_CLICK_EDIT_CLAUSE',
    ON_CLICK_SAVE_CLAUSE:   'ON_CLICK_SAVE_CLAUSE',
    ON_CHANGE_SELECTED_NP:  'ON_CHANGE_SELECTED_NP',
    ON_CHANGE_SELECTED_VP:  'ON_CHANGE_SELECTED_VP',

    // Pump a new Clause directly into the db w/o dealing with any UI.
    INSERT_CLAUSE: 'INSERT_CLAUSE'
}

export default ClauseActionTypes
