//@flow
import {Map}    from 'immutable'
import {Record} from 'immutable'
import {MD}     from '../../SchemaConstants'

const Defs:Array<Function> = [Record({v:0, t: MD.ProStore.t, nextid:1, coll:Map()})]

const PronoundStoreState:Function = Defs[MD.ProStore.cv]

export default PronoundStoreState
export {Defs}
