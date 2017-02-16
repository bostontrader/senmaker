import AppContainer from './containers/AppContainer'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(<AppContainer />, document.getElementById('nounapp'))

import NounActions from './data/NounActions'

NounActions.addNoun('cat')
NounActions.addNoun('dog')
NounActions.addNoun('apple')