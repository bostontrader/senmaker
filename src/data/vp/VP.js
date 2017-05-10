// @flow
import {Record} from 'immutable'

import {ActionTimeSelect} from './VPConstants'
import Verbd              from '../dictionary/verbd/Verbd'

/*
A VP is simple -or- at least one of perfect and progressive.
If simple is set to true, then perfect and progressive must be set to false.
If perfect or progressive are set to true, then simple must be set to false.
If both perfect and progressive are set to false, then simple must be set to true.
Simple cannot be directly set to false because then all three would be false and that does not compute.
 */

const VP = Record({
    id: '',
    verbd: Verbd(),
    actionTime: ActionTimeSelect.Present,
    simple: true,
    perfect: false,
    progressive: false,
    generatedText: ''
})

export default VP
