import Nound           from './Nound'
import {MD}                from '../../SchemaConstants'
import {deserialize}       from '../../Serializer'
import {noundExamples} from '../../../data/TestData'
import {noundStoreStateExample} from '../../../data/TestData'

describe('NoundStore Migrations', function() {

    // Just be happy that this works.
    it('Runs all the migrations', function() {
        const stringVersion = JSON.stringify(noundStoreStateExample.toJSON())
        const n2 = deserialize(stringVersion)
    })

})
