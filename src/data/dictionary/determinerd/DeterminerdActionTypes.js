// @flow
const DeterminerdActionTypes:Object = {

    // add/edit UI
    ON_CLICK_ADD_DETERMINERD:    'ON_CLICK_ADD_DETERMINERD',
    ON_CLICK_CANCEL:             'ON_CLICK_CANCEL',
    ON_CLICK_DELETE_DETERMINERD: 'ON_CLICK_DELETE_DETERMINERD',
    ON_CLICK_EDIT_DETERMINERD:   'ON_CLICK_EDIT_DETERMINERD',
    ON_CLICK_SAVE_DETERMINERD:   'ON_CLICK_SAVE_DETERMINERD',
    ON_CHANGE_BASE:              'ON_CHANGE_DETERMINERD_BASE',

    // Pump a new determinerd directly into the db w/o dealing with any UI.
    INSERT_DETERMINERD: 'INSERT_DETERMINERD'
}

export default DeterminerdActionTypes
