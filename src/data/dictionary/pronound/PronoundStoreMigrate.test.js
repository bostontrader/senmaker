import Pronound           from './Pronound'
import {MD}               from '../../SchemaConstants'
import {deserialize}      from '../../Serializer'
import {pronoundExamples} from '../../../data/TestData'
import {pronoundStoreStateExample} from '../../../data/TestData'

describe('PronoundStore Migrations', function() {

    // Just be happy that this works.
    it('Runs all the migrations', function() {
        const stringVersion = JSON.stringify(pronoundStoreStateExample.toJSON())
        const n2 = deserialize(stringVersion)
    })

})
