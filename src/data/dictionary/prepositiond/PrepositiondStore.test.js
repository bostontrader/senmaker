import ActionTypes         from './PrepositiondActionTypes'
import Store               from './PrepositiondStore'
import {prepositiondExamples} from '../../../data/TestData'

import {testFunction} from '../word/Store'

describe("PrepositiondStore", () => {testFunction(Store, ActionTypes, 'prepositiond', prepositiondExamples)})
