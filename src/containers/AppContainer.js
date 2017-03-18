import {Container} from 'flux/utils'

import AppActions from '../data/AppActions'
import AppStore from '../data/AppStore'
import AppView from '../views/AppView'
import NounDictionaryItemActions from '../data/dictionary/nouns/NounDictionaryItemActions'
import NounDictionaryItemAddEditStore from '../data/dictionary/nouns/NounDictionaryItemAddEditStore'
import NounDictionaryStore from '../data/dictionary/nouns/NounDictionaryStore'
import StringActions from '../data/StringActions'
import StringStore from '../data/StringStore'
import VerbActions from '../data/dictionary/verbs/VerbDictionaryItemActions'
import VerbAddEditStore from '../data/dictionary/verbs/VerbDictionaryItemAddEditStore'
import VerbStore from '../data/dictionary/verbs/VerbDictionaryStore'

function getStores() {
    return [
        AppStore,
        NounDictionaryStore,
        NounDictionaryItemAddEditStore,
        StringStore,
        VerbStore,
        VerbAddEditStore
    ]
}

function getState() {

    return {

        // nouns
        onDefinitenessChanged: (n) => {console.log('AppContainer onDefinitenessChanged =',n)},
        onSelectedNounChanged: (n) => {console.log('AppContainer onSelectedNounChanged =',n)},

        level: AppStore.getState(),
        onLevelPrevious: AppActions.levelPrevious,
        onLevelNext: AppActions.levelNext,
        onLevelReset: AppActions.levelReset,
        onSetQuizScore: AppActions.setQuizScore,

        strings: StringStore.getState(),
        onLangEng: StringActions.langEng,
        onLangChn: StringActions.langChn,

        // noun dictionary
        nouns: NounDictionaryStore.getState(),
        addEditNoun: NounDictionaryItemAddEditStore.getState(),
        onAddNoun: NounDictionaryItemActions.addNoun,
        onCancelNoun: NounDictionaryItemActions.cancel,
        onChangeNounBase: NounDictionaryItemActions.changeBase,
        onChangeDefiniteness: NounDictionaryItemActions.changeDefiniteness,
        onDeleteNoun: NounDictionaryItemActions.deleteNoun,
        onEditNoun: NounDictionaryItemActions.editNoun,
        onInsertNoun: NounDictionaryItemActions.insertNoun,
        onUpdateNoun: NounDictionaryItemActions.updateNoun,

        // verb dictionary
        verbs: VerbStore.getState(),
        addEditVerb: VerbAddEditStore.getState(),
        onAddVerb: VerbActions.addVerb,
        onCancelVerb: VerbActions.cancel,
        onChangeVerbBase: VerbActions.changeBase,
        onDeleteVerb: VerbActions.deleteVerb,
        onEditVerb: VerbActions.editVerb,
        onInsertVerb: VerbActions.insertVerb,
        onUpdateVerb: VerbActions.updateVerb,
        
    }
}

export default Container.createFunctional(AppView, getStores, getState)
