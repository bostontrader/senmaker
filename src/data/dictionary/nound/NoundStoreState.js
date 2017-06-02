//@flow
import {Map}    from 'immutable'
import {Record} from 'immutable'
import {MD}     from '../../SchemaConstants'

const Defs:Array<Function> = [Record({v:0, t: MD.NStore.t, nextid:1, coll:Map()})]

const NoundStoreState:Function = Defs[MD.NStore.cv]

export default NoundStoreState
export {Defs}
