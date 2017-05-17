import VerbdAEStore    from './VerbdAEStore'
import {initialStates} from './VerbdAEStore'

describe('VerbdAEStore Migrations', function() {

    it('Prehistory -> Reset to initial state', function() {
        const preHistory = initialStates[0]
        const currentVersion = VerbdAEStore.migrate(preHistory)
        expect(currentVersion).toBe(initialStates.slice(-1)[0])
    })

})
