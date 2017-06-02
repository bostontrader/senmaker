// @flow
import {List} from 'immutable'
import {Map}  from 'immutable'

import {MD}                   from './SchemaConstants'
import Clause                 from './clause/Clause'
import Adjectivd              from './dictionary/adjectivd/Adjectivd'
import AdjectivdStoreState    from './dictionary/adjectivd/AdjectivdStoreState'
import Adverbd                from './dictionary/adverbd/Adverbd'
import AdverbdStoreState      from './dictionary/adverbd/AdverbdStoreState'
import Conjunctiond           from './dictionary/conjunctiond/Conjunctiond'
import ConjunctiondStoreState from './dictionary/conjunctiond/ConjunctiondStoreState'
import Determinerd            from './dictionary/determinerd/Determinerd'
import DeterminerdStoreState  from './dictionary/determinerd/DeterminerdStoreState'
import Nound                  from './dictionary/nound/Nound'
import NoundStoreState        from './dictionary/nound/NoundStoreState'
import Prepositiond           from './dictionary/prepositiond/Prepositiond'
import PrepositiondStoreState from './dictionary/prepositiond/PrepositiondStoreState'
import Pronound               from './dictionary/pronound/Pronound'
import PronoundStoreState     from './dictionary/pronound/PronoundStoreState'
import Verbd                  from './dictionary/verbd/Verbd'
import VerbdStoreState        from './dictionary/verbd/VerbdStoreState'

import {AspectOrSimple}     from './dictionary/verbd/VerbdConstants'
import NP                   from './np/NP'
import {DefinitenessSelect} from './np/NPConstants'
import VP                   from './vp/VP'
import {ActionTimeSelect}   from './vp/VPConstants'

// These examples contain pre-determined id in order to ease comparisons during testing.
// However, in order to properly use these examples, we must sometimes set the id to null
// to reflect actual usage of an insert operation.  Be aware the the first id starts at '1'.

const adjectivdExamples:Object = {
    '1':Adjectivd({id:'1', v:0, t:MD.Adj.t, base: 'fat'}),
    '2':Adjectivd({id:'2', v:0, t:MD.Adj.t, base: 'drunk'}),
    '3':Adjectivd({id:'3', v:0, t:MD.Adj.t, base: 'stupid'})
}

const adjectivdStoreStateExample:Object =
    AdjectivdStoreState({id:'1', v:0, t:MD.AdjStore.t, coll: Map(adjectivdExamples)})


const adverbdExamples:Object = {
    '1':Adverbd({id:'1', v:0, t:MD.Adv.t, base: 'quickly'}),
    '2':Adverbd({id:'2', v:0, t:MD.Adv.t, base: 'stupidly'}),
    '3':Adverbd({id:'3', v:0, t:MD.Adv.t, base: 'darkly'})
}

const adverbdStoreStateExample:Object =
    AdverbdStoreState({id:'1', v:0, t:MD.AdvStore.t, coll: Map(adverbdExamples)})


const conjunctiondExamples:Object = {
    '1':Conjunctiond({id:'1', v:0, t:MD.Conj.t, base: 'and'}),
    '2':Conjunctiond({id:'2', v:0, t:MD.Conj.t, base: 'but'}),
    '3':Conjunctiond({id:'3', v:0, t:MD.Conj.t, base: 'so'})
}

const conjunctiondStoreStateExample:Object =
    ConjunctiondStoreState({id:'1', v:0, t:MD.ConjStore.t, coll: Map(conjunctiondExamples)})


const determinerdExamples:Object = {
    '1':Determinerd({id:'1', v:0, t:MD.Det.t, base: 'the'}),
    '2':Determinerd({id:'2', v:0, t:MD.Det.t, base: 'his'}),
    '3':Determinerd({id:'3', v:0, t:MD.Det.t, base: 'some'})
}

const determinerdStoreStateExample:Object =
    DeterminerdStoreState({id:'1', v:0, t:MD.DetStore.t, coll: Map(determinerdExamples)})


const noundExamples:Object = {
    '1':Nound({id:'1', v:1, t:MD.N.t, base: 'apple',  plural: 'apples'}),
    '2':Nound({id:'2', v:1, t:MD.N.t, base: 'box',    plural: 'boxes'}),
    '3':Nound({id:'3', v:1, t:MD.N.t, base: 'fish',   plural: 'fish'}),
    '4':Nound({id:'4', v:1, t:MD.N.t, base: 'person', plural: 'people'})
}

const noundStoreStateExample:Object =
    NoundStoreState({id:'1', v:0, t:MD.NStore.t, coll: Map(noundExamples)})


const prepositiondExamples:Object = {
    '1':Prepositiond({id:'1', v:0, t:MD.Pre.t, base: 'quickly'}),
    '2':Prepositiond({id:'2', v:0, t:MD.Pre.t, base: 'stupidly'}),
    '3':Prepositiond({id:'3', v:0, t:MD.Pre.t, base: 'darkly'})
}

const prepositiondStoreStateExample:Object =
    PrepositiondStoreState({id:'1', v:0, t:MD.PreStore.t, coll: Map(prepositiondExamples)})


const pronoundExamples:Object = {
    '1':Pronound({id:'1', v:0, t:MD.Pro.t, base: 'i'}),
    '2':Pronound({id:'2', v:0, t:MD.Pro.t, base: 'you'}),
    '3':Pronound({id:'3', v:0, t:MD.Pro.t, base: 'he'})
}

const pronoundStoreStateExample:Object =
    PronoundStoreState({id:'1', v:0, t:MD.ProStore.t, coll: Map(pronoundExamples)})


const verbdExamples:Object = {
    '1':Verbd({
        id:'1', v:0, t:MD.V.t,
        base: 'eat',
        pastForm: 'ate',
        aspectOrSimple: AspectOrSimple.Simple,
        aspect: []
    }),
    '2':Verbd({
        id:'2', v:0, t:MD.V.t,
        base: 'talk',
        pastForm: 'talked',
        aspectOrSimple: AspectOrSimple.Simple,
        aspect: []
    }),
    '3':Verbd({
        id:'3', v:0, t:MD.V.t,
        base: 'hit',
        pastForm: 'hit',
        aspectOrSimple: AspectOrSimple.Simple,
        aspect: []
    })
}

const verbdStoreStateExample:Object =
    VerbdStoreState({id:'1', v:0, t:MD.VStore.t, coll: Map(verbdExamples)})


const npExamples:Object = {
    a:NP({
        id:'1', v:0, t:MD.NP,
        nound: noundExamples.a,
        definiteness: DefinitenessSelect.NoneSelected,
        adjectivds: List(),
        generatedText: 'apple'
    }),
    b:NP({
        id:'2', v:0, t:MD.NP,
        nound: noundExamples.b,
        definiteness: DefinitenessSelect.Definite,
        adjectivds: List(),
        generatedText: 'the box'
    }),
    c:NP({
        id:'3', v:0, t:MD.NP,
        nound: noundExamples.c,
        definiteness: DefinitenessSelect.Indefinite,
        adjectivds: List(),
        generatedText: 'a fish'
    })

}

const vpExamples:Object = {
    a:VP({
        id:'1', v:0, t:MD.VP,
        verbd: verbdExamples.a,
        actionTime: ActionTimeSelect.Future,
        simple: true,
        perfect: false,
        progressive: false,
        generatedText: 'will eat'
    }),
    b:VP({
        id:'2', v:0, t:MD.VP,
        verbd: verbdExamples.b,
        actionTime: ActionTimeSelect.Past,
        simple: true,
        perfect: false,
        progressive: false,
        generatedText: 'talked'
    }),
    c:VP({
        id:'3', v:0, t:MD.VP,
        verbd: verbdExamples.c,
        actionTime: ActionTimeSelect.Present,
        simple: true,
        perfect: false,
        progressive: false,
        generatedText: 'hit'
    })

}

const clauseExamples:Object = {
    a:Clause({
        id:'1', v:0, t:MD.Clause,
        nt:NP(npExamples.a),
        vt:VP(vpExamples.a),
        generatedText:'apple will eat'
    }),
    b:Clause({
        id:'2', v:0, t:MD.Clause,
        nt:NP(npExamples.b),
        vt:VP(vpExamples.b),
        generatedText:'the box talked'
    }),
    c:Clause({
        id:'3', v:0, t:MD.Clause,
        nt:NP(npExamples.c),
        vt:VP(npExamples.c),
        generatedText:'a fish hit'
    }),
}

export {adjectivdExamples}
export {adverbdExamples}
export {conjunctiondExamples}
export {determinerdExamples}
export {noundExamples}
export {prepositiondExamples}
export {pronoundExamples}
export {verbdExamples}

export {adjectivdStoreStateExample}
export {adverbdStoreStateExample}
export {conjunctiondStoreStateExample}
export {determinerdStoreStateExample}
export {noundStoreStateExample}
export {prepositiondStoreStateExample}
export {pronoundStoreStateExample}
export {verbdStoreStateExample}

export {clauseExamples}
export {npExamples}
export {vpExamples}
