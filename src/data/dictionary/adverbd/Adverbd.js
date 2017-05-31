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

/*
Adverb  of manner:     suddenly, quickly
Adverb of frequency always, often
Adverb of place: there, nearby
Linking adverb: too, also
adverb of degree: very
*/