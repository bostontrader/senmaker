import React from 'react'
import ReactDOM from 'react-dom'

import AppContainer from './containers/AppContainer'
import NounActions from './data/nouns/NounActions'
import {PastTenseRule} from './data/verbs/VerbConstants'
import {PluralizationRule} from './data/nouns/NounConstants'
import VerbActions from './data/verbs/VerbActions'

ReactDOM.render(<AppContainer />, document.getElementById('nounapp'))

NounActions.insertNoun({base: 'apple', plural: 'apples', pluralization_rule: PluralizationRule.Append_s})
NounActions.insertNoun({base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es})

VerbActions.insertVerb({base: 'eat', pastTense: 'ate', pastTense_rule: PastTenseRule.Irregular})
VerbActions.insertVerb({base: 'hit', pastTense: 'hit', pastTense_rule: PastTenseRule.NoChange})
VerbActions.insertVerb({base: 'jump', pastTense: 'jumped', pastTense_rule: PastTenseRule.Append_ed})
