import AdjectivdStore  from './AdjectivdStore'
import {initialStates} from './AdjectivdStore'

describe('AdjectivdStore Migrations', function() {

    it('Prehistory -> Reset to initial state', function() {
        const preHistory = initialStates[0]
        const currentVersion = AdjectivdStore.migrate(preHistory)
        expect(currentVersion).toBe(initialStates.slice(-1)[0])
    })

})
