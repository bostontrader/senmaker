import Counter from './Counter'
import Verb from './Verb'
import VerbActionTypes from './VerbActionTypes'
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
            pluralization_rule: verb.pluralization_rule
            //text: verb.text,
            //complete: !!verb.complete,
        }))

        // This function is for setting up data, it will add all the verbs to the
        // state in a direct way.
        this.addVerbs = (verbs) => {
            verbs.forEach(verb => {
                const id = Counter.increment()
                this.state = this.state.set(
                    id,
                    //new Verb({id, text: verb.text, complete: !!verb.complete}),
                    new Verb({id, base: verb.base, pluralization_rule: verb.pluralization_rule})
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
                base: 'cat',
                pluralization_rule: 0
            }
        })

        expect(this.verbs()).toEqual([
            {base: 'cat', pluralization_rule: 0}
        ])

        this.dispatch({
            type: VerbActionTypes.INSERT_VERB,
            verb: {
                base: 'box',
                pluralization_rule: 1
            }
        })

        expect(this.verbs()).toEqual([
            {base: 'cat', pluralization_rule: 0},
            {base: 'box', pluralization_rule: 1}
        ])
    })

    it('can delete a specific verb', function() {
        this.addVerbs([
            {base: 'apple', pluralization_rule: 0},
            {base: 'box', pluralization_rule: 1},
            {base: 'cat', pluralization_rule: 0},
        ])

        this.dispatch({
            type: VerbActionTypes.DELETE_VERB,
            id: this.id(2),
        })

        expect(this.verbs()).toEqual([
            {base: 'apple', pluralization_rule: 0},
            {base: 'box', pluralization_rule: 1}
        ])

        this.dispatch({
            type: VerbActionTypes.DELETE_VERB,
            id: this.id(0),
        })

        expect(this.verbs()).toEqual([
            {base: 'box', pluralization_rule: 1}
        ])
    })

})

