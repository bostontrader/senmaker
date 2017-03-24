/** These Action Types are shared between NoundAEStore and NoundStore.
 *
 *  They relate to the add/edit UI and thus need to alert NoundAEStore
 *  so that the UI may behave correctly.
 *
 *  But they also need to talk to NoundStore so that the nound dictionary can
 *  be properly managed.
 */
const NoundAEActionTypes = {
    CLICK_ADD_NOUND: 'CLICK_ADD_NOUND',
    CLICK_CANCEL: 'CLICK_CANCEL',
    CLICK_DELETE_NOUND: 'CLICK_DELETE_NOUND',
    CLICK_EDIT_NOUND: 'CLICK_EDIT_NOUND',
    CLICK_SAVE_NOUND: 'CLICK_SAVE_NOUND',
    ON_CHANGE_BASE: 'ON_CHANGE_BASE'
}

export default NoundAEActionTypes
