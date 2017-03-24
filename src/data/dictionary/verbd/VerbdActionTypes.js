/** This is the only Action Type specifically for VerbdStore.
 *  We use this when we want programmatic inserts into the verbd dictionary w/o any UI.
 *  Please see VerbdAEActionTypes for more related actions.
 */
const VerbdActionTypes = {
    INSERT_VERBD: 'INSERT_VERBD' // Pump a new verbd directly into the db w/o dealing with any UI.
}

export default VerbdActionTypes
