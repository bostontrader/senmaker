import Row                 from './AdjectivdRow'
import {adjectivdExamples} from '../../../data/TestData'

import {testFunction} from '../word/Row'

describe("AdjectivdRow", () => {testFunction(Row, 'adjectivd', adjectivdExamples)})
