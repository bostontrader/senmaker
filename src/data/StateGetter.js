import {Map} from 'immutable'

// 1. The 8 types of words
import AdjectivdAEStore    from '../data/dictionary/adjectivd/addedit/AdjectivdAEStore'
import AdjectivdStore      from '../data/dictionary/adjectivd/AdjectivdStore'
import AdverbdAEStore      from '../data/dictionary/adverbd/addedit/AdverbdAEStore'
import AdverbdStore        from '../data/dictionary/adverbd/AdverbdStore'
import ConjunctiondAEStore from '../data/dictionary/conjunctiond/addedit/ConjunctiondAEStore'
import ConjunctiondStore   from '../data/dictionary/conjunctiond/ConjunctiondStore'
import DeterminerdAEStore  from '../data/dictionary/determinerd/addedit/DeterminerdAEStore'
import DeterminerdStore    from '../data/dictionary/determinerd/DeterminerdStore'
import NoundAEStore        from '../data/dictionary/nound/addedit/NoundAEStore'
import NoundStore          from '../data/dictionary/nound/NoundStore'
import PrepositiondAEStore from '../data/dictionary/prepositiond/addedit/PrepositiondAEStore'
import PrepositiondStore   from '../data/dictionary/prepositiond/PrepositiondStore'
import PronoundAEStore     from '../data/dictionary/pronound/addedit/PronoundAEStore'
import PronoundStore       from '../data/dictionary/pronound/PronoundStore'
import VerbdAEStore        from '../data/dictionary/verbd/addedit/VerbdAEStore'
import VerbdStore          from '../data/dictionary/verbd/VerbdStore'

// 2. Other
import AppStore            from '../data/app/AppStore'
import ClauseAEStore       from '../data/clause/addedit/ClauseAEStore'
import ClauseStore         from '../data/clause/ClauseStore'
import NPAEStore           from '../data/np/addedit/NPAEStore'
import NPStore             from '../data/np/NPStore'
import QuizStore           from '../data/quiz/QuizStore'
import StringStore         from '../data/strings/StringStore'
import VPAEStore           from '../data/vp/addedit/VPAEStore'
import VPStore             from '../data/vp/VPStore'

const initialState = {

    app: AppStore.getState(),

    // 1. Dictionaries of the 8 types of words.
    
    // A dictionary of available adjectivd.
    adjectivd: Map({
        addedit: AdjectivdAEStore.getState(),
        dict: AdjectivdStore.getState(),
    }),

    // A dictionary of available adverbd. 
    adverbd: Map({
        addedit: AdverbdAEStore.getState(),
        dict: AdverbdStore.getState(),
    }),

    // A dictionary of available conjunctiond. 
    conjunctiond: Map({
        addedit: ConjunctiondAEStore.getState(),
        dict: ConjunctiondStore.getState(),
    }),
    
    // A dictionary of available determinerd. 
    determinerd: Map({
        addedit: DeterminerdAEStore.getState(),
        dict: DeterminerdStore.getState(),
    }),

    // A dictionary of available nouns.
    nound: Map({
        addedit: NoundAEStore.getState(),
        dict: NoundStore.getState(),
    }),

    // A dictionary of available prepositiond. 
    prepositiond: Map({
        addedit: PrepositiondAEStore.getState(),
        dict: PrepositiondStore.getState(),
    }),
    
    // A dictionary of available pronound. 
    pronound: Map({
        addedit: PronoundAEStore.getState(),
        dict: PronoundStore.getState(),
    }),

    // A dictionary of available verbs.
    verbd: Map({
        addedit: VerbdAEStore.getState(),
        dict: VerbdStore.getState(),
    }),

    // 2. Other
    
    // A collection of available clauses.
    clause: Map({
        addedit: ClauseAEStore.getState(),
        dict: ClauseStore.getState(),
    }),

    // A collection of available np.
    np: Map({
        addedit: NPAEStore.getState(),
        dict: NPStore.getState(),
    }),

    // The quizzes
    quiz: QuizStore.getState(),

    strings: StringStore.getState(),

    // A collection of available vp.
    vp: Map({
        addedit: VPAEStore.getState(),
        dict: VPStore.getState(),
    })
}

export default initialState
