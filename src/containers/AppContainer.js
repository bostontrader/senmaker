// @flow
import {Container} from 'flux/utils'
import {Map}       from 'immutable'

import AppStore            from '../data/app/AppStore'
import AdjectivdAEStore    from '../data/dictionary/adjectivd/addedit/AdjectivdAEStore'
import AdjectivdStore      from '../data/dictionary/adjectivd/AdjectivdStore'
import AdverbdAEStore      from '../data/dictionary/adverbd/addedit/AdverbdAEStore'
import AdverbdStore        from '../data/dictionary/adverbd/AdverbdStore'
import ConjunctiondAEStore from '../data/dictionary/conjunctiond/addedit/ConjunctiondAEStore'
import ConjunctiondStore   from '../data/dictionary/conjunctiond/ConjunctiondStore'
import DeterminerdAEStore  from '../data/dictionary/determinerd/addedit/DeterminerdAEStore'
import DeterminerdStore    from '../data/dictionary/determinerd/DeterminerdStore'
import ClauseAEStore       from '../data/clause/addedit/ClauseAEStore'
import ClauseStore         from '../data/clause/ClauseStore'
import NoundAEStore        from '../data/dictionary/nound/addedit/NoundAEStore'
import NoundStore          from '../data/dictionary/nound/NoundStore'
import NPAEStore           from '../data/np/addedit/NPAEStore'
import NPStore             from '../data/np/NPStore'
import PrepositiondAEStore from '../data/dictionary/prepositiond/addedit/PrepositiondAEStore'
import PrepositiondStore   from '../data/dictionary/prepositiond/PrepositiondStore'
import PronoundAEStore     from '../data/dictionary/pronound/addedit/PronoundAEStore'
import PronoundStore       from '../data/dictionary/pronound/PronoundStore'
import QuizStore           from '../data/quiz/QuizStore'
import StringStore         from '../data/strings/StringStore'
import VerbdAEStore        from '../data/dictionary/verbd/addedit/VerbdAEStore'
import VerbdStore          from '../data/dictionary/verbd/VerbdStore'
import VPAEStore           from '../data/vp/addedit/VPAEStore'
import VPStore             from '../data/vp/VPStore'

import AppView      from '../views/AppView'

function getStores() {
    return [
        AppStore,
        AdjectivdStore,
        AdjectivdAEStore,
        AdverbdStore,
        AdverbdAEStore,
        ConjunctiondStore,
        ConjunctiondAEStore,
        DeterminerdStore,
        DeterminerdAEStore,
        ClauseStore,
        ClauseAEStore,
        NoundStore,
        NoundAEStore,
        NPAEStore,
        NPStore,
        PrepositiondStore,
        PrepositiondAEStore,
        PronoundStore,
        PronoundAEStore,
        QuizStore,
        StringStore,
        VerbdStore,
        VerbdAEStore,
        VPAEStore,
        VPStore
    ]
}

function getState():Object {

    // This will build an ordinary JSON object.  The values can be immutable but the object itself is not.
    // I have tried to make a single immutable atom here, but the immutable object created here
    // is somewhere converted back into ordinary JSON by the time it gets to AppView.
    const state = {

        app: AppStore.getState(),

        // A dictionary of available adjectives.
        adjectivd: Map({
            addedit: AdjectivdAEStore.getState(),
            dict: AdjectivdStore.getState(),
        }),

        // A dictionary of available adverbs.
        adverbd: Map({
            addedit: AdverbdAEStore.getState(),
            dict: AdverbdStore.getState(),
        }),

        // A dictionary of available conjunctions.
        conjunctiond: Map({
            addedit: ConjunctiondAEStore.getState(),
            dict: ConjunctiondStore.getState(),
        }),

        // A dictionary of available determiners.
        determinerd: Map({
            addedit: DeterminerdAEStore.getState(),
            dict: DeterminerdStore.getState(),
        }),

        // A collection of available clauses.
        clause: Map({
            addedit: ClauseAEStore.getState(),
            dict: ClauseStore.getState(),
        }),

        // A dictionary of available nouns.
        nound: Map({
            addedit: NoundAEStore.getState(),
            dict: NoundStore.getState(),
        }),

        // A collection of available np.
        np: Map({
            addedit: NPAEStore.getState(),
            dict: NPStore.getState(),
        }),

        // A dictionary of available prepositions.
        prepositiond: Map({
            addedit: PrepositiondAEStore.getState(),
            dict: PrepositiondStore.getState(),
        }),

        // A dictionary of available pronouns.
        pronound: Map({
            addedit: PronoundAEStore.getState(),
            dict: PronoundStore.getState(),
        }),

        // The quizzes
        quiz: QuizStore.getState(),

        strings: StringStore.getState(),

        // A dictionary of available verbs.
        verbd: Map({
            addedit: VerbdAEStore.getState(),
            dict: VerbdStore.getState(),
        }),

        // A collection of available vp.
        vp: Map({
            addedit: VPAEStore.getState(),
            dict: VPStore.getState(),
        })
    }

    return state

}

export default Container.createFunctional(AppView, getStores, getState)
