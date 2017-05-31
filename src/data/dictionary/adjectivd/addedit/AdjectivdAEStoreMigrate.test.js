import {factoryReset}         from './AdjectivdAEStore'
import {mutators}             from './AdjectivdAEStore'
import {currentStateTemplate} from './AdjectivdAEStore'
import {migrateNG}            from '../../../LocalStorage'

describe('AdjectivdAEStore Migrations', function() {

    // This will only demonstrate that the migration run from the beginning
    // to the end.
    it('Runs all the migrations', function() {
        const finalState = migrateNG(factoryReset, mutators, factoryReset)
        expect(finalState).toEqual(currentStateTemplate)
    })

})
