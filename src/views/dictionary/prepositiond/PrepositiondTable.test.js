import Row                    from './PrepositiondRow'
import Table                  from './PrepositiondTable'
import {prepositiondExamples} from '../../../data/TestData'
import ActionTypes            from '../../../data/dictionary/prepositiond/PrepositiondActionTypes'
import Store                  from '../../../data/dictionary/prepositiond/PrepositiondStore'

import {testFunction} from '../word/Table'

describe("PrepositiondTable", () => {testFunction(Table, Row, Store, 'prepositiond', ActionTypes.INSERT_PREPOSITIOND, prepositiondExamples)})
