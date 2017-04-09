import {Record} from 'immutable'

/**
 * A Adjectivd provides the minimal information we need to instantiate an adjective.
 * This is the information that we would find in a dictionary about a particular adjective.
 *
 * In constructing larger English structures, we'll instantiate any number of actual Adjectivi
 * and we'll use Adjectivd to do so.
 */
const Adjectivd = Record({
    id: '',
    base: ''
})

export default Adjectivd
