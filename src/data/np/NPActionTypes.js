// @flow
const NPActionTypes = {

    // add/edit UI
    ON_CLICK_ADD_NP:          'ON_CLICK_ADD_NP',
    ON_CLICK_CANCEL:          'ON_CLICK_CANCEL',
    ON_CLICK_DELETE_NP:       'ON_CLICK_DELETE_NP',
    ON_CLICK_EDIT_NP:         'ON_CLICK_EDIT_NP',
    ON_CLICK_SAVE_NP:         'ON_CLICK_SAVE_NP',

    // These actions are for the same thing, except that L1 and L2 are used
    // to identify the NPPanelLevel. This matters to the Quiz.  It's tempting
    // to try to dry these actions but in doing so you'll make a lot of exceptional code
    // that rippples through the rest of the code.  That's not worth the effort so just chill and do this instead.
    ON_CHANGE_DEFINITENESS_L1:   'ON_CHANGE_DEFINITENESS_L1',
    ON_CHANGE_SELECTED_NOUND_L1: 'ON_CHANGE_SELECTED_NOUND_L1',
    ON_CHANGE_DEFINITENESS_L2:   'ON_CHANGE_DEFINITENESS_L2',
    ON_CHANGE_SELECTED_NOUND_L2: 'ON_CHANGE_SELECTED_NOUND_L2',

    ON_CHANGE_SELECTED_ADJECTIVD: 'ON_CHANGE_SELECTED_ADJECTIVD',

    // Pump a new NP directly into the db w/o dealing with any UI.
    INSERT_NP: 'INSERT_NP'
}

export default NPActionTypes
