import VerbdAEStore    from './VerbdAEStore'
import {initialStates} from './VerbdAEStore'
import {migrate}       from '../../../LocalStorage'

describe('VerbdAEStore Migrations', function() {

    it('Prehistory -> Reset to initial state', function() {
        const preHistory = initialStates[0]
        const currentVersion = migrate(preHistory, initialStates)
        expect(currentVersion).toBe(initialStates.slice(-1)[0])
    })

})
