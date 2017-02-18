import AppContainer from './containers/AppContainer'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(<AppContainer />, document.getElementById('nounapp'))

import NounActions from './data/NounActions'

NounActions.addNoun({base: 'apple', pluralization_rule: 1})
NounActions.addNoun({base: 'box', pluralization_rule: 2})
NounActions.addNoun({base: 'cat', pluralization_rule: 1})
NounActions.addNoun({base: 'dog', pluralization_rule: 1})
