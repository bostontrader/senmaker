import {Container} from 'flux/utils'

import AppActions from '../data/AppActions'
import AppStore from '../data/AppStore'
import AppView from '../views/AppView'
import NounActions from '../data/nouns/NounActions'
import NounAddEditStore from '../data/nouns/NounAddEditStore'
import NounStore from '../data/nouns/NounStore'
import StringActions from '../data/StringActions'
import StringStore from '../data/StringStore'
import VerbActions from '../data/verbs/VerbActions'
import VerbAddEditStore from '../data/verbs/VerbAddEditStore'
import VerbStore from '../data/verbs/VerbStore'

function getStores() {
    return [
        AppStore,
        NounStore,
        NounAddEditStore,
        StringStore,
        VerbStore,
        VerbAddEditStore
    ]
}

function getState() {

    return {
        level: AppStore.getState(),

        onLevelPrevious: AppActions.levelPrevious,
        onLevelNext: AppActions.levelNext,
        onLevelReset: AppActions.levelReset,
        onSetQuizScore: AppActions.setQuizScore,

        strings: StringStore.getState(),
        onLangEng: StringActions.langEng,
        onLangChn: StringActions.langChn,

        nouns: NounStore.getState(),
        addEditNoun: NounAddEditStore.getState(),
        onAddNoun: NounActions.addNoun,
        onCancelNoun: NounActions.cancel,
        onChangeBase: NounActions.changeBase,
        onDeleteNoun: NounActions.deleteNoun,
        onEditNoun: NounActions.editNoun,
        onInsertNoun: NounActions.insertNoun,
        onUpdateNoun: NounActions.updateNoun,

        verbs: VerbStore.getState(),
        addEditVerb: VerbAddEditStore.getState(),
        onAddVerb: VerbActions.addVerb,
        onCancelVerb: VerbActions.cancel,
        onChangeBase: VerbActions.changeBase,
        onDeleteVerb: VerbActions.deleteVerb,
        onEditVerb: VerbActions.editVerb,
        onInsertVerb: VerbActions.insertVerb,
        onUpdateVerb: VerbActions.updateVerb,
        
    }
}

export default Container.createFunctional(AppView, getStores, getState)
