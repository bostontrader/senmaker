import {factoryReset}         from './PronoundAEStore'
import {mutators}             from './PronoundAEStore'
import {currentStateTemplate} from './PronoundAEStore'
import {migrateNG}            from '../../../LocalStorage'

describe('PronoundAEStore Migrations', function() {

    // This will only demonstrate that the migration run from the beginning
    // to the end.
    it('Runs all the migrations', function() {
        const finalState = migrateNG(factoryReset, mutators, factoryReset)
        expect(finalState).toEqual(currentStateTemplate)
    })

})
