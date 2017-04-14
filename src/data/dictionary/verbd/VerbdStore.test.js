import VerbdAEActionTypes from './addedit/VerbdAEActionTypes'
import Verbd              from './Verbd'
import VerbdActionTypes   from './VerbdActionTypes'
import VerbdStore         from './VerbdStore'
import {PastTenseRule}    from './VerbdConstants'
import AppActionTypes     from '../../app/AppActionTypes'

describe('VerbdStore', function() {

    beforeEach(function() {
        this.state = VerbdStore.getInitialState()

        // This function gets a more readable form of the verbd that we can pass
        // to expect(). It strips away the id.
        this.verbs = () => Array.from(this.state.values()).map(verb => ({
            base: verb.base,
            pastTense: verb.pastTense,
            pastTense_rule: verb.pastTense_rule
        }))

        // This function is for setting up data, it will add all the verbd to the
        // state in a direct way.
        this.addVerbs = (verbs) => {
            let id = 1
            verbs.forEach(verb => {
                this.state = this.state.set(
                    id++,
                    new Verbd({id, base: verb.base, pastTense: verb.pastTense, pastTense_rule: verb.pastTense_rule})
                )
            })
        }

        // Because of how VerbdStore is set up it's not easy to get access to ids of
        // verbd. This will get the id of a particular verb based on the index it
        // was added to state in.
        this.id = (index) => {
            if (this.state.size <= index) {
                throw new Error(
                    'Requested id for an index that is larger than the size of the ' +
                    'current state.'
                )
            }
            return Array.from(this.state.keys())[index]
        }
        
        this.dispatch = action => {
            this.state = VerbdStore.reduce(this.state, action)
        }
    })

    it('ON_APP_RESET', function() {
        const initialState = this.state

        // Now do anything, doesn't matter what, to change the initial state
        this.dispatch({
            type: VerbdActionTypes.INSERT_VERBD,
            verbd: {base: 'eat', pastTense: 'ate', pastTense_rule: PastTenseRule.Irregular}
        })
        expect(initialState).not.toBe(this.state)

        // Now reset the state
        this.dispatch({
            type: AppActionTypes.ON_APP_RESET
        })
        expect(initialState).toBe(this.state)
    })
    
    it('ON_CLICK_DELETE_VERBD', function() {
        expect(this.verbs()).toEqual([])
        this.addVerbs([
            {base: 'eat', pastTense: 'ate', pastTense_rule: PastTenseRule.Irregular},
            {base: 'talk', pastTense: 'talked', pastTense_rule: PastTenseRule.Append_ed},
            {base: 'run', pastTense: 'ran', pastTense_rule: PastTenseRule.NoChange},
        ])

        this.dispatch({
            type: VerbdAEActionTypes.ON_CLICK_DELETE_VERBD,
            id: this.id(2),
        })

        expect(this.verbs()).toEqual([
            {base: 'eat', pastTense: 'ate', pastTense_rule: PastTenseRule.Irregular},
            {base: 'talk', pastTense: 'talked', pastTense_rule: PastTenseRule.Append_ed}
        ])

        this.dispatch({
            type: VerbdAEActionTypes.ON_CLICK_DELETE_VERBD,
            id: this.id(0),
        })

        expect(this.verbs()).toEqual([
            {base: 'talk', pastTense: 'talked', pastTense_rule: PastTenseRule.Append_ed}
        ])

        this.dispatch({
            type: VerbdAEActionTypes.ON_CLICK_DELETE_VERBD,
            id: this.id(0),
        })

        expect(this.verbs()).toEqual([])

    })

    it('ON_CLICK_SAVE_VERBD, new verbd', function() {
        // We know that this is a new record because verbd has no id.
        expect(this.verbs()).toEqual([])
        this.dispatch({
            type: VerbdAEActionTypes.ON_CLICK_SAVE_VERBD,
            verbd: {base: 'eat', pastTense: 'ate', pastTense_rule: PastTenseRule.Irregular}
        })
        expect(this.verbs()).toEqual([
            {base: 'eat', pastTense: 'ate', pastTense_rule: PastTenseRule.Irregular}
        ])
    })

    it('ON_CLICK_SAVE_VERBD, edit verbd', function() {
        // We know that this is an update to an existing record because verbd has an id.
        expect(this.verbs()).toEqual([])
        this.dispatch({
            type: VerbdActionTypes.INSERT_VERBD,
            verbd: {base: 'run', pastTense: 'ran', pastTense_rule: PastTenseRule.Irregular}
        })

        this.dispatch({
            type: VerbdAEActionTypes.ON_CLICK_SAVE_VERBD,
            verbd: Verbd({id: this.id(0), base: 'talk', pastTense: 'talked', pastTense_rule: PastTenseRule.Append_ed})
        })

        expect(this.verbs()).toEqual([
            {base: 'talk', pastTense: 'talked', pastTense_rule: PastTenseRule.Append_ed}
        ])
    })

    it('INSERT_VERBD', function() {
        expect(this.verbs()).toEqual([])

        this.dispatch({
            type: VerbdActionTypes.INSERT_VERBD,
            verbd: {base: 'talk', pastTense: 'talked', pastTense_rule: PastTenseRule.Append_ed}
        })

        expect(this.verbs()).toEqual([
            {base: 'talk', pastTense: 'talked', pastTense_rule: PastTenseRule.Append_ed}
        ])

        this.dispatch({
            type: VerbdActionTypes.INSERT_VERBD,
            verbd: {base: 'run', pastTense: 'ran', pastTense_rule: PastTenseRule.Irregular}
        })

        expect(this.verbs()).toEqual([
            {base: 'talk', pastTense: 'talked', pastTense_rule: PastTenseRule.Append_ed},
            {base: 'run', pastTense: 'ran', pastTense_rule: PastTenseRule.Irregular}
        ])
    })
})
