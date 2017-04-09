/** These Action Types are shared between VerbdAEStore and VerbdStore.
 *
 *  They relate to the add/edit UI and thus need to alert VerbdAEStore
 *  so that the UI may behave correctly.
 *
 *  But they also need to talk to VerbdStore so that the verbd dictionary can
 *  be properly managed.
 */
const VerbdAEActionTypes = {
    ON_CLICK_ADD_VERBD:    'ON_CLICK_ADD_VERBD',
    ON_CLICK_CANCEL:       'ON_CLICK_CANCEL',
    ON_CLICK_DELETE_VERBD: 'ON_CLICK_DELETE_VERBD',
    ON_CLICK_EDIT_VERBD:   'ON_CLICK_EDIT_VERBD',
    ON_CLICK_SAVE_VERBD:   'ON_CLICK_SAVE_VERBD',
    ON_CHANGE_BASE:        'ON_CHANGE_VERBD_BASE'
}

export default VerbdAEActionTypes
