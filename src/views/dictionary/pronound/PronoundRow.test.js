import Row                 from './PronoundRow'
import {pronoundExamples} from '../../../data/TestData'

import {testFunction} from '../word/Row'

describe("PronoundRow", () => {testFunction(Row, 'pronound', pronoundExamples)})
