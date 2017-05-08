// @flow
import {Record} from 'immutable'

import {Aspect}         from './VerbdConstants'
import {AspectOrSimple} from './VerbdConstants'
import {PastFormRule}   from './VerbdConstants'

/**
 * A Verbd provides the minimal information we need to instantiate a verb.
 * This is the information that we would find in a dictionary about a particular verb.
 *
 * A Verbd has a base form, a past form, and a pastForm_rule that
 * describes how to transform the base form into the past form.  Ideally
 * we don't need to store _both_ the rule and the past form.  However,
 * never say never, (except when quoting this rule,) especially with English.
 * So store all three and use this redundancy as a basis for error detection.
 *
 * In constructing larger English structures, we'll instantiate any number of actual VerbPhrases
 * and we'll use Verbd to do so.
 */
const Verbd = Record({
    id: '',
    base: '',
    pastForm: '',
    pastForm_rule: PastFormRule.NoneSelected,
    aspectOrSimple: AspectOrSimple.Simple,
    aspect: [] // An array of chosen aspects
})

export default Verbd
