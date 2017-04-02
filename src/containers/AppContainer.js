import {Container} from 'flux/utils'
import {Map}       from 'immutable'

import AppActions     from '../data/AppActions'
import AppStore       from '../data/AppStore'

import NoundActions   from '../data/dictionary/nound/NoundActions'
import NoundAEActions from '../data/dictionary/nound/addedit/NoundAEActions'
import NoundAEStore   from '../data/dictionary/nound/addedit/NoundAEStore'
import NoundStore     from '../data/dictionary/nound/NoundStore'

import VerbdAEActions from '../data/dictionary/verbd/addedit/VerbdAEActions'
import VerbdAEStore   from '../data/dictionary/verbd/addedit/VerbdAEStore'
import VerbdStore     from '../data/dictionary/verbd/VerbdStore'

import NouniAEActions from '../data/nouni/addedit/NouniAEActions'
import NouniAEStore   from '../data/nouni/addedit/NouniAEStore'
import NouniStore     from '../data/nouni/NouniStore'

import QuizActions    from '../data/quiz/QuizActions'
import QuizStore      from '../data/quiz/QuizStore'

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
        QuizStore,
        StringStore,
        VerbdStore,
        VerbdAEStore
    ]
}

function getState() {

    // It's tempting to try to make this a single atom of immutable state. However, the immutable object
    // you try to create here will be converted by deus ex machina into an ordinary JS Object, devoid of the
    // immutable methods.
    return {

        app: AppStore.getState(),
        //lang: AppStore.getState().get('lang'),

        //mostRecentlySelectedNound: AppStore.getState().get('mostRecentlySelectedNound'),
        //onLessonPrevious: AppActions.lessonPrevious,
        //onLessonNext: AppActions.lessonNext,
        //onLevelReset: AppActions.levelReset,
        //onSetQuizScore: AppActions.setQuizScore,
        //onLangEng: StringActions.langEng,
        //onLangChn: StringActions.langChn,

        // A dictionary of available nouns.  We will instantiate as many copies of these
        // definitions as we need, as nouni.
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

        // A collection of instantiated nound.
        nouni: Map({
            addEditNouni: NouniAEStore.getState(),
            onChangeDefiniteness: NouniAEActions.onChangeDefiniteness,
        }),

        // The quizzes
        quiz: QuizStore.getState(),

        strings: StringStore.getState(),

        // A dictionary of available verbs.  We will instantiate as many copies of these
        // definitions as we need, as verbi.
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
}

export default Container.createFunctional(AppView, getStores, getState)
