// @flow
import {Record} from 'immutable'

/**
 * A Prepositiond provides the minimal information we need to instantiate an preposition.
 * This is the information that we would find in a dictionary about a particular preposition.
 */
const Prepositiond = Record({
    id: '',
    base: ''
})

export default Prepositiond
