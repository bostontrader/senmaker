import Row                   from './DeterminerdRow'
import Table                 from './DeterminerdTable'
import {determinerdExamples} from '../../../data/TestData'
import ActionTypes           from '../../../data/dictionary/determinerd/DeterminerdActionTypes'
import Store                 from '../../../data/dictionary/determinerd/DeterminerdStore'

import {testFunction} from '../word/Table'

describe("DeterminerdTable", () => {testFunction(Table, Row, Store, 'determinerd', ActionTypes.INSERT_DETERMINERD, determinerdExamples)})
