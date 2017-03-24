import {Container} from 'flux/utils'
import {Map}       from 'immutable'

import AppActions     from '../data/AppActions'
import AppStore       from '../data/AppStore'

import NoundAEStore   from '../data/dictionary/nound/addedit/NoundAEStore'
import NoundAEActions from '../data/dictionary/nound/addedit/NoundAEActions'
import NoundStore     from '../data/dictionary/nound/NoundStore'

import VerbdAEStore   from '../data/dictionary/verbd/addedit/VerbdAEStore'
import VerbdAEActions from '../data/dictionary/verbd/addedit/VerbdAEActions'
import VerbdStore     from '../data/dictionary/verbd/VerbdStore'

import NouniActions   from '../data/nouni/NouniActions'
import NouniAEStore   from '../data/nouni/NouniAEStore'
import NouniStore     from '../data/nouni/NouniStore'

import StringActions  from '../data/StringActions'
import StringStore    from '../data/StringStore'

import AppView from '../views/AppView'

function getStores() {
    return [
        AppStore,
        NoundStore,
        NoundAEStore,
        NouniStore,
        NouniAEStore,
        StringStore,
        VerbdStore,
        VerbdAEStore
    ]
}

function getState() {

    // It's tempting to try to make this a single atom of immutable state. However, the immutable object
    // you try to create here will be converted by deus ex machina into an ordinary Object, devoid of the
    // immutable methods.
    return {
        lang: AppStore.getState().get('lang'),

        level: AppStore.getState().get('level'),
        onLevelPrevious: AppActions.levelPrevious,
        onLevelNext: AppActions.levelNext,
        onLevelReset: AppActions.levelReset,
        onSetQuizScore: AppActions.setQuizScore,

        // instantiated nound
        nouni: AppStore.getState().get('nouni'),
        onChangeDefiniteness: NouniActions.changeDefiniteness,
        //onChangeSelectedNoun: (n) => {console.log('AppContainer onSelectedNounChanged =',n)},
        //onChangeSelectedNoun: NouniActions.changeSelectedNoun, // move this to nound?
        //onInsertNouni: AppActions.insertNouni,
        addEditNouni: NouniAEStore.getState(),
        //onAddNouni: NouniDictionaryItemActions.addNouni,
        //onCancelNouni: NouniDictionaryItemActions.cancel,
        //onChangeNouniBase: NouniDictionaryItemActions.changeBase,
        //onDeleteNouni: NouniDictionaryItemActions.deleteNouni,
        //onClickEditNouni: NouniDictionaryItemActions.editNouni,
        //onInsertNouni: NouniDictionaryItemActions.insertNouni,
        //onUpdateNouni: NouniDictionaryItemActions.updateNouni,

        strings: StringStore.getState(),
        onLangEng: StringActions.langEng,
        onLangChn: StringActions.langChn,

        // noun dictionary
        nound: Map({
            addEditNound: NoundAEStore.getState(),
            nouns: NoundStore.getState(),
            //selectedNounId: NoundStore.getState().get('selectedNounId'),
            //onChangeSelectedNoun: NoundActions.changeSelectedNoun,

            onClickAddNound: NoundAEActions.clickAddNound,
            onClickCancel: NoundAEActions.clickCancel, // target only the NoundAEStore
            onClickDeleteNound: NoundAEActions.clickDeleteNoun,
            onClickEditNound: NoundAEActions.clickEditNound,
            onClickSaveNound: NoundAEActions.clickSaveNound,
            onChangeNoundBase: NoundAEActions.onChangeBase,
        }),
        
        // verb dictionary
        verbd: Map({
            addEditVerbd: VerbdAEStore.getState(),
            verbs: VerbdStore.getState(),
            //selectedVerbId: VerbdStore.getState().get('selectedVerbId'),
            //onChangeSelectedVerb: VerbdActions.changeSelectedVerb,

            onClickAddVerbd: VerbdAEActions.clickAddVerbd,
            onClickCancel: VerbdAEActions.clickCancel, // target only the VerbdAEStore
            onClickDeleteVerbd: VerbdAEActions.clickDeleteVerbd,
            onClickEditVerbd: VerbdAEActions.clickEditVerbd,
            onClickSaveVerbd: VerbdAEActions.clickSaveVerbd,
            onChangeVerbdBase: VerbdAEActions.onChangeBase,
        })
    }
}

export default Container.createFunctional(AppView, getStores, getState)
