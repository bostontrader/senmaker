// @flow
import {List}   from 'immutable'
import {Record} from 'immutable'

import {DefinitenessSelect} from './NPConstants'
import Nound                from '../dictionary/nound/Nound'

const NP = Record({
    id: '',
    nound: Nound(),
    definiteness: DefinitenessSelect.NoneSelected,
    adjectivds: List(),
    generatedText: ''
})

export default NP
