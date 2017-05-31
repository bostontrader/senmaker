import PronoundAEForm from './addedit/PronoundAEForm'
import PronoundPanel  from './PronoundPanel'
import PronoundTable  from './PronoundTable'

import {testFunction} from '../word/Panel'

describe("PronoundPanel", () => {testFunction(PronoundPanel, PronoundTable, PronoundAEForm, 'pronound')})
