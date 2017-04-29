// @flow
import {Record} from 'immutable'

/**
 * A Adjectivd provides the minimal information we need to instantiate an adjective.
 * This is the information that we would find in a dictionary about a particular adjective.
 */
const Adjectivd = Record({
    id: '',
    base: ''
})

export default Adjectivd
