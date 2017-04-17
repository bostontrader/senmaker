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
        this.verbs = () => Array.from(this.state.getIn(['coll']).values()).map(verb => ({
            base: verb.base,
            pastTense: verb.pastTense,
            pastTense_rule: verb.pastTense_rule
        }))

        // This function is for setting up data, it will add all the verbd to the
        // state in a direct way.
        this.addVerbs = (verbs) => {
            let id = 0
            verbs.forEach(verb => {
                this.state = this.state.setIn(['coll',id],
                    new Verbd({id, base: verb.base, pastTense: verb.pastTense, pastTense_rule: verb.pastTense_rule})
                )
                id++
            })
        }

        // Because of how VerbdStore is set up it's not easy to get access to ids of
        // verbd. This will get the id of a particular verb based on the index it
        // was added to state in.
        this.id = (index) => {
            if (this.state.getIn(['coll']).size <= index) {
                throw new Error(
                    'Requested id for an index that is larger than the size of the ' +
                    'current state.'
                )
            }
            return Array.from(this.state.getIn(['coll']).keys())[index]
        }
        
        this.dispatch = action => {this.state = VerbdStore.reduce(this.state, action)}

        this.example0 = {base: 'eat', pastTense: 'ate', pastTense_rule: PastTenseRule.Irregular}
        this.example1 = {base: 'run', pastTense: 'ran', pastTense_rule: PastTenseRule.NoChange}
        this.example2 = {base: 'talk', pastTense: 'talked', pastTense_rule: PastTenseRule.Append_ed}
    })

    it('ON_APP_RESET', function() {
        const initialState = this.state

        // Now do anything, doesn't matter what, to change the initial state
        this.dispatch({
            type: VerbdActionTypes.INSERT_VERBD,
            verbd: this.example0
        })
        expect(initialState).not.toBe(this.state)

        // Now reset the state
        this.dispatch({type: AppActionTypes.ON_APP_RESET})
        expect(initialState).toBe(this.state)
    })
    
    it('ON_CLICK_DELETE_VERBD', function() {
        expect(this.verbs()).toEqual([])
        this.addVerbs([
            this.example0,
            this.example1,
            this.example2,
        ])

        this.dispatch({
            type: VerbdActionTypes.ON_CLICK_DELETE_VERBD,
            id: this.id(2),
        })

        expect(this.verbs()).toEqual([
            this.example0,
            this.example1
        ])

        this.dispatch({
            type: VerbdActionTypes.ON_CLICK_DELETE_VERBD,
            id: this.id(0),
        })

        expect(this.verbs()).toEqual([this.example1])

        this.dispatch({
            type: VerbdActionTypes.ON_CLICK_DELETE_VERBD,
            id: this.id(0),
        })

        expect(this.verbs()).toEqual([])

    })

    it('ON_CLICK_SAVE_VERBD, new verbd', function() {
        // We know that this is a new record because verbd has no id.
        expect(this.verbs()).toEqual([])
        this.dispatch({
            type: VerbdActionTypes.ON_CLICK_SAVE_VERBD,
            verbd: this.example0
        })
        expect(this.verbs()).toEqual([this.example0])
    })

    it('ON_CLICK_SAVE_VERBD, edit verbd', function() {
        // We know that this is an update to an existing record because verbd has an id.
        expect(this.verbs()).toEqual([])
        this.dispatch({
            type: VerbdActionTypes.INSERT_VERBD,
            verbd: this.example0
        })

        this.dispatch({
            type: VerbdActionTypes.ON_CLICK_SAVE_VERBD,
            verbd: Verbd({id: this.id(0), base: 'run', pastTense: 'ran', pastTense_rule: PastTenseRule.NoChange})
        })
        expect(this.verbs()).toEqual([this.example1])
    })

    it('INSERT_VERBD', function() {
        expect(this.verbs()).toEqual([])

        this.dispatch({
            type: VerbdActionTypes.INSERT_VERBD,
            verbd: this.example0
        })

        expect(this.verbs()).toEqual([this.example0])

        this.dispatch({
            type: VerbdActionTypes.INSERT_VERBD,
            verbd: this.example1
        })

        expect(this.verbs()).toEqual([
            this.example0,
            this.example1
        ])
    })
})
