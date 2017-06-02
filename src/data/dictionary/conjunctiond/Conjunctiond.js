//@flow
import {Record} from 'immutable'
import {MD}     from '../../SchemaConstants'

const Defs:Array<Function> = [Record({id: '', v:0, t: MD.Conj.t, base: ''})]
const Conjunctiond:Function = Defs[MD.Conj.cv]

export default Conjunctiond
export {Defs}
