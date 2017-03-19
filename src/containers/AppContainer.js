import {Container} from 'flux/utils'

import AppActions from '../data/AppActions'
import AppStore   from '../data/AppStore'

import AppView from '../views/AppView'

import StringActions from '../data/StringActions'
import StringStore   from '../data/StringStore'

import NounDictionaryItemActions      from '../data/dictionary/nouns/NounDictionaryItemActions'
import NounDictionaryItemAddEditStore from '../data/dictionary/nouns/NounDictionaryItemAddEditStore'
import NounDictionaryStore            from '../data/dictionary/nouns/NounDictionaryStore'

import VerbActions      from '../data/dictionary/verbs/VerbDictionaryItemActions'
import VerbAddEditStore from '../data/dictionary/verbs/VerbDictionaryItemAddEditStore'
import VerbStore        from '../data/dictionary/verbs/VerbDictionaryStore'

import NouniActions      from '../data/nouni/NouniActions'
import NouniAddEditStore from '../data/nouni/NouniAddEditStore'
import NouniStore        from '../data/nouni/NouniStore'

function getStores() {
    return [
        AppStore,
        NounDictionaryStore,
        NounDictionaryItemAddEditStore,
        NouniStore,
        NouniAddEditStore,
        StringStore,
        VerbStore,
        VerbAddEditStore
    ]
}

function getState() {

    return {

        lang: AppStore.getState().get('lang'),

        level: AppStore.getState().get('level'),
        onLevelPrevious: AppActions.levelPrevious,
        onLevelNext: AppActions.levelNext,
        onLevelReset: AppActions.levelReset,
        onSetQuizScore: AppActions.setQuizScore,

        // instantiated nouns
        nouni: AppStore.getState().get('nouni'),
        onChangeDefiniteness: NouniActions.changeDefiniteness,
        //onChangeSelectedNoun: (n) => {console.log('AppContainer onSelectedNounChanged =',n)},
        //onInsertNouni: AppActions.insertNouni,
        addEditNouni: NouniAddEditStore.getState(),
        //onAddNouni: NouniDictionaryItemActions.addNouni,
        //onCancelNouni: NouniDictionaryItemActions.cancel,
        //onChangeNouniBase: NouniDictionaryItemActions.changeBase,
        //onDeleteNouni: NouniDictionaryItemActions.deleteNouni,
        //onEditNouni: NouniDictionaryItemActions.editNouni,
        //onInsertNouni: NouniDictionaryItemActions.insertNouni,
        //onUpdateNouni: NouniDictionaryItemActions.updateNouni,

        strings: StringStore.getState(),
        onLangEng: StringActions.langEng,
        onLangChn: StringActions.langChn,

        // noun dictionary
        nouns: NounDictionaryStore.getState(),
        addEditNoun: NounDictionaryItemAddEditStore.getState(),
        onAddNoun: NounDictionaryItemActions.addNoun,
        onCancelNoun: NounDictionaryItemActions.cancel,
        onChangeNounBase: NounDictionaryItemActions.changeBase,
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
