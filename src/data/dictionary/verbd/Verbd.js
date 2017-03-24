import {Record} from 'immutable'
import {PastTenseRule} from './VerbdConstants'

/**
 * A Verbd provides the minimal information we need to instantiate a verb.
 * This is the information that we would find in a dictionary about a particular verb.
 *
 * A Verbd has a base form, a past tense form, and a pastTense_rule that
 * describes how to transform the base form into the past tense form.  Ideally
 * we don't need to store _both_ the rule and the past tense form.  However,
 * never say never, (except when quoting this rule,) especially with English.
 * So store all three and use this redundancy as a basis for error detection.
 *
 * In constructing larger English structures, we'll instantiate any number of actual Verbi
 * and we'll use Verbd to do so.
 */
const Verbd = Record({
    id: '',
    base: '',
    pastTense: '',
    pastTense_rule: PastTenseRule.NoneSelected
})

export default Verbd
