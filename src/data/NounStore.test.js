import Counter from './Counter'
import Noun from './Noun'
import NounActionTypes from './NounActionTypes'
import NounStore from './NounStore'

describe('NounStore', function() {

    // Before each test case we set up some helper functions that makes the tests
    // easier to read. It's okay to have a fair amount of helper functions as long
    // as they make the tests simpler to read and write. Depending on the
    // complexity of your store it is perfectly reasonable to factor these out
    // into a separate `NounTestHelpers.js` file that can be reused -- and then
    // you could write tests for the helpers too!
    beforeEach(function() {
        // Always start with the initial state.
        this.state = NounStore.getInitialState()

        // This function gets a more readable form of the nouns that we can pass
        // to expect().
        this.nouns = () => Array.from(this.state.values()).map(noun => ({
            base: noun.base,
            pluralization_rule: noun.pluralization_rule
            //text: noun.text,
            //complete: !!noun.complete,
        }))

        // This function is for setting up data, it will add all the nouns to the
        // state in a direct way.
        this.addNouns = (nouns) => {
            nouns.forEach(noun => {
                const id = Counter.increment()
                this.state = this.state.set(
                    id,
                    //new Noun({id, text: noun.text, complete: !!noun.complete}),
                    new Noun({id, base: noun.base, pluralization_rule: noun.pluralization_rule})
                )
            })
        }

        // Because of how NounStore is set up it's not easy to get access to ids of
        // nouns. This will get the id of a particular noun based on the index it
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
            this.state = NounStore.reduce(this.state, action)
        }
    })

    ///// Begin tests /////

    it('can insert multiple nouns', function() {
        expect(this.nouns()).toEqual([])

        this.dispatch({
            type: NounActionTypes.INSERT_NOUN,
            noun: {
                base: 'cat',
                pluralization_rule: 0
            }
        })

        expect(this.nouns()).toEqual([
            {base: 'cat', pluralization_rule: 0}
        ])

        this.dispatch({
            type: NounActionTypes.INSERT_NOUN,
            noun: {
                base: 'box',
                pluralization_rule: 1
            }
        })

        expect(this.nouns()).toEqual([
            {base: 'cat', pluralization_rule: 0},
            {base: 'box', pluralization_rule: 1}
        ])
    })

    it('can delete a specific noun', function() {
        this.addNouns([
            {base: 'apple', pluralization_rule: 0},
            {base: 'box', pluralization_rule: 1},
            {base: 'cat', pluralization_rule: 0},
        ])

        this.dispatch({
            type: NounActionTypes.DELETE_NOUN,
            id: this.id(2),
        })

        expect(this.nouns()).toEqual([
            {base: 'apple', pluralization_rule: 0},
            {base: 'box', pluralization_rule: 1}
        ])

        this.dispatch({
            type: NounActionTypes.DELETE_NOUN,
            id: this.id(0),
        })

        expect(this.nouns()).toEqual([
            {base: 'box', pluralization_rule: 1}
        ])
    })

})

