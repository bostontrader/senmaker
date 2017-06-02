import Prepositiond           from './Prepositiond'
import {MD}                   from '../../SchemaConstants'
import {deserialize}          from '../../Serializer'
import {prepositiondExamples} from '../../../data/TestData'
import {prepositiondStoreStateExample} from '../../../data/TestData'

describe('PrepositiondStore Migrations', function() {

    // Just be happy that this works.
    it('Runs all the migrations', function() {
        const stringVersion = JSON.stringify(prepositiondStoreStateExample.toJSON())
        const n2 = deserialize(stringVersion)
    })

})
