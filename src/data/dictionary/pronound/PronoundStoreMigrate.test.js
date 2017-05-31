import {factoryReset}         from './PronoundStore'
import {mutators}             from './PronoundStore'
import {currentStateTemplate} from './PronoundStore'
import {migrateNG}            from '../../LocalStorage'

describe('PronoundStore Migrations', function() {

    // This will only demonstrate that the migration run from the beginning
    // to the end.
    it('Runs all the migrations', function() {
        const finalState = migrateNG(factoryReset, mutators, factoryReset)
        expect(finalState).toEqual(currentStateTemplate)
    })

})
