//@flow
import {Record} from 'immutable'
import {MD}     from '../../SchemaConstants'

const Defs:Array<Object> = [
    Record({id: '', v:0, t: MD.N, base: ''}),
    Record({id: '', v:1, t: MD.N, base: '', plural: ''})
]

const Nound:Function = Defs[MD.N.cv]

export default Nound
export {Defs}
