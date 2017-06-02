import ActionTypes         from './DeterminerdActionTypes'
import Store               from './DeterminerdStore'
import {determinerdExamples} from '../../../data/TestData'

import {testFunction} from '../word/Store'

describe("DeterminerdStore", () => {testFunction(Store, ActionTypes, 'determinerd', determinerdExamples)})
