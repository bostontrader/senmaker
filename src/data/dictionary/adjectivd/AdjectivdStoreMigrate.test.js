import {factoryReset}         from './AdjectivdStore'
import {mutators}             from './AdjectivdStore'
import {currentStateTemplate} from './AdjectivdStore'
import {migrateNG}            from '../../LocalStorage'

describe('AdjectivdStore Migrations', function() {

    // This will only demonstrate that the migrations run from the beginning
    // to the end.
    it('Runs all the migrations', function() {
        const finalState = migrateNG(factoryReset, mutators, factoryReset)
        expect(finalState).toEqual(currentStateTemplate)
    })

})
