/** These Action Types are shared between NPAEStore and NPStore.
 *
 *  They relate to the add/edit UI and thus need to alert NPAEStore
 *  so that the UI may behave correctly.
 *
 *  But they also need to talk to NPStore so that the np dictionary can
 *  be properly managed.
 */
const NPAEActionTypes = {
    ON_CLICK_ADD_NP:    'ON_CLICK_ADD_NP',
    //ON_CLICK_CANCEL:    'ON_CLICK_CANCEL',
    //ON_CLICK_DELETE_NP: 'ON_CLICK_DELETE_NP',
    //ON_CLICK_EDIT_NP:   'ON_CLICK_EDIT_NP',
    //ON_CLICK_SAVE_NP:   'ON_CLICK_SAVE_NP',
    //ON_CHANGE_BASE:     'ON_CHANGE_NP_BASE'
}

export default NPAEActionTypes
