// @flow
/**
 * What is the rule for transforming the base form of the verb into the plural?
 */
const PluralizationRule = {
    'NoneSelected': 0,
    'NoChange':   101,
    'Append_s':   102,
    'Append_es':  103,
    'Irregular':  109
}

/**
 The UI should generally adapt to a particular level.  Although we have a global app level,
 it's not feasible to have all the UI components track this because: the order of and composition
 of components in the level is likely to change, and it will quickly become not-obvious which level
 should be the threshold for UI changes.

 Instead, we maintain levels
 of intermediate granularity.  Here we define the levels available for the NoundPanel component.
 This level drives the level of all of the child components as well.
 */
const NoundPanelLevel = {
    'BASE':          100,
    'PLURALIZATION': 200
}

export {PluralizationRule}
export {NoundPanelLevel}
