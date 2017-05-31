import AdjectivdAEForm from './addedit/AdjectivdAEForm'
import AdjectivdPanel  from './AdjectivdPanel'
import AdjectivdTable  from './AdjectivdTable'

import {testFunction} from '../word/Panel'

describe("AdjectivdPanel", () => {testFunction(AdjectivdPanel, AdjectivdTable, AdjectivdAEForm, 'adjectivd')})
