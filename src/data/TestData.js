// @flow
import Clause               from './clause/Clause'
import Nound                from './dictionary/nound/Nound'
import {PluralizationRule}  from './dictionary/nound/NoundConstants'
import Verbd                from './dictionary/verbd/Verbd'
import {PastTenseRule}      from './dictionary/verbd/VerbdConstants'
import NP                   from './np/NP'
import {DefinitenessSelect} from './np/NPConstants'
import VP                   from './vp/VP'
import {ActionTimeSelect}   from './vp/VPConstants'

// These examples contain pre-determined id in order to ease comparisons during testing.
// However, in order to properly use these examples, we must sometimes set the id to null
// to reflect actual usage of an insert operation.  Be aware the the first id starts at '1'.

const noundExamples = {
    a:Nound({
        id:'1', base: 'apple',  plural: 'apples', pluralization_rule: PluralizationRule.Append_s
    }),
    b:Nound({
        id:'2', base: 'box',    plural: 'boxes',  pluralization_rule: PluralizationRule.Append_es
    }),
    c:Nound({
        id:'3', base: 'fish',   plural: 'fish',   pluralization_rule: PluralizationRule.NoChange
    }),
    d:Nound({
        id:'4', base: 'person', plural: 'people', pluralization_rule: PluralizationRule.Irregular
    })
}

const npExamples = {
    a:NP({
        id:'1',
        nound: noundExamples.a,
        definiteness: DefinitenessSelect.NoneSelected,
        generatedText: 'apple'
    }),
    b:NP({
        id:'2',
        nound: noundExamples.b,
        definiteness: DefinitenessSelect.Definite,
        generatedText: 'the box'
    }),
    c:NP({
        id:'3',
        nound: noundExamples.c,
        definiteness: DefinitenessSelect.Indefinite,
        generatedText: 'a fish'
    })

}

const verbdExamples = {
    a:Verbd({
        id:'1', base: 'eat', pastTense: 'ate', pastTense_rule: PastTenseRule.Irregular
    }),
    b:Verbd({
        id:'2', base: 'talk', pastTense: 'talked', pastTense_Rule: PastTenseRule.Append_ed
    }),
    c:Verbd({
        id:'3', base: 'hit', pastTense: 'hit', pastTense_Rule: PastTenseRule.NoChange
    })
}

const vpExamples = {
    a:VP({
        id:'1',
        verbd: verbdExamples.a,
        actionTime: ActionTimeSelect.Future,
        generatedText: 'will eat'
    }),
    b:VP({
        id:'2',
        verbd: verbdExamples.b,
        actionTime: ActionTimeSelect.Past,
        generatedText: 'talked'
    }),
    c:VP({
        id:'3',
        verbd: verbdExamples.c,
        actionTime: ActionTimeSelect.Present,
        generatedText: 'hit'
    })

}

const clauseExamples = {
    a:Clause({
        id:'1',
        np:NP(npExamples.a),
        vp:VP(vpExamples.a),
        generatedText:'apple will eat'
    }),
    b:Clause({
        id:'2',
        np:NP(npExamples.b),
        vp:VP(vpExamples.b),
        generatedText:'the box talked'
    }),
    c:Clause({
        id:'3',
        np:NP(npExamples.c),
        vp:VP(npExamples.c),
        generatedText:'a fish hit'
    }),
}

export {clauseExamples}
export {noundExamples}
export {npExamples}
export {verbdExamples}
export {vpExamples}
