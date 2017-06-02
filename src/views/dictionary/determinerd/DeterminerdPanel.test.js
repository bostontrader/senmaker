import AEForm from './addedit/DeterminerdAEForm'
import Panel  from './DeterminerdPanel'
import Table  from './DeterminerdTable'

import {testFunction} from '../word/Panel'

describe("DeterminerdPanel", () => {testFunction(Panel, Table, AEForm, 'determinerd')})
