//@flow
import {Map}    from 'immutable'
import {Record} from 'immutable'
import {MD}     from '../../SchemaConstants'

const Defs:Array<Function> = [Record({v:0, t: MD.ConjStore.t, nextid:1, coll:Map()})]

const ConjunctiondStoreState:Function = Defs[MD.ConjStore.cv]

export default ConjunctiondStoreState
export {Defs}
