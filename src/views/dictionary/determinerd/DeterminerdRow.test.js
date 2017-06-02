import Row                 from './DeterminerdRow'
import {determinerdExamples} from '../../../data/TestData'

import {testFunction} from '../word/Row'

describe("DeterminerdRow", () => {testFunction(Row, 'determinerd', determinerdExamples)})
