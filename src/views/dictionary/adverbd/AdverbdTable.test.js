import Row               from './AdverbdRow'
import Table             from './AdverbdTable'
import {adverbdExamples} from '../../../data/TestData'
import ActionTypes       from '../../../data/dictionary/adverbd/AdverbdActionTypes'
import Store             from '../../../data/dictionary/adverbd/AdverbdStore'

import {testFunction} from '../word/Table'

describe("AdverbdTable", () => {testFunction(Table, Row, Store, 'adverbd', ActionTypes.INSERT_ADVERBD, adverbdExamples)})
