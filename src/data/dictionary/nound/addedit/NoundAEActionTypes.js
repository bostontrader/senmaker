/** These Action Types are shared between NoundAEStore and NoundStore.
 *
 *  They relate to the add/edit UI and thus need to alert NoundAEStore
 *  so that the UI may behave correctly.
 *
 *  But they also need to talk to NoundStore so that the nound dictionary can
 *  be properly managed.
 */
const NoundAEActionTypes = {
    ON_CLICK_ADD_NOUND:    'ON_CLICK_ADD_NOUND',
    ON_CLICK_CANCEL:       'ON_CLICK_CANCEL',
    ON_CLICK_DELETE_NOUND: 'ON_CLICK_DELETE_NOUND',
    ON_CLICK_EDIT_NOUND:   'ON_CLICK_EDIT_NOUND',
    ON_CLICK_SAVE_NOUND:   'ON_CLICK_SAVE_NOUND',
    ON_CHANGE_BASE:        'ON_CHANGE_NOUND_BASE'
}

export default NoundAEActionTypes
