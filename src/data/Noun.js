import Immutable from 'immutable'

const Noun = Immutable.Record({
    id: '',
    base: '',
    plural: '',
    pluralization_rule: 0,
    text: ''
})

export default Noun