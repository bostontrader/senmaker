// @flow
import {Record} from 'immutable'

import {DefinitenessSelect} from './NPConstants'
import Nound                from '../dictionary/nound/Nound'

const NP = Record({
    id: '', // string
    nound: Nound(),
    definiteness: DefinitenessSelect.NoneSelected, // number
    generatedText: '' // string
})

export default NP
