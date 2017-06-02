//@flow
import {Record} from 'immutable'
import {MD}     from '../../SchemaConstants'

const Defs:Array<Function> = [Record({id: '', v:0, t: MD.Adj.t, base: ''})]
const Adjectivd:Function = Defs[MD.Adj.cv]

export default Adjectivd
export {Defs}
