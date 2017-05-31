import {factoryReset}         from './ConjunctiondStore'
import {mutators}             from './ConjunctiondStore'
import {currentStateTemplate} from './ConjunctiondStore'
import {migrateNG}            from '../../LocalStorage'

describe('ConjunctiondStore Migrations', function() {

    // This will only demonstrate that the migration run from the beginning
    // to the end.
    it('Runs all the migrations', function() {
        const finalState = migrateNG(factoryReset, mutators, factoryReset)
        expect(finalState).toEqual(currentStateTemplate)
    })

})
