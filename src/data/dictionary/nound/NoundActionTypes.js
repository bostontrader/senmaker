// @flow
const NoundActionTypes:Object = {

    // add/edit UI
    ON_CLICK_ADD_NOUND:    'ON_CLICK_ADD_NOUND',
    ON_CLICK_CANCEL:       'ON_CLICK_CANCEL',
    ON_CLICK_DELETE_NOUND: 'ON_CLICK_DELETE_NOUND',
    ON_CLICK_EDIT_NOUND:   'ON_CLICK_EDIT_NOUND',
    ON_CLICK_SAVE_NOUND:   'ON_CLICK_SAVE_NOUND',
    ON_CHANGE_BASE:        'ON_CHANGE_NOUND_BASE',
    ON_CHANGE_PLURALIZATION_RULE: 'ON_CHANGE_PLURALIZATION_RULE',
    ON_CHANGE_PLURAL:      'ON_CHANGE_PLURAL',

    // Pump a new nound directly into the db w/o dealing with any UI.
    INSERT_NOUND:             'INSERT_NOUND'
}

export default NoundActionTypes
