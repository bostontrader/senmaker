import {Record} from 'immutable'
import {DefinitenessSelect} from './NouniConstants'
import Nound from '../dictionary/nound/Nound'
/**
 * A Nouni is an actual instantiated noun.
 */
const Nouni = Record({
    id: '',
    nound: Nound(),
    definiteness: DefinitenessSelect.NoneSelected,
    generatedText: ''
})

export default Nouni
