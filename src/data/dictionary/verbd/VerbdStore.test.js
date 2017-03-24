//import Counter from './Counter'
//import Verbd from './Verbd'
import VerbdActionTypes from './VerbdActionTypes'
import VerbdStore from './VerbdStore'
import {PastTenseRule} from './VerbdConstants'

import VerbdAEActionTypes from './addedit/VerbdAEActionTypes'

describe('VerbdStore', function() {

    beforeEach(function() {
        // Always start with the initial state.
        this.state = VerbdStore.getInitialState()

        // This function gets a more readable form of the verbd that we can pass
        // to expect().
        this.verbs = () => Array.from(this.state.values()).map(verb => ({
            base: verb.base,
            pastTense: verb.pastTense,
            pastTense_rule: verb.pastTense_rule
        }))

        // This function is for setting up data, it will add all the verbd to the
        // state in a direct way.
        //this.addVerbs = (verbs) => {
        //verbs.forEach(verb => {
        //const id = Counter.increment()
        //this.state = this.state.set(
        //id,
        //new Verbd({id, base: verb.base, pastTense: verb.pastTense, pastTense_rule: verb.pastTense_rule})
        //)
        //})
        //}

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

        // This "dispatches" an action to our store. We can bypass the dispatcher
        // and just call the store's reduce function directly.
        this.dispatch = action => {
            this.state = VerbdStore.reduce(this.state, action)
        }
    })

    it('CLICK_SAVE_VERBD, new verbd', function() {
        // We know this is a new record because verbd has no id.
        this.dispatch({
            type: VerbdAEActionTypes.CLICK_SAVE_VERBD,
            verbd: {base: 'run', pastTense: 'ran', pastTense_rule: PastTenseRule.Irregular}
        })
        expect(this.verbs()).toEqual([
            {base: 'run', pastTense: 'ran', pastTense_rule: PastTenseRule.Irregular}
        ])
    })

    it('INSERT_VERBD', function() {
        expect(this.verbs()).toEqual([])

        this.dispatch({
            type: VerbdActionTypes.INSERT_VERBD,
            verbd: {base: 'run', pastTense: 'ran', pastTense_rule: PastTenseRule.Irregular}
        })

        expect(this.verbs()).toEqual([
            {base: 'run', pastTense: 'ran', pastTense_rule: PastTenseRule.Irregular}
        ])

        this.dispatch({
            type: VerbdActionTypes.INSERT_VERBD,
            verbd: {base: 'box', pastTense: 'boxes', pastTense_rule: PastTenseRule.Append_es}
        })

        expect(this.verbs()).toEqual([
            {base: 'run', pastTense: 'ran', pastTense_rule: PastTenseRule.Irregular},
            {base: 'box', pastTense: 'boxes', pastTense_rule: PastTenseRule.Append_es}
        ])
    })

    /*it('UPDATE_VERBD', function() {
     expect(this.verbs()).toEqual([])

     this.dispatch({
     type: VerbdActionTypes.INSERT_VERBD,
     verbd: {base: 'run', pastTense: 'ran', pastTense_rule: PastTenseRule.Irregular}
     })

     this.dispatch({
     type: VerbdActionTypes.UPDATE_VERBD,
     verb: Verbd({id: this.id(0), base: 'box', pastTense: 'boxes', pastTense_rule: PastTenseRule.Append_es})
     })

     expect(this.verbs()).toEqual([
     {base: 'box', pastTense: 'boxes', pastTense_rule: PastTenseRule.Append_es}
     ])

     })*/

    /*it('DELETE_VERBD', function() {
     this.addVerbs([
     {base: 'apple', pastTense: 'apples', pastTense_rule: PastTenseRule.Irregular},
     {base: 'box', pastTense: 'boxes', pastTense_rule: PastTenseRule.Append_es},
     {base: 'run', pastTense: 'ran', pastTense_rule: PastTenseRule.Irregular},
     ])

     this.dispatch({
     type: VerbdActionTypes.DELETE_VERBD,
     id: this.id(2),
     })

     expect(this.verbs()).toEqual([
     {base: 'apple', pastTense: 'apples', pastTense_rule: PastTenseRule.Irregular},
     {base: 'box', pastTense: 'boxes', pastTense_rule: PastTenseRule.Append_es}
     ])

     this.dispatch({
     type: VerbdActionTypes.DELETE_VERBD,
     id: this.id(0),
     })

     expect(this.verbs()).toEqual([
     {base: 'box', pastTense: 'boxes', pastTense_rule: PastTenseRule.Append_es}
     ])

     this.dispatch({
     type: VerbdActionTypes.DELETE_VERBD,
     id: this.id(0),
     })

     expect(this.verbs()).toEqual([])

     })*/

})






/*import Counter from './Counter'
import Verb from './Verbd'
import VerbActionTypes from './VerbdActionTypes'
import VerbStore from './VerbdStore'
import {PastTenseRule} from './VerbdConstants'

describe('VerbStore', function() {

    // Before each test case we set up some helper functions that makes the tests
    // easier to read. It's okay to have a fair amount of helper functions as long
    // as they make the tests simpler to read and write. Depending on the
    // complexity of your store it is perfectly reasonable to factor these out
    // into a separate `VerbTestHelpers.js` file that can be reused -- and then
    // you could write tests for the helpers too!
    beforeEach(function() {
        // Always start with the initial state.
        this.state = VerbStore.getInitialState()

        // This function gets a more readable form of the verbd that we can pass
        // to expect().
        this.verbs = () => Array.from(this.state.values()).map(verb => ({
            base: verb.base,
            pastTense: verb.pastTense,
            pastTense_rule: verb.pastTense_rule
        }))

        // This function is for setting up data, it will add all the verbd to the
        // state in a direct way.
        this.addVerbs = (verbs) => {
            verbs.forEach(verb => {
                const id = Counter.increment()
                this.state = this.state.set(
                    id,
                    new Verb({id, base: verb.base, pastTense: verb.pastTense, pastTense_rule: verb.pastTense_rule})
                )
            })
        }

        // Because of how VerbStore is set up it's not easy to get access to ids of
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

        // This "dispatches" an action to our store. We can bypass the dispatcher
        // and just call the store's reduce function directly.
        this.dispatch = action => {
            this.state = VerbStore.reduce(this.state, action)
        }
    })

    ///// Begin tests /////

    it('can insert multiple verbd', function() {
        expect(this.verbs()).toEqual([])

        this.dispatch({
            type: VerbActionTypes.INSERT_VERB,
            verb: {
                base: 'hit',
                pastTense: 'hit',
                pastTense_rule: PastTenseRule.NoChange
            }
        })

        expect(this.verbs()).toEqual([
            {base: 'hit', pastTense: 'hit', pastTense_rule: PastTenseRule.NoChange}
        ])

        this.dispatch({
            type: VerbActionTypes.INSERT_VERB,
            verb: {
                base: 'talk',
                pastTense: 'talked',
                pastTense_rule: PastTenseRule.Append_ed
            }
        })

        expect(this.verbs()).toEqual([
            {base: 'hit', pastTense: 'hit', pastTense_rule: PastTenseRule.NoChange},
            {base: 'talk', pastTense: 'talked', pastTense_rule: PastTenseRule.Append_ed}
        ])

        this.dispatch({
            type: VerbActionTypes.INSERT_VERB,
            verb: {
                base: 'eat',
                pastTense: 'ate',
                pastTense_rule: PastTenseRule.Irregular
            }
        })

        expect(this.verbs()).toEqual([
            {base: 'hit', pastTense: 'hit', pastTense_rule: PastTenseRule.NoChange},
            {base: 'talk', pastTense: 'talked', pastTense_rule: PastTenseRule.Append_ed},
            {base: 'eat', pastTense: 'ate', pastTense_rule: PastTenseRule.Irregular}
        ])
    })

    it('can delete a specific verb', function() {
        this.addVerbs([
            {base: 'hit', pastTense: 'hit', pastTense_rule: PastTenseRule.NoChange},
            {base: 'talk', pastTense: 'talked', pastTense_rule: PastTenseRule.Append_ed},
            {base: 'eat', pastTense: 'ate', pastTense_rule: PastTenseRule.Irregular}
        ])

        this.dispatch({
            type: VerbActionTypes.DELETE_VERB,
            id: this.id(2)
        })

        expect(this.verbs()).toEqual([
            {base: 'hit', pastTense: 'hit', pastTense_rule: PastTenseRule.NoChange},
            {base: 'talk', pastTense: 'talked', pastTense_rule: PastTenseRule.Append_ed}
        ])

        this.dispatch({
            type: VerbActionTypes.DELETE_VERB,
            id: this.id(0)
        })

        expect(this.verbs()).toEqual([
            {base: 'talk', pastTense: 'talked', pastTense_rule: PastTenseRule.Append_ed}
        ])

        this.dispatch({
            type: VerbActionTypes.DELETE_VERB,
            id: this.id(0)
        })

        expect(this.verbs()).toEqual([])
    })

})*/
