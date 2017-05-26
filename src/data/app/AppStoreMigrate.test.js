import AppStore        from './AppStore'
import {initialStates} from './AppStore'
import {migrate}       from '../LocalStorage'

describe('AppStore Migrations', function() {

    it('Prehistory -> Reset to initial state', function() {
        const preHistory = initialStates[0]
        const currentVersion = migrate(preHistory, initialStates)
        expect(currentVersion).toBe(initialStates.slice(-1)[0])
    })

})
