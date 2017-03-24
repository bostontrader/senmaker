/**
 * What is the rule for transforming the base form of the verb into the past tense?
 */
const PastTenseRule = {
    'NoneSelected':100,
    'NoChange':101,
    'Append_ed':102,
    'Irregular':109
}

/**
The UI should generally adapt to a particular level.  Although we have a global app level,
it's not feasible to have all the UI components track this.  Instead, we maintain levels
of intermediate granularity.  Here we define the levels available for the VerbPanel component.
This level drives the level of all of the child components as well.
 */
const VerbdPanelLevel = {
    'BASE': 100,
    'PAST_TENSE': 200
}

export {PastTenseRule}
export {VerbdPanelLevel}
