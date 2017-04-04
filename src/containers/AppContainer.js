import {Container} from 'flux/utils'
import {Map}       from 'immutable'

import AppStore       from '../data/app/AppStore'
import NoundAEStore   from '../data/dictionary/nound/addedit/NoundAEStore'
import NoundStore     from '../data/dictionary/nound/NoundStore'
import VerbdAEStore   from '../data/dictionary/verbd/addedit/VerbdAEStore'
import VerbdStore     from '../data/dictionary/verbd/VerbdStore'
import NouniAEStore   from '../data/nouni/addedit/NouniAEStore'
import NouniStore     from '../data/nouni/NouniStore'
import QuizStore      from '../data/quiz/QuizStore'
import StringStore    from '../data/strings/StringStore'

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
        //onLessonPrevious: AppActions.onLessonPrevious,
        //onLevelReset: AppActions.onAppReset,

        // A dictionary of available nouns.  We will instantiate as many copies of these
        // definitions as we need, as nouni.
        nound: Map({
            addEditNound: NoundAEStore.getState(),
            nouns: NoundStore.getState(),
            //onChangeSelectedNound: NoundActions.onChangeSelectedNound,
            //onChangeNoundBase:     NoundAEActions.onChangeBase,
        }),

        // A collection of instantiated nound.
        nouni: Map({
            addEditNouni: NouniAEStore.getState(),
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
            //onChangeVerbdBase:  VerbdAEActions.onChangeBase,
        })
    }
}

export default Container.createFunctional(AppView, getStores, getState)
