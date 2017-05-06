// @flow
/**
 * What is the rule for transforming the base form of the verb into the past tense?
 */
const PastTenseRule:Object = {
    'NoneSelected':0,
    'NoChange':  101,
    'Append_ed': 102,
    'Irregular': 109
}

const ActionTime:Object = {
    'NoneSelected':0,
    'Past':      100,
    'Present':   200,
    'Future':    300
}


/*
Aspect and AspectOrSimple work together and must be configured consistently.

The verb can either be:

 AspectOrSimple.Simple -or-
 AspectOrSimple.Aspect -and- at least one and possibly both of Aspect.Perfect and Aspect.Continuous.
*/

const Aspect:Object = {
    'Perfect'   : 100,
    'Continuous': 200
}

const AspectOrSimple = {
    'Simple': 100,  // default
    'Aspect': 200
}


/**
The UI should generally adapt to a particular level.  Although we have a global app level,
it's not feasible to have all the UI components track this.  Instead, we maintain levels
of intermediate granularity.  Here we define the levels available for the VerbPanel component.
This level drives the level of all of the child components as well.
 */
const VerbdPanelLevel:Object = {
    'BASE':       100,
    'PAST_TENSE': 200,
    'MAX':        999
}

export {ActionTime}
export {Aspect}
export {AspectOrSimple}
export {PastTenseRule}
export {VerbdPanelLevel}
