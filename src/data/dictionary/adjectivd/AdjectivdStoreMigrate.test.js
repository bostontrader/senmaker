import Adjectivd           from './Adjectivd'
import {MD}                from '../../SchemaConstants'
import {deserialize}       from '../../Serializer'
import {adjectivdExamples} from '../../../data/TestData'
import {adjectivdStoreStateExample} from '../../../data/TestData'

describe('AdjectivdStore Migrations', function() {

    // Just be happy that this works.
    it('Runs all the migrations', function() {
        const stringVersion = JSON.stringify(adjectivdStoreStateExample.toJSON())
        const n2 = deserialize(stringVersion)
    })

})
