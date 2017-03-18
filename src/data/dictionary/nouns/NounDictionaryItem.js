import {Record} from 'immutable'
import {PluralizationRule} from './NounDictionaryItemConstants'

/**
 * A NounDictionaryItem provides the minimal information we need to instantiate a noun.
 * This is the information that we would find in a dictionary about a particular noun.
 *
 * A NounDictionaryItem has a base form, a plural form, and a pluralization_rule that
 * describes how to transform the base form into the plural form.  Ideally
 * we don't need to store _both_ the rule and the plural form.  However,
 * never say never, (except when quoting this rule,) especially with English.
 * So store all three and use this redundancy as a basis for error detection.
 *
 * In constructing larger English structures, we'll instantiate any number of actual Nouns
 * and we'll use NounDictionaryItem to do so.
 */
const NounDictionaryItem = Record({
    id: '',
    base: '',
    plural: '',
    pluralization_rule: PluralizationRule.NoneSelected
})

export default NounDictionaryItem
