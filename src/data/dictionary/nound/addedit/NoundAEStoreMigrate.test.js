import NoundAEStore    from './NoundAEStore'
import {initialStates} from './NoundAEStore'

describe('NoundAEStore Migrations', function() {

    it('Prehistory -> Reset to initial state', function() {
        const preHistory = initialStates[0]
        const currentVersion = NoundAEStore.migrate(preHistory)
        expect(currentVersion).toBe(initialStates.slice(-1)[0])
    })

})
