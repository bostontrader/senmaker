/** These Action Types are shared between VerbdAEStore and VerbdStore.
 *
 *  They relate to the add/edit UI and thus need to alert VerbdAEStore
 *  so that the UI may behave correctly.
 *
 *  But they also need to talk to VerbdStore so that the verbd dictionary can
 *  be properly managed.
 */
const VerbdAEActionTypes = {
    CLICK_ADD_VERBD: 'CLICK_ADD_VERBD',
    CLICK_CANCEL: 'CLICK_CANCEL',
    CLICK_DELETE_VERBD: 'CLICK_DELETE_VERBD',
    CLICK_EDIT_VERBD: 'CLICK_EDIT_VERBD',
    CLICK_SAVE_VERBD: 'CLICK_SAVE_VERBD',
    ON_CHANGE_BASE: 'ON_CHANGE_BASE'
}

export default VerbdAEActionTypes
