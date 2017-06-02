import ActionTypes         from './VerbdActionTypes'
import Store               from './VerbdStore'
import {verbdExamples} from '../../../data/TestData'

import {testFunction} from '../word/Store'

describe("VerbdStore", () => {testFunction(Store, ActionTypes, 'verbd', verbdExamples)})
