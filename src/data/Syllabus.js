import React from 'react'

import Intro           from '../views/syllabus/Intro'
import Nound           from '../views/syllabus/Nound'
import Verbd           from '../views/syllabus/Verbd'
import Adjectivd       from '../views/syllabus/Adjectivd'
import Definiteness    from '../views/syllabus/Definiteness'
import Phrase          from '../views/syllabus/Phrase'
import NounPhrase      from '../views/syllabus/NounPhrase'
import VerbConjugation from '../views/syllabus/VerbConjugation'
import PastForm        from '../views/syllabus/PastForm'
import Tense           from '../views/syllabus/Tense'
import Aspect          from '../views/syllabus/Aspect'
import VerbPhrase      from '../views/syllabus/VerbPhrase'
import Clause          from '../views/syllabus/Clause'
import Sentence        from '../views/syllabus/Sentence'
import Pluralization   from '../views/syllabus/Pluralization'
import NPAdjective     from '../views/syllabus/NPAdjective'
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
    phrase:          {level: 3, comp:Phrase,          prev:'definiteness',    next:'nounPhrase'},
    nounPhrase:      {level: 4, comp:NounPhrase,      prev:'phrase',          next:null}
    //adjectivd:       {level: 5, comp:Adjectivd,       prev:'nounPhrase',      next:'npAdjective'},
    //npAdjective:     {level: 6, comp:NPAdjective,     prev:'adjectivd',       next:'verbd'},
    //verbd:           {level: 7, comp:Verbd,           prev:'npAdjective',     next:'verbConjugation'},
    //verbConjugation: {level: 8, comp:VerbConjugation, prev:'verbd',           next:'pastForm'},
    //pastForm:        {level: 9, comp:PastForm,        prev:'verbConjugation', next:'tense'},
    //tense:           {level:10, comp:Tense,           prev:'pastForm',        next:'verbPhrase'},
    //verbPhrase:      {level:11, comp:VerbPhrase,      prev:'tense',           next:'aspect'},
    //aspect:          {level:12, comp:Aspect,          prev:'verbPhrase',      next:'clause'},
    //clause:          {level:13, comp:Clause,          prev:'aspect',          next:'sentence'},
    //sentence:        {level:14, comp:Sentence,        prev:'clause',          next:'pluralization'},
    //pluralization:   {level:15, comp:Pluralization,   prev:'sentence',        next:'vpAspect'},
    //vpAspect:        {level:16, comp:VPAspect,        prev:'pluralization',   next: null}

    // Adverbs

    // Adverbs as part of verb phrases

}

export default syllabus
