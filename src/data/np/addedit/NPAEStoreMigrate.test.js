import NPAEStore       from './NPAEStore'
import {initialStates} from './NPAEStore'
import {migrate}       from '../../LocalStorage'

describe('NPAEStore Migrations', function() {

    it('Prehistory -> Reset to initial state', function() {
        const preHistory = initialStates[0]
        const currentVersion = migrate(preHistory, initialStates)
        expect(currentVersion).toBe(initialStates.slice(-1)[0])
    })

})
