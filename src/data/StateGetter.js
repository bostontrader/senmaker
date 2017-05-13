import {Map} from 'immutable'

import AppStore         from '../data/app/AppStore'
//import AdjectivdAEStore from '../data/dictionary/adjectivd/addedit/AdjectivdAEStore'
//import AdjectivdStore   from '../data/dictionary/adjectivd/AdjectivdStore'
//import ClauseAEStore    from '../data/clause/addedit/ClauseAEStore'
//import ClauseStore      from '../data/clause/ClauseStore'
//import NoundAEStore     from '../data/dictionary/nound/addedit/NoundAEStore'
//import NoundStore       from '../data/dictionary/nound/NoundStore'
//import NPAEStore        from '../data/np/addedit/NPAEStore'
//import NPStore          from '../data/np/NPStore'
import QuizStore        from '../data/quiz/QuizStore'
import StringStore      from '../data/strings/StringStore'
//import VerbdAEStore     from '../data/dictionary/verbd/addedit/VerbdAEStore'
//import VerbdStore       from '../data/dictionary/verbd/VerbdStore'
//import VPAEStore        from '../data/vp/addedit/VPAEStore'
//import VPStore          from '../data/vp/VPStore'

const initialState = {

    app: AppStore.getState(),

    // A dictionary of available adjectivs.  We will instantiate as many copies of these
    // definitions as we need, as adjectivi.
    /*adjectivd: Map({
        addedit: AdjectivdAEStore.getState(),
        dict: AdjectivdStore.getState(),
    }),

    // A collection of available clauses.
    clause: Map({
        addedit: ClauseAEStore.getState(),
        dict: ClauseStore.getState(),
    }),

    // A dictionary of available nouns.  We will instantiate as many copies of these
    // definitions as we need, as nouni.
    nound: Map({
        addedit: NoundAEStore.getState(),
        dict: NoundStore.getState(),
    }),

    // A collection of available np.
    np: Map({
        addedit: NPAEStore.getState(),
        dict: NPStore.getState(),
    }),*/

    // The quizzes
    quiz: QuizStore.getState(),

    strings: StringStore.getState(),

    /*// A dictionary of available verbs.  We will instantiate as many copies of these
    // definitions as we need, as verbi.
    verbd: Map({
        addedit: VerbdAEStore.getState(),
        dict: VerbdStore.getState(),
    }),

    // A collection of available vp.
    vp: Map({
        addedit: VPAEStore.getState(),
        dict: VPStore.getState(),
    })*/
}

export default initialState
