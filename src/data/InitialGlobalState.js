import {Map}       from 'immutable'

import AppActions     from './app/AppActions'
import AppStore       from './app/AppStore'

import NoundActions   from './dictionary/nound/NoundActions'
import NoundAEActions from './dictionary/nound/addedit/NoundAEActions'
import NoundAEStore   from './dictionary/nound/addedit/NoundAEStore'
import NoundStore     from './dictionary/nound/NoundStore'

import VerbdAEActions from './dictionary/verbd/addedit/VerbdAEActions'
import VerbdAEStore   from './dictionary/verbd/addedit/VerbdAEStore'
import VerbdStore     from './dictionary/verbd/VerbdStore'

import NouniAEActions from './nouni/addedit/NouniAEActions'
import NouniAEStore   from './nouni/addedit/NouniAEStore'

import StringActions  from './strings/StringActions'
import StringStore    from './strings/StringStore'

const initialGlobalState = {
    lang: AppStore.getState().get('lang'),

    level: AppStore.getState().get('level'),
    mostRecentlySelectedNound: AppStore.getState().get('mostRecentlySelectedNound'),
    onLevelPrevious: AppActions.levelPrevious,
    onLevelNext: AppActions.levelNext,
    onLevelReset: AppActions.onAppReset,
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

        onClickAddNound:    NoundAEActions.onClickAddNound,
        onClickCancel:      NoundAEActions.onClickCancel, // target only the NoundAEStore
        onClickDeleteNound: NoundAEActions.onClickDeleteNoun,
        onClickEditNound:   NoundAEActions.onClickEditNound,
        onClickSaveNound:   NoundAEActions.onClickSaveNound,
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

        onClickAddVerbd:    VerbdAEActions.onClickAddVerbd,
        onClickCancel:      VerbdAEActions.onClickCancel, // target only the VerbdAEStore
        onClickDeleteVerbd: VerbdAEActions.onClickDeleteVerbd,
        onClickEditVerbd:   VerbdAEActions.onClickEditVerbd,
        onClickSaveVerbd:   VerbdAEActions.onClickSaveVerbd,
        onChangeVerbdBase:  VerbdAEActions.onChangeBase,
    })
}

export default initialGlobalState
