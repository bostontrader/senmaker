import AppContainer from './containers/AppContainer'
import React from 'react'
import ReactDOM from 'react-dom'

console.log('root before render')
ReactDOM.render(<AppContainer />, document.getElementById('nounapp'))
console.log('root after render')

import NounActions from './data/nouns/NounActions'

NounActions.insertNoun({base: 'apple', pluralization_rule: 1})
NounActions.insertNoun({base: 'box', pluralization_rule: 2})
//NounActions.insertNoun({base: 'cat', pluralization_rule: 1})
//NounActions.insertNoun({base: 'dog', pluralization_rule: 1})

import VerbActions from './data/verbs/VerbActions'

VerbActions.insertVerb({base: 'jump', tense_rule: 1})
VerbActions.insertVerb({base: 'run', tense_rule: 2})
