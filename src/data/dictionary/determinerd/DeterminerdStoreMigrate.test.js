import Determinerd           from './Determinerd'
import {MD}                  from '../../SchemaConstants'
import {deserialize}         from '../../Serializer'
import {determinerdExamples} from '../../../data/TestData'
import {determinerdStoreStateExample} from '../../../data/TestData'

describe('DeterminerdStore Migrations', function() {

    // Just be happy that this works.
    it('Runs all the migrations', function() {
        const stringVersion = JSON.stringify(determinerdStoreStateExample.toJSON())
        const n2 = deserialize(stringVersion)
    })

})
