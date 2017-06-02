import Conjunctiond           from './Conjunctiond'
import {MD}                   from '../../SchemaConstants'
import {deserialize}          from '../../Serializer'
import {conjunctiondExamples} from '../../../data/TestData'
import {conjunctiondStoreStateExample} from '../../../data/TestData'

describe('ConjunctiondStore Migrations', function() {

    // Just be happy that this works.
    it('Runs all the migrations', function() {
        const stringVersion = JSON.stringify(conjunctiondStoreStateExample.toJSON())
        const n2 = deserialize(stringVersion)
    })

})
