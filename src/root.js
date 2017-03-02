import React from 'react'
import ReactDOM from 'react-dom'

import AppContainer from './containers/AppContainer'
import NounActions from './data/nouns/NounActions'
import NounConstants from './data/nouns/NounConstants'
import VerbActions from './data/verbs/VerbActions'
import {PastTenseRule} from './data/verbs/VerbConstants'

ReactDOM.render(<AppContainer />, document.getElementById('nounapp'))

NounActions.insertNoun({base: 'apple', plural: 'apples', pluralization_rule: NounConstants.pluralization_Append_s})
NounActions.insertNoun({base: 'box', plural: 'boxes', pluralization_rule: NounConstants.pluralization_Append_es})

VerbActions.insertVerb({base: 'eat', pastTense: 'ate', pastTense_rule: PastTenseRule.Irregular})
VerbActions.insertVerb({base: 'hit', pastTense: 'hit', pastTense_rule: PastTenseRule.NoChange})
VerbActions.insertVerb({base: 'jump', pastTense: 'jumped', pastTense_rule: PastTenseRule.Append_ed})
