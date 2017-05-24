// @flow
const VPActionTypes = {

    // add/edit UI
    ON_CLICK_ADD_VP:          'ON_CLICK_ADD_VP',
    ON_CLICK_CANCEL:          'ON_CLICK_CANCEL',
    ON_CLICK_DELETE_VP:       'ON_CLICK_DELETE_VP',
    ON_CLICK_EDIT_VP:         'ON_CLICK_EDIT_VP',
    ON_CLICK_SAVE_VP:         'ON_CLICK_SAVE_VP',

    ON_CHANGE_ACTION_TIME:    'ON_CHANGE_ACTION_TIME',
    ON_CHANGE_SELECTED_VERBD: 'ON_CHANGE_SELECTED_VERBD',
    //ON_CHANGE_SIMPLE:         'ON_CHANGE_SIMPLE',
    //ON_CHANGE_PERFECT:        'ON_CHANGE_PERFECT',
    //ON_CHANGE_PROGRESSIVE:    'ON_CHANGE_PROGRESSIVE',

    // Pump a new VP directly into the db w/o dealing with any UI.
    INSERT_VP: 'INSERT_VP'
}

export default VPActionTypes
