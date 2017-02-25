import Counter from './Counter'
import Verb from './Verb'
import VerbActionTypes from './VerbActionTypes'
import VerbConstants from './VerbConstants'
import VerbStore from './VerbStore'

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

        // This function gets a more readable form of the verbs that we can pass
        // to expect().
        this.verbs = () => Array.from(this.state.values()).map(verb => ({
            base: verb.base,
            pastTense: verb.pastTense,
            pastTense_rule: verb.pastTense_rule
        }))

        // This function is for setting up data, it will add all the verbs to the
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
        // verbs. This will get the id of a particular verb based on the index it
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

    it('can insert multiple verbs', function() {
        expect(this.verbs()).toEqual([])

        this.dispatch({
            type: VerbActionTypes.INSERT_VERB,
            verb: {
                base: 'hit',
                pastTense: 'hit',
                pastTense_rule: VerbConstants.pastTense_NoChange
            }
        })

        expect(this.verbs()).toEqual([
            {base: 'hit', pastTense: 'hit', pastTense_rule: VerbConstants.pastTense_NoChange}
        ])

        this.dispatch({
            type: VerbActionTypes.INSERT_VERB,
            verb: {
                base: 'talk',
                pastTense: 'talked',
                pastTense_rule: VerbConstants.pastTense_Append_ed
            }
        })

        expect(this.verbs()).toEqual([
            {base: 'hit', pastTense: 'hit', pastTense_rule: VerbConstants.pastTense_NoChange},
            {base: 'talk', pastTense: 'talked', pastTense_rule: VerbConstants.pastTense_Append_ed}
        ])

        this.dispatch({
            type: VerbActionTypes.INSERT_VERB,
            verb: {
                base: 'eat',
                pastTense: 'ate',
                pastTense_rule: VerbConstants.pastTense_Irregular
            }
        })

        expect(this.verbs()).toEqual([
            {base: 'hit', pastTense: 'hit', pastTense_rule: VerbConstants.pastTense_NoChange},
            {base: 'talk', pastTense: 'talked', pastTense_rule: VerbConstants.pastTense_Append_ed},
            {base: 'eat', pastTense: 'ate', pastTense_rule: VerbConstants.pastTense_Irregular}
        ])
    })

    it('can delete a specific verb', function() {
        this.addVerbs([
            {base: 'hit', pastTense: 'hit', pastTense_rule: VerbConstants.pastTense_NoChange},
            {base: 'talk', pastTense: 'talked', pastTense_rule: VerbConstants.pastTense_Append_ed},
            {base: 'eat', pastTense: 'ate', pastTense_rule: VerbConstants.pastTense_Irregular}
        ])

        this.dispatch({
            type: VerbActionTypes.DELETE_VERB,
            id: this.id(2)
        })

        expect(this.verbs()).toEqual([
            {base: 'hit', pastTense: 'hit', pastTense_rule: VerbConstants.pastTense_NoChange},
            {base: 'talk', pastTense: 'talked', pastTense_rule: VerbConstants.pastTense_Append_ed}
        ])

        this.dispatch({
            type: VerbActionTypes.DELETE_VERB,
            id: this.id(0)
        })

        expect(this.verbs()).toEqual([
            {base: 'talk', pastTense: 'talked', pastTense_rule: VerbConstants.pastTense_Append_ed}
        ])

        this.dispatch({
            type: VerbActionTypes.DELETE_VERB,
            id: this.id(0)
        })

        expect(this.verbs()).toEqual([])
    })

})
