//@flow
import {Map}    from 'immutable'
import {Record} from 'immutable'
import {MD}     from '../../SchemaConstants'

const Defs:Array<Function> = [Record({v:0, t: MD.AdvStore.t, nextid:1, coll:Map()})]

const AdverbdStoreState:Function = Defs[MD.AdvStore.cv]

export default AdverbdStoreState
export {Defs}
