// @flow
const PronoundActionTypes:Object = {

    // add/edit UI
    ON_CLICK_ADD_PRONOUND:    'ON_CLICK_ADD_PRONOUND',
    ON_CLICK_CANCEL:          'ON_CLICK_CANCEL',
    ON_CLICK_DELETE_PRONOUND: 'ON_CLICK_DELETE_PRONOUND',
    ON_CLICK_EDIT_PRONOUND:   'ON_CLICK_EDIT_PRONOUND',
    ON_CLICK_SAVE_PRONOUND:   'ON_CLICK_SAVE_PRONOUND',
    ON_CHANGE_BASE:           'ON_CHANGE_PRONOUND_BASE',

    // Pump a new pronound directly into the db w/o dealing with any UI.
    INSERT_PRONOUND: 'INSERT_PRONOUND'
}

export default PronoundActionTypes
