import {factoryReset}         from './PrepositiondAEStore'
import {mutators}             from './PrepositiondAEStore'
import {currentStateTemplate} from './PrepositiondAEStore'
import {migrateNG}            from '../../../LocalStorage'

describe('PrepositiondAEStore Migrations', function() {

    // This will only demonstrate that the migration run from the beginning
    // to the end.
    it('Runs all the migrations', function() {
        const finalState = migrateNG(factoryReset, mutators, factoryReset)
        expect(finalState).toEqual(currentStateTemplate)
    })

})
