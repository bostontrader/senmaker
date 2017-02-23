import Immutable from 'immutable'

/**
 * A Noun has a base form, a plural form, and a pluralization_rule that
 * describes how to transform the base form into the plural form.  Ideally
 * we don't need to store _both_ the rule and the plural form.  However,
 * never say never, (except when quoting this rule,) especially with English.
 * So store all three and use this redundancy as a basis for error detection.
 */
const Noun = Immutable.Record({
    id: '',
    base: '',
    plural: '',
    pluralization_rule: 0,
    text: ''
})

export default Noun
