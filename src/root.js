import React from 'react'
import ReactDOM from 'react-dom'

import AppContainer from './containers/AppContainer'
import NounActions from './data/NounActions'

ReactDOM.render(<AppContainer />, document.getElementById('theApp'))

NounActions.addNoun('apple')
NounActions.addNoun('cat')
NounActions.addNoun('dog')
