import VPAEStore       from './VPAEStore'
import {initialStates} from './VPAEStore'

describe('VPAEStore Migrations', function() {

    it('Prehistory -> Reset to initial state', function() {
        const preHistory = initialStates[0]
        const currentVersion = VPAEStore.migrate(preHistory)
        expect(currentVersion).toBe(initialStates.slice(-1)[0])
    })

})
