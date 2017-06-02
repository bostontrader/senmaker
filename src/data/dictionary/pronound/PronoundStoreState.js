//@flow
import {Map}    from 'immutable'
import {Record} from 'immutable'
import {MD}     from '../../SchemaConstants'

const Defs:Array<Function> = [Record({v:0, t: MD.AdjStore.t, nextid:1, coll:Map()})]

const AdjectivdStoreState:Function = Defs[MD.AdjStore.cv]

export default AdjectivdStoreState
export {Defs}
