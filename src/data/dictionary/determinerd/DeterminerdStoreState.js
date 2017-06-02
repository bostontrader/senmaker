//@flow
import {Map}    from 'immutable'
import {Record} from 'immutable'
import {MD}     from '../../SchemaConstants'

const Defs:Array<Function> = [Record({v:0, t: MD.DetStore.t, nextid:1, coll:Map()})]

const DeterminerdStoreState:Function = Defs[MD.DetStore.cv]

export default DeterminerdStoreState
export {Defs}
