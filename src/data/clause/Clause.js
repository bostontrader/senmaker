// @flow
import {Record} from 'immutable'

import NP from '../np/NP'
import VP from '../vp/VP'

const Clause = Record({
    id: '', // string
    np: NP(),
    vp: VP(),
    generatedText: '' // string
})

export default Clause
