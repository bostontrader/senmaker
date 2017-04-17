const AdjectivdActionTypes = {

    // add/edit UI
    ON_CLICK_ADD_ADJECTIVD:    'ON_CLICK_ADD_ADJECTIVD',
    ON_CLICK_CANCEL:           'ON_CLICK_CANCEL',
    ON_CLICK_DELETE_ADJECTIVD: 'ON_CLICK_DELETE_ADJECTIVD',
    ON_CLICK_EDIT_ADJECTIVD:   'ON_CLICK_EDIT_ADJECTIVD',
    ON_CLICK_SAVE_ADJECTIVD:   'ON_CLICK_SAVE_ADJECTIVD',
    ON_CHANGE_BASE:            'ON_CHANGE_ADJECTIVD_BASE',

    // Pump a new adjectivd directly into the db w/o dealing with any UI.
    INSERT_ADJECTIVD:             'INSERT_ADJECTIVD',

    // Special for NoundSelect
    //ON_CHANGE_SELECTED_ADJECTIVD: 'ON_CHANGE_SELECTED_ADJECTIVD'
}

export default AdjectivdActionTypes
