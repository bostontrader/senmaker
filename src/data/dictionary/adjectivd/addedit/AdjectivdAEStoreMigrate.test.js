import AdjectivdAEStore from './AdjectivdAEStore'
import {initialStates}  from './AdjectivdAEStore'
import {migrate}        from '../../../LocalStorage'

describe('AdjectivdAEStore Migrations', function() {

    it('Prehistory -> Reset to initial state', function() {
        const preHistory = initialStates[0]
        const currentVersion = migrate(preHistory, initialStates)
        expect(currentVersion).toBe(initialStates.slice(-1)[0])
    })

})
