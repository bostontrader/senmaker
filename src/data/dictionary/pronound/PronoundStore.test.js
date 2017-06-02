import ActionTypes         from './PronoundActionTypes'
import Store               from './PronoundStore'
import {pronoundExamples} from '../../../data/TestData'

import {testFunction} from '../word/Store'

describe("PronoundStore", () => {testFunction(Store, ActionTypes, 'pronound', pronoundExamples)})
