import DeterminerdAEForm from './addedit/DeterminerdAEForm'
import DeterminerdPanel  from './DeterminerdPanel'
import DeterminerdTable  from './DeterminerdTable'

import {testFunction} from '../word/Panel'

describe("DeterminerdPanel", () => {testFunction(DeterminerdPanel, DeterminerdTable, DeterminerdAEForm, 'determinerd')})
