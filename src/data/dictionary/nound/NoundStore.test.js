import ActionTypes     from './NoundActionTypes'
import Store           from './NoundStore'
import {noundExamples} from '../../../data/TestData'

import {testFunction} from '../word/Store'

describe("NoundStore", () => {testFunction(Store, ActionTypes, 'nound', noundExamples)})
