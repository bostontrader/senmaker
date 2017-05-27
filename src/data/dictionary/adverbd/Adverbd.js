// @flow
import {Record} from 'immutable'

/**
 * A Adverbd provides the minimal information we need to instantiate an adjective.
 * This is the information that we would find in a dictionary about a particular adjective.
 */
const Adverbd = Record({
    id: '',
    base: ''
})

export default Adverbd
