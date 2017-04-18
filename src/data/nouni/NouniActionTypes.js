const NouniActionTypes = {

    // add/edit UI
    ON_CLICK_ADD_NOUNI:      'ON_CLICK_ADD_NOUNI',
    ON_CLICK_CANCEL:          'ON_CLICK_CANCEL',
    ON_CLICK_DELETE_NOUNI:    'ON_CLICK_DELETE_NOUNI',
    ON_CLICK_EDIT_NOUNI:      'ON_CLICK_EDIT_NOUNI',
    ON_CLICK_SAVE_NOUNI:      'ON_CLICK_SAVE_NOUNI',
    //ON_CHANGE_BASE:        'ON_CHANGE_NOUNI_BASE',
    ON_CHANGE_DEFINITENESS:   'ON_CHANGE_DEFINITENESS',
    ON_CHANGE_SELECTED_NOUND: 'ON_CHANGE_SELECTED_NOUND',

    // Pump a new nouni directly into the db w/o dealing with any UI.
    INSERT_NOUNI: 'INSERT_NOUNI'
}

export default NouniActionTypes
