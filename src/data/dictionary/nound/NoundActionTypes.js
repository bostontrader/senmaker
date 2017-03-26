/** This is the only Action Type specifically for NoundStore.
 *  We use this when we want programmatic inserts into the nound dictionary w/o any UI.
 *  Please see NoundAEActionTypes for more related actions.
 */
const NoundActionTypes = {
    INSERT_NOUND: 'INSERT_NOUND', // Pump a new nound directly into the db w/o dealing with any UI.
    ON_CHANGE_SELECTED_NOUND: 'ON_CHANGE_SELECTED_NOUND'
}

export default NoundActionTypes
