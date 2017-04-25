// @flow
import {Record} from 'immutable'

import {ActionTimeSelect} from './VPConstants'
import Verbd              from '../dictionary/verbd/Verbd'

const VP = Record({
    id: '', // string
    verbd: Verbd(),
    actionTime: ActionTimeSelect.NoneSelected,
    generatedText: '' // string
})

export default VP
