//@flow
import {Record} from 'immutable'
import {MD}     from '../../SchemaConstants'

const Defs:Array<Function> = [
    Record({id: '', v:0, t: MD.N.t, base: ''}),
    Record({id: '', v:1, t: MD.N.t, base: '', plural: ''})
]

const Nound:Function = Defs[MD.N.cv]

export default Nound
export {Defs}
