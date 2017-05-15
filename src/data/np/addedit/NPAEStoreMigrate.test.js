import NPAEStore       from './NPAEStore'
import {initialStates} from './NPAEStore'

describe('NPAEStore Migrations', function() {

    it('Prehistory -> Reset to initial state', function() {
        const preHistory = initialStates[0]
        const currentVersion = NPAEStore.migrate(preHistory)
        expect(currentVersion).toBe(initialStates.slice(-1)[0])
    })

})
