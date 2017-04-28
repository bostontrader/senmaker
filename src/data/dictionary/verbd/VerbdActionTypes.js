// @flow
const VerbdActionTypes:Object = {

    // add/edit UI
    ON_CLICK_ADD_VERBD:    'ON_CLICK_ADD_VERBD',
    ON_CLICK_CANCEL:       'ON_CLICK_CANCEL',
    ON_CLICK_DELETE_VERBD: 'ON_CLICK_DELETE_VERBD',
    ON_CLICK_EDIT_VERBD:   'ON_CLICK_EDIT_VERBD',
    ON_CLICK_SAVE_VERBD:   'ON_CLICK_SAVE_VERBD',
    ON_CHANGE_BASE:        'ON_CHANGE_VERBD_BASE',
    ON_CHANGE_PAST_TENSE:  'ON_CHANGE_VERBD_PAST_TENSE',

    // Pump a new verbd directly into the db w/o dealing with any UI.
    INSERT_VERBD:             'INSERT_VERBD'
}

export default VerbdActionTypes
