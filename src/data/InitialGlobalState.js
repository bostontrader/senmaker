import {Map}       from 'immutable'

import AppActions     from './AppActions'
import AppStore       from './AppStore'

import NoundActions   from './dictionary/nound/NoundActions'
import NoundAEActions from './dictionary/nound/addedit/NoundAEActions'
import NoundAEStore   from './dictionary/nound/addedit/NoundAEStore'
import NoundStore     from './dictionary/nound/NoundStore'

import VerbdAEActions from './dictionary/verbd/addedit/VerbdAEActions'
import VerbdAEStore   from './dictionary/verbd/addedit/VerbdAEStore'
import VerbdStore     from './dictionary/verbd/VerbdStore'

import NouniAEActions from './nouni/addedit/NouniAEActions'
import NouniAEStore   from './nouni/addedit/NouniAEStore'

import StringActions  from './StringActions'
import StringStore    from './StringStore'

const initialGlobalState = {
    lang: AppStore.getState().get('lang'),

    level: AppStore.getState().get('level'),
    mostRecentlySelectedNound: AppStore.getState().get('mostRecentlySelectedNound'),
    onLevelPrevious: AppActions.levelPrevious,
    onLevelNext: AppActions.levelNext,
    onLevelReset: AppActions.levelReset,
    onSetQuizScore: AppActions.setQuizScore,
    strings: StringStore.getState(),
    onLangEng: StringActions.langEng,
    onLangChn: StringActions.langChn,

    // noun dictionary
    nound: Map({
        addEditNound: NoundAEStore.getState(),
        nouns: NoundStore.getState(),
        onChangeSelectedNound: NoundActions.onChangeSelectedNound,
        onChangeNoundBase: NoundAEActions.onChangeBase,

        onClickAddNound: NoundAEActions.clickAddNound,
        onClickCancel: NoundAEActions.clickCancel, // target only the NoundAEStore
        onClickDeleteNound: NoundAEActions.clickDeleteNoun,
        onClickEditNound: NoundAEActions.clickEditNound,
        onClickSaveNound: NoundAEActions.clickSaveNound,
    }),

    // noun dictionary
    nouni: Map({
        addEditNouni: NouniAEStore.getState(),
        onChangeDefiniteness: NouniAEActions.onChangeDefiniteness,
    }),

    // verb dictionary
    verbd: Map({
        addEditVerbd: VerbdAEStore.getState(),
        verbs: VerbdStore.getState(),
        //onChangeSelectedVerbd: VerbdActions.onChangeSelectedVerbd,

        onClickAddVerbd: VerbdAEActions.clickAddVerbd,
        onClickCancel: VerbdAEActions.clickCancel, // target only the VerbdAEStore
        onClickDeleteVerbd: VerbdAEActions.clickDeleteVerbd,
        onClickEditVerbd: VerbdAEActions.clickEditVerbd,
        onClickSaveVerbd: VerbdAEActions.clickSaveVerbd,
        onChangeVerbdBase: VerbdAEActions.onChangeBase,
    })
}

export default initialGlobalState
