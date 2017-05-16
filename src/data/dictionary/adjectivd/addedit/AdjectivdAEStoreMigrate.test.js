import AdjectivdAEStore    from './AdjectivdAEStore'
import {initialStates} from './AdjectivdAEStore'

describe('AdjectivdAEStore Migrations', function() {

    it('Prehistory -> Reset to initial state', function() {
        const preHistory = initialStates[0]
        const currentVersion = AdjectivdAEStore.migrate(preHistory)
        expect(currentVersion).toBe(initialStates.slice(-1)[0])
    })

})
