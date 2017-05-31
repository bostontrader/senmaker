import React from 'react'

import Intro           from '../views/syllabus/Intro'             //  0
import Nound           from '../views/syllabus/Nound'
import Definiteness    from '../views/syllabus/Definiteness'
import Phrase          from '../views/syllabus/Phrase'
import NounPhrase      from '../views/syllabus/NounPhrase'
import Adjectivd       from '../views/syllabus/Adjectivd'         //  5
import NPAdjective     from '../views/syllabus/NPAdjective'
import Verbd           from '../views/syllabus/Verbd'
import VerbConjugation from '../views/syllabus/VerbConjugation'
import PastForm        from '../views/syllabus/PastForm'
import VerbTime        from '../views/syllabus/VerbTime'          // 10
import VerbPhrase      from '../views/syllabus/VerbPhrase'
import Clause          from '../views/syllabus/Clause'
import Adverbd         from '../views/syllabus/Adverbd'
import Prepositiond    from '../views/syllabus/Prepositiond'
import Determinerd     from '../views/syllabus/Determinerd'
import Conjunctiond    from '../views/syllabus/Conjunctiond'
import Pronound        from '../views/syllabus/Pronound'

//import Aspect          from '../views/syllabus/Aspect'
//import Sentence        from '../views/syllabus/Sentence'
//import Pluralization   from '../views/syllabus/Pluralization'
//import VPAspect        from '../views/syllabus/VPAspect'

/**
 * We have a series of lessons that we want to progress through, in both directions, in a specific order.
 *
 * We also want to determine a "level".  That is, level 0 for the first lesson, level 1 for
 * the next lesson, and so on.
 *
 * We don't want to use a giant switch statement based on a numerical level.
 *
 * We want to be able to determine if we are presently at the first or last level. This
 * affects the lesson navigation UI.
 *
 * The basic choice is to figure out how to iterate, bi-directionally over some simple data structure
 * or to use a more slightly more complicated structure to implement a doubly-linked list.  I first attempted choice
 * the prior but got bogged down in code that was way too complicated for this simple and limited
 * application.  Hence my present doubly-linked list approach.
 * 
 */

// If you change these lessons be sure to review the initialState in AppStore
/*const syllabus = {
    intro:           {level: 0, comp:Intro,           prev:null,              next:'nound'},
    nound:           {level: 1, comp:Nound,           prev:'intro',           next:'definiteness'},
    definiteness:    {level: 2, comp:Definiteness,    prev:'nound',           next:'phrase'},
    phrase:          {level: 3, comp:Phrase,          prev:'definiteness',    next:'np'},
    np:              {level: 4, comp:NounPhrase,      prev:'phrase',          next:'adjectivd'},
    adjectivd:       {level: 5, comp:Adjectivd,       prev:'np',              next:'npAdjective'},
    npAdjective:     {level: 6, comp:NPAdjective,     prev:'adjectivd',       next:'verbd'},
    verbd:           {level: 7, comp:Verbd,           prev:'npAdjective',     next:'verbConjugation'},
    verbConjugation: {level: 8, comp:VerbConjugation, prev:'verbd',           next:'pastForm'},
    pastForm:        {level: 9, comp:PastForm,        prev:'verbConjugation', next:'verbTime'},
    verbTime:        {level:10, comp:VerbTime,        prev:'pastForm',        next:'vp'},
    vp:              {level:11, comp:VerbPhrase,      prev:'verbTime',        next:'clause'},
    clause:          {level:12, comp:Clause,          prev:'vp',              next:'adverbd'},
    adverbd:         {level:13, comp:Adverbd,         prev:'clause',          next:'prepositiond'},
    prepositiond:    {level:14, comp:Prepositiond,    prev:'adverbd',         next:null},

    //aspect:          {level:12, comp:Aspect,          prev:'verbPhrase',      next:'clause'},
    //sentence:        {level:14, comp:Sentence,        prev:'clause',          next:'pluralization'},
    //pluralization:   {level:15, comp:Pluralization,   prev:'sentence',        next:'vpAspect'},
    //vpAspect:        {level:16, comp:VPAspect,        prev:'pluralization',   next: null}
    // Adverbs as part of verb phrases

}*/

const syllabus = {
    intro:        {level: 0, comp: Intro,        prev: null,           next: 'adjectivd'},
    adjectivd:    {level: 1, comp: Adjectivd,    prev: 'intro',        next: 'adverbd'},
    adverbd:      {level: 2, comp: Adverbd,      prev: 'adjectivd',    next: 'conjunctiond'},
    conjunctiond: {level: 3, comp: Conjunctiond, prev: 'adverbd',      next: 'determinerd'},
    determinerd:  {level: 4, comp: Determinerd,  prev: 'conjunctiond', next: 'nound'},
    nound:        {level: 5, comp: Nound,        prev: 'determinerd',  next: 'prepositiond'},
    prepositiond: {level: 6, comp: Prepositiond, prev: 'nound',        next: 'pronound'},
    pronound:     {level: 7, comp: Pronound,     prev: 'prepositiond', next: 'verbd'},
    verbd:        {level: 8, comp: Verbd,        prev: 'pronound',     next: null}
}


export default syllabus
