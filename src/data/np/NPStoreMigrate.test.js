import {factoryReset}         from './NPStore'
import {mutators}             from './NPStore'
import {currentStateTemplate} from './NPStore'
import {migrateNG}            from '../LocalStorage'

describe('NPStore Migrations', function() {

    // This will only demonstrate that the migration run from the beginning
    // to the end.
    it('Runs all the migrations', function() {
        const finalState = migrateNG(factoryReset, mutators, factoryReset)
        expect(finalState).toEqual(currentStateTemplate)
    })

})
