import AEForm from './addedit/PronoundAEForm'
import Panel  from './PronoundPanel'
import Table  from './PronoundTable'

import {testFunction} from '../word/Panel'

describe("PronoundPanel", () => {testFunction(Panel, Table, AEForm, 'pronound')})
