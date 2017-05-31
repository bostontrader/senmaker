import {factoryReset}         from './NoundAEStore'
import {mutators}             from './NoundAEStore'
import {currentStateTemplate} from './NoundAEStore'
import {migrateNG}            from '../../../LocalStorage'

describe('NoundAEStore Migrations', function() {

    // This will only demonstrate that the migration run from the beginning
    // to the end.
    it('Runs all the migrations', function() {
        const finalState = migrateNG(factoryReset, mutators, factoryReset)
        expect(finalState).toEqual(currentStateTemplate)
    })

})
