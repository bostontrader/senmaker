import Immutable from 'immutable'
import VerbConstants from './VerbConstants'

/**
 * A Verb has a base form, a past tense form, and a pastTense_rule that
 * describes how to transform the base form into the past tense form.  Ideally
 * we don't need to store _both_ the rule and the past tense form.  However,
 * never say never, (except when quoting this rule,) especially with English.
 * So store all three and use this redundancy as a basis for error detection.
 */
const Verb = Immutable.Record({
    id: '',
    base: '',
    pastTense: '',
    pastTense_rule: VerbConstants.pastTense_NoneSelected
})

export default Verb
