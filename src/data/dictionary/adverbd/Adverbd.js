//@flow
import {Record} from 'immutable'
import {MD}     from '../../SchemaConstants'

const Defs:Array<Function> = [Record({id: '', v:0, t: MD.Adv.t, base: ''})]
const Adverbd:Function = Defs[MD.Adv.cv]

export default Adverbd
export {Defs}

/*
Adverb  of manner:     suddenly, quickly
Adverb of frequency always, often
Adverb of place: there, nearby
Linking adverb: too, also
adverb of degree: very
*/