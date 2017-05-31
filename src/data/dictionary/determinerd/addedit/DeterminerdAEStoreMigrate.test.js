import {factoryReset}         from './DeterminerdAEStore'
import {mutators}             from './DeterminerdAEStore'
import {currentStateTemplate} from './DeterminerdAEStore'
import {migrateNG}            from '../../../LocalStorage'

describe('DeterminerdAEStore Migrations', function() {

    // This will only demonstrate that the migration run from the beginning
    // to the end.
    it('Runs all the migrations', function() {
        const finalState = migrateNG(factoryReset, mutators, factoryReset)
        expect(finalState).toEqual(currentStateTemplate)
    })

})
