// @flow
import {Record} from 'immutable'

import {Aspect}         from './VerbdConstants'
import {AspectOrSimple} from './VerbdConstants'
import {PastFormRule}   from './VerbdConstants'


const Verbd = Record({
    id: '',
    base: '',
    pastForm: '',
    aspectOrSimple: AspectOrSimple.Simple,
    aspect: [] // An array of chosen aspects

    // must be one of these
    //ordinary: false,
    //auxilliary: false

    // only ordinary verbs can be transitive
    // the verb can be transitive or not, depending upon the context
    //transitive: true/false
})

export default Verbd
