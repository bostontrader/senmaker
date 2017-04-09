import React from 'react'

import Intro        from '../../views/syllabus/Intro'
import Nound        from '../../views/syllabus/Nound'
import Verbd        from '../../views/syllabus/Verbd'
import Adjectivd    from '../../views/syllabus/Adjectivd'
import Definiteness from '../../views/syllabus/Definiteness'
import Phrases      from '../../views/syllabus/Phrases'
import NounPhrases  from '../../views/syllabus/NounPhrases'

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

// comp = component, prev = previous, next = next
const syllabus = {
    intro:        {comp:Intro,        prev:null,           next:'nound'},
    nound:        {comp:Nound,        prev:'intro',        next:'verbd'},
    verbd:        {comp:Verbd,        prev:'nound',        next:'adjectivd'},
    adjectivd:    {comp:Adjectivd,    prev:'verbd',        next:'definiteness'},
    definiteness: {comp:Definiteness, prev:'adjectivd',    next:'phrases'},
    phrases:      {comp:Phrases,      prev:'definiteness', next:'nounPhrases'},
    nounPhrases:  {comp:NounPhrases,  prev:'phrases',      next:null},

    // pluralization
    // past tense
    // adjectives in noun phrases

    // Adverbs

    // Adverbs as part of verb phrases

    // Clause.  A clause has a noun phrase and a verb phrase.
    // go ahead an make a noun phrase and a verb phrase.

    // Sentence. A sentence can have many clauses, or it may just have a single clause.
}

export default syllabus
