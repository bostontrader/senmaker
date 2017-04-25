// @flow
import {Container} from 'flux/utils'
import {Map}       from 'immutable'

import AppStore         from '../data/app/AppStore'
import AdjectivdAEStore from '../data/dictionary/adjectivd/addedit/AdjectivdAEStore'
import AdjectivdStore   from '../data/dictionary/adjectivd/AdjectivdStore'
import NoundAEStore     from '../data/dictionary/nound/addedit/NoundAEStore'
import NoundStore       from '../data/dictionary/nound/NoundStore'
import NPAEStore        from '../data/np/addedit/NPAEStore'
import NPStore          from '../data/np/NPStore'
import VerbdAEStore     from '../data/dictionary/verbd/addedit/VerbdAEStore'
import VerbdStore       from '../data/dictionary/verbd/VerbdStore'
import VPAEStore        from '../data/vp/addedit/VPAEStore'
import VPStore          from '../data/vp/VPStore'
import QuizStore        from '../data/quiz/QuizStore'
import StringStore      from '../data/strings/StringStore'

import AppView from '../views/AppView'

function getStores() {
    return [
        AppStore,
        AdjectivdStore,
        AdjectivdAEStore,
        NoundStore,
        NoundAEStore,
        NPAEStore,
        NPStore,
        QuizStore,
        StringStore,
        VerbdStore,
        VerbdAEStore,
        VPAEStore,
        VPStore,
    ]
}

function getState() {

    // It's tempting to try to make this a single atom of immutable state. However, the immutable object
    // you try to create here will be converted by deus ex machina into an ordinary JS Object, devoid of the
    // immutable methods.
    return {

        app: AppStore.getState(),

        // A dictionary of available adjectivs.  We will instantiate as many copies of these
        // definitions as we need, as adjectivi.
        adjectivd: Map({
            addedit: AdjectivdAEStore.getState(),
            dict: AdjectivdStore.getState(),
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
        }),
        
        // The quizzes
        quiz: QuizStore.getState(),

        strings: StringStore.getState(),

        // A dictionary of available verbs.  We will instantiate as many copies of these
        // definitions as we need, as verbi.
        verbd: Map({
            addedit: VerbdAEStore.getState(),
            dict: VerbdStore.getState(),
        }),

        // A collection of available vp.
        vp: Map({
            addedit: VPAEStore.getState(),
            dict: VPStore.getState(),
        }),
    }
}

export default Container.createFunctional(AppView, getStores, getState)
