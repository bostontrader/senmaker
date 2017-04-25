import React from 'react'

import Intro        from '../views/syllabus/Intro'
import Nound        from '../views/syllabus/Nound'
import Verbd        from '../views/syllabus/Verbd'
import Adjectivd    from '../views/syllabus/Adjectivd'
import Definiteness from '../views/syllabus/Definiteness'
import Phrase       from '../views/syllabus/Phrase'
import NounPhrase   from '../views/syllabus/NounPhrase'
import PastTense    from '../views/syllabus/PastTense'
import VerbPhrase   from '../views/syllabus/VerbPhrase'
import Clause       from '../views/syllabus/Clause'
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

const syllabus = {
    intro:        {level:0, comp:Intro,        prev:null,           next:'nound'},
    nound:        {level:1, comp:Nound,        prev:'intro',        next:'verbd'},
    verbd:        {level:2, comp:Verbd,        prev:'nound',        next:'adjectivd'},
    adjectivd:    {level:3, comp:Adjectivd,    prev:'verbd',        next:'definiteness'},
    definiteness: {level:4, comp:Definiteness, prev:'adjectivd',    next:'phrase'},
    phrase:       {level:5, comp:Phrase,       prev:'definiteness', next:'nounPhrase'},
    nounPhrase:   {level:6, comp:NounPhrase,   prev:'phrase',       next:'pastTense'},
    pastTense:    {level:7, comp:PastTense,    prev:'nounPhrase',   next:'verbPhrase'},
    verbPhrase:   {level:8, comp:VerbPhrase,   prev:'pastTense',    next:'clause'},
    clause:       {level:9, comp:Clause,       prev:'verbPhrase',   next:null},

    // verbPhrases
    // clauses


    // pluralization
    // adjectives in noun phrases

    // Adverbs

    // Adverbs as part of verb phrases

    // Clause.  A clause has a noun phrase and a verb phrase.
    // go ahead an make a noun phrase and a verb phrase.

    // Sentence. A sentence can have many clauses, or it may just have a single clause.
}

export default syllabus
