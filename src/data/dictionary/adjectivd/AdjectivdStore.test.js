import ActionTypes         from './AdjectivdActionTypes'
import Store               from './AdjectivdStore'
import {adjectivdExamples} from '../../../data/TestData'

import {testFunction} from '../word/Store'

describe("AdjectivdStore", () => {testFunction(Store, ActionTypes, 'adjectivd', adjectivdExamples)})
