import Verbd           from './Verbd'
import {MD}            from '../../SchemaConstants'
import {deserialize}   from '../../Serializer'
import {verbdExamples} from '../../../data/TestData'
import {verbdStoreStateExample} from '../../../data/TestData'

describe('VerbdStore Migrations', function() {

    // Just be happy that this works.
    it('Runs all the migrations', function() {
        const stringVersion = JSON.stringify(verbdStoreStateExample.toJSON())
        const n2 = deserialize(stringVersion)
    })

})
