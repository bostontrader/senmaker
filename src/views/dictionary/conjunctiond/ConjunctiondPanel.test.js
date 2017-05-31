import ConjunctiondAEForm from './addedit/ConjunctiondAEForm'
import ConjunctiondPanel  from './ConjunctiondPanel'
import ConjunctiondTable  from './ConjunctiondTable'

import {testFunction} from '../word/Panel'

describe("ConjunctiondPanel", () => {testFunction(ConjunctiondPanel, ConjunctiondTable, ConjunctiondAEForm, 'conjunctiond')})
