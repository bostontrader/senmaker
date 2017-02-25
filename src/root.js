import React from 'react'
import ReactDOM from 'react-dom'

import AppContainer from './containers/AppContainer'
import NounActions from './data/nouns/NounActions'
import VerbActions from './data/verbs/VerbActions'
import VerbConstants from './data/verbs/VerbConstants'

ReactDOM.render(<AppContainer />, document.getElementById('nounapp'))


NounActions.insertNoun({base: 'apple', pluralization_rule: 1})
NounActions.insertNoun({base: 'box', pluralization_rule: 2})

VerbActions.insertVerb({base: 'eat', pastTense: 'ate', pastTense_rule: VerbConstants.pastTense_Irregular})
VerbActions.insertVerb({base: 'hit', pastTense: 'hit', pastTense_rule: VerbConstants.pastTense_NoChange})
VerbActions.insertVerb({base: 'jump', pastTense: 'jumped', pastTense_rule: VerbConstants.pastTense_Append_ed})
