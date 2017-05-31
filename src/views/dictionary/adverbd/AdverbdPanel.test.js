import AdverbdAEForm from './addedit/AdverbdAEForm'
import AdverbdPanel  from './AdverbdPanel'
import AdverbdTable  from './AdverbdTable'

import {testFunction} from '../word/Panel'

describe("AdverbdPanel", () => {testFunction(AdverbdPanel, AdverbdTable, AdverbdAEForm, 'adverbd')})
