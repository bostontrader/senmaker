import {factoryReset}         from './QuizStore'
import {mutators}             from './QuizStore'
import {currentStateTemplate} from './QuizStore'
import {migrateNG}            from '../LocalStorage'

describe('QuizStore Migrations', function() {

    // This will only demonstrate that the migration run from the beginning
    // to the end.
    it('Runs all the migrations', function() {
        const finalState = migrateNG(factoryReset, mutators, factoryReset)
        expect(finalState).toEqual(currentStateTemplate)
    })

})
