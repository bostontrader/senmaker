// @flow
const ConjunctiondActionTypes:Object = {

    // add/edit UI
    ON_CLICK_ADD_CONJUNCTIOND:    'ON_CLICK_ADD_CONJUNCTIOND',
    ON_CLICK_CANCEL:              'ON_CLICK_CANCEL',
    ON_CLICK_DELETE_CONJUNCTIOND: 'ON_CLICK_DELETE_CONJUNCTIOND',
    ON_CLICK_EDIT_CONJUNCTIOND:   'ON_CLICK_EDIT_CONJUNCTIOND',
    ON_CLICK_SAVE_CONJUNCTIOND:   'ON_CLICK_SAVE_CONJUNCTIOND',
    ON_CHANGE_BASE:               'ON_CHANGE_CONJUNCTIOND_BASE',

    // Pump a new conjunctiond directly into the db w/o dealing with any UI.
    INSERT_CONJUNCTIOND: 'INSERT_CONJUNCTIOND'
}

export default ConjunctiondActionTypes
