import {adjExamples}  from './TestData'
import {Collection} from 'immutable'
import {Record} from 'immutable'
import {fromJS} from 'immutable'

describe('immutablejs-utils', () =>{
    it('can pretty print', () => {
        // pretty print
        const n1 = JSON.stringify(clauseExamples.a.toJSON())
        const n2 = JSON.parse(n1)
        console.log(fromJS)
        //const n2 = fromJS({ a: {b: [10, 20, 30]}, c: 40}, function (key, value, path) {
        const n3 = fromJS(n2, function (key, value, path) {
            console.log(key,value)
            return value

            //isIndexed(value) ? value.toList() : value.toOrderedMap()
        })
        console.log(clauseExamples.a)
        console.log(n1)
        console.log(n2)
        console.log(n3)
    })
})
