// @flow
import {List} from 'immutable'
import {Map}  from 'immutable'

import {MD}                 from './SchemaConstants'
import Clause               from './clause/Clause'
import Adjectivd            from './dictionary/adjectivd/Adjectivd'
import AdjectivdStoreState  from './dictionary/adjectivd/AdjectivdStoreState'
import Adverbd              from './dictionary/adverbd/Adverbd'
import Conjunctiond         from './dictionary/conjunctiond/Conjunctiond'
import Determinerd          from './dictionary/determinerd/Determinerd'
import Nound                from './dictionary/nound/Nound'
import Prepositiond         from './dictionary/prepositiond/Prepositiond'
import Pronound             from './dictionary/pronound/Pronound'
import Verbd                from './dictionary/verbd/Verbd'
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
    a:Adverbd({id:'1', v:0, t:MD.Adv, base: 'quickly'}),
    b:Adverbd({id:'2', v:0, t:MD.Adv, base: 'stupidly'}),
    c:Adverbd({id:'3', v:0, t:MD.Adv, base: 'darkly'})
}

const conjunctiondExamples:Object = {
    a:Conjunctiond({id:'1', v:0, t:MD.Conj, base: 'and'}),
    b:Conjunctiond({id:'2', v:0, t:MD.Conj, base: 'but'}),
    c:Conjunctiond({id:'3', v:0, t:MD.Conj, base: 'so'})
}

const determinerdExamples:Object = {
    a:Determinerd({id:'1', v:0, t:MD.Det, base: 'the'}),
    b:Determinerd({id:'2', v:0, t:MD.Det, base: 'his'}),
    c:Determinerd({id:'3', v:0, t:MD.Det, base: 'some'})
}

const noundExamples:Object = {
    a:Nound({id:'1', base: 'apple',  plural: 'apples'}),
    b:Nound({id:'2', base: 'box',    plural: 'boxes'}),
    c:Nound({id:'3', base: 'fish',   plural: 'fish'}),
    d:Nound({id:'4', base: 'person', plural: 'people'})
}

const pronoundExamples:Object = {
    a:Pronound({id:'1', v:0, t:MD.Pro, base: 'i'}),
    b:Pronound({id:'2', v:0, t:MD.Pro, base: 'you'}),
    c:Pronound({id:'3', v:0, t:MD.Pro, base: 'he'})
}

const prepositiondExamples:Object = {
    a:Prepositiond({id:'1', v:0, t:MD.Pre, base: 'quickly'}),
    b:Prepositiond({id:'2', v:0, t:MD.Pre, base: 'stupidly'}),
    c:Prepositiond({id:'3', v:0, t:MD.Pre, base: 'darkly'})
}

const verbdExamples:Object = {
    a:Verbd({
        id:'1', v:0, t:MD.V,
        base: 'eat',
        pastForm: 'ate',
        aspectOrSimple: AspectOrSimple.Simple,
        aspect: []
    }),
    b:Verbd({
        id:'2', v:0, t:MD.V,
        base: 'talk',
        pastForm: 'talked',
        aspectOrSimple: AspectOrSimple.Simple,
        aspect: []
    }),
    c:Verbd({
        id:'3', v:0, t:MD.V,
        base: 'hit',
        pastForm: 'hit',
        aspectOrSimple: AspectOrSimple.Simple,
        aspect: []
    })
}

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

export {clauseExamples}
export {npExamples}
export {vpExamples}
