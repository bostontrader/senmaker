import PrepositiondAEForm from './addedit/PrepositiondAEForm'
import PrepositiondPanel  from './PrepositiondPanel'
import PrepositiondTable  from './PrepositiondTable'

import {testFunction} from '../word/Panel'

describe("PrepositiondPanel", () => {testFunction(PrepositiondPanel, PrepositiondTable, PrepositiondAEForm, 'prepositiond')})
