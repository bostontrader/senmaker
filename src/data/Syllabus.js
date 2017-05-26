import React from 'react'

import Intro           from '../views/syllabus/Intro'
import Nound           from '../views/syllabus/Nound'
import Definiteness    from '../views/syllabus/Definiteness'
import Phrase          from '../views/syllabus/Phrase'
import NounPhrase      from '../views/syllabus/NounPhrase'
import Adjectivd       from '../views/syllabus/Adjectivd'
import NPAdjective     from '../views/syllabus/NPAdjective'
import Verbd           from '../views/syllabus/Verbd'
import VerbConjugation from '../views/syllabus/VerbConjugation'
import PastForm        from '../views/syllabus/PastForm'
import VerbTime        from '../views/syllabus/VerbTime'
import VerbPhrase      from '../views/syllabus/VerbPhrase'

import Aspect          from '../views/syllabus/Aspect'
import Clause          from '../views/syllabus/Clause'
import Sentence        from '../views/syllabus/Sentence'
import Pluralization   from '../views/syllabus/Pluralization'
import VPAspect        from '../views/syllabus/VPAspect'

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
const syllabus = {
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
    clause:          {level:12, comp:Clause,          prev:'vp',              next:null},
    //aspect:          {level:12, comp:Aspect,          prev:'verbPhrase',      next:'clause'},
    //sentence:        {level:14, comp:Sentence,        prev:'clause',          next:'pluralization'},
    //pluralization:   {level:15, comp:Pluralization,   prev:'sentence',        next:'vpAspect'},
    //vpAspect:        {level:16, comp:VPAspect,        prev:'pluralization',   next: null}

    // Adverbs

    // Adverbs as part of verb phrases

}

export default syllabus
