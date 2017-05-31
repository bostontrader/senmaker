import {factoryReset}         from './ConjunctiondAEStore'
import {mutators}             from './ConjunctiondAEStore'
import {currentStateTemplate} from './ConjunctiondAEStore'
import {migrateNG}            from '../../../LocalStorage'

describe('ConjunctiondAEStore Migrations', function() {

    // This will only demonstrate that the migration run from the beginning
    // to the end.
    it('Runs all the migrations', function() {
        const finalState = migrateNG(factoryReset, mutators, factoryReset)
        expect(finalState).toEqual(currentStateTemplate)
    })

})
