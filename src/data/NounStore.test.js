import Counter from './Counter'
import Noun from './Noun'
import NounActionTypes from './NounActionTypes'
import NounStore from './NounStore'

describe('NounStore', () => {

    beforeEach(function() {
        // Always start with the initial state.
        this.state = NounStore.getInitialState()

        // This function gets a more readable form of the nouns that we can pass
        // to expect().
        this.nouns = () => Array.from(this.state.values()).map(noun => ({
            base: noun.base, plural: noun.plural
        }))

        // This function is for setting up data, it will add all the nouns to the
        // state in a direct way.
        this.addNouns = (nouns) => {
            nouns.forEach(noun => {
                const id = Counter.increment();
                this.state = this.state.set(
                    id,
                    new Noun({id, base: noun.base, plural: noun.plural})
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

    it('can add multiple nouns', function() {
        expect(this.nouns()).toEqual([])

        this.dispatch({
            type: NounActionTypes.ADD_NOUN,
            base: 'test0'
        })

        expect(this.nouns()).toEqual([
            {base: 'test0', plural:false}
        ])

        this.dispatch({
            type: NounActionTypes.ADD_NOUN,
            base: 'test1'
        })

        expect(this.nouns()).toEqual([
            {base: 'test0', plural:false},
            {base: 'test1', plural:false}
        ])
    })

})

