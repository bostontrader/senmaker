import Row                    from './ConjunctiondRow'
import Table                  from './ConjunctiondTable'
import {conjunctiondExamples} from '../../../data/TestData'
import ActionTypes            from '../../../data/dictionary/conjunctiond/ConjunctiondActionTypes'
import Store                  from '../../../data/dictionary/conjunctiond/ConjunctiondStore'

import {testFunction} from '../word/Table'

describe("ConjunctiondTable", () => {testFunction(Table, Row, Store, 'conjunctiond', ActionTypes.INSERT_CONJUNCTIOND, conjunctiondExamples)})
