import VerbdStore      from './VerbdStore'
import {initialStates} from './VerbdStore'

describe('VerbdStore Migrations', function() {

    it('Prehistory -> Reset to initial state', function() {
        const preHistory = initialStates[0]
        const currentVersion = VerbdStore.migrate(preHistory)
        expect(currentVersion).toBe(initialStates.slice(-1)[0])
    })

})
