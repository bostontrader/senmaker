/** These Action Types are shared between AdjectivdAEStore and AdjectivdStore.
 *
 *  They relate to the add/edit UI and thus need to alert AdjectivdAEStore
 *  so that the UI may behave correctly.
 *
 *  But they also need to talk to AdjectivdStore so that the adjectivd dictionary can
 *  be properly managed.
 */
const AdjectivdAEActionTypes = {
    ON_CLICK_ADD_ADJECTIVD:    'ON_CLICK_ADD_ADJECTIVD',
    ON_CLICK_CANCEL:           'ON_CLICK_CANCEL',
    ON_CLICK_DELETE_ADJECTIVD: 'ON_CLICK_DELETE_ADJECTIVD',
    ON_CLICK_EDIT_ADJECTIVD:   'ON_CLICK_EDIT_ADJECTIVD',
    ON_CLICK_SAVE_ADJECTIVD:   'ON_CLICK_SAVE_ADJECTIVD',
    ON_CHANGE_BASE:            'ON_CHANGE_ADJECTIVD_BASE'
}

export default AdjectivdAEActionTypes
