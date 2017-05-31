import {factoryReset}         from './DeterminerdStore'
import {mutators}             from './DeterminerdStore'
import {currentStateTemplate} from './DeterminerdStore'
import {migrateNG}            from '../../LocalStorage'

describe('DeterminerdStore Migrations', function() {

    // This will only demonstrate that the migration run from the beginning
    // to the end.
    it('Runs all the migrations', function() {
        const finalState = migrateNG(factoryReset, mutators, factoryReset)
        expect(finalState).toEqual(currentStateTemplate)
    })

})
