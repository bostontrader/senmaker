import Row                 from './AdjectivdRow'
import Table               from './AdjectivdTable'
import {adjectivdExamples} from '../../../data/TestData'
import ActionTypes         from '../../../data/dictionary/adjectivd/AdjectivdActionTypes'
import Store               from '../../../data/dictionary/adjectivd/AdjectivdStore'

import {testFunction} from '../word/Table'

describe("AdjectivdTable", () => {testFunction(Table, Row, Store, 'adjectivd', ActionTypes.INSERT_ADJECTIVD, adjectivdExamples)})
