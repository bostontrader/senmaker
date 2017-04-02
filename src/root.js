import React from 'react'
import ReactDOM from 'react-dom'

import AppContainer from './containers/AppContainer'

import NoundActions        from './data/dictionary/nound/NoundActions'
import {PluralizationRule} from './data/dictionary/nound/NoundConstants'
import VerbdActions        from './data/dictionary/verbd/VerbdActions'
import {PastTenseRule}     from './data/dictionary/verbd/VerbdConstants'

ReactDOM.render(<AppContainer />, document.getElementById('senmaker'))

// Populate the db, but not via the ordinary UI
NoundActions.insertNound({base: 'apple',  plural: 'apples', pluralization_rule: PluralizationRule.Append_s})
NoundActions.insertNound({base: 'box',    plural: 'boxes',  pluralization_rule: PluralizationRule.Append_es})
NoundActions.insertNound({base: 'fish',   plural: 'fish',   pluralization_rule: PluralizationRule.NoChange})
NoundActions.insertNound({base: 'person', plural: 'people', pluralization_rule: PluralizationRule.Irregular})

VerbdActions.insertVerbd({base: 'eat',  pastTense: 'ate',    pastTense_rule: PastTenseRule.Irregular})
VerbdActions.insertVerbd({base: 'hit',  pastTense: 'hit',    pastTense_rule: PastTenseRule.NoChange})
VerbdActions.insertVerbd({base: 'jump', pastTense: 'jumped', pastTense_rule: PastTenseRule.Append_ed})
