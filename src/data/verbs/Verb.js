import Immutable from 'immutable'

/**
 * A Verb has a base form, a tense form, and a tense_rule that
 * describes how to transform the base form into the tense form.  Ideally
 * we don't need to store _both_ the rule and the tense form.  However,
 * never say never, (except when quoting this rule,) especially with English.
 * So store all three and use this redundancy as a basis for error detection.
 */
const Verb = Immutable.Record({
    id: '',
    base: '',
    tense: '',
    tense_rule: 0
})

export default Verb
