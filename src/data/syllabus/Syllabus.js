import React from 'react'

import Intro from '../../views/syllabus/Intro'
import Nound from '../../views/syllabus/Nound'
import Verbd from '../../views/syllabus/Verbd'

/**
 * We have a series of lessons that we want to progress through in a specific order.
 *
 * We also want to determine a "level".  That is, level 0 for the first lesson, level 1 for
 * the next lesson, and so on.
 *
 * We don't want to use a giant switch statement based on a numerical level.
 *
 * We want to be able to determine if we are presently at the first or last level. This
 * affects the lesson navigation UI.
 *
 */

const syllabus = {
    intro:Intro,
    nound:Nound,
    verbd:Verbd,
    //definiteness:<Level03 {...props} />
    // phrase
    // noun phrase
    // pluralization
    // past tense
    // adjectives
    // adjectives in noun phrases

    // Adverbs

    // Adverbs as part of verb phrases

    // Clause.  A clause has a noun phrase and a verb phrase.
    // go ahead an make a noun phrase and a verb phrase.

    // Sentence. A sentence can have many clauses, or it may just have a single clause.
}

export default syllabus
