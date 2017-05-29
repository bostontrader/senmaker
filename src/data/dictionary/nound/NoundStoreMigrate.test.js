import {factoryReset}         from './NoundStore'
import {mutators}             from './NoundStore'
import {currentStateTemplate} from './NoundStore'
import {migrateNG}            from '../../LocalStorage'

describe('NoundStore Migrations', function() {

    // This will only demonstrate that the migration run from the beginning
    // to the end.
    it('Runs all the migrations', function() {
        const finalState = migrateNG(factoryReset, mutators, factoryReset)
        expect(finalState).toEqual(currentStateTemplate)
    })

})
