import Row                from './PronoundRow'
import Table              from './PronoundTable'
import {pronoundExamples} from '../../../data/TestData'
import ActionTypes        from '../../../data/dictionary/pronound/PronoundActionTypes'
import Store              from '../../../data/dictionary/pronound/PronoundStore'

import {testFunction} from '../word/Table'

describe("PronoundTable", () => {testFunction(Table, Row, Store, 'pronound', ActionTypes.INSERT_PRONOUND, pronoundExamples)})
