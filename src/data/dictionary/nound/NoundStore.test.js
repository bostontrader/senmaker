import Counter from './Counter'
import Nound from './Nound'
import NoundActionTypes from './NoundActionTypes'
import NoundStore from './NoundStore'
import {PluralizationRule} from './NoundConstants'

import NoundAEActionTypes from './addedit/NoundAEActionTypes'

describe('NoundStore', function() {

    beforeEach(function() {
        // Always start with the initial state.
        this.state = NoundStore.getInitialState()

        // This function gets a more readable form of the nound that we can pass
        // to expect(). It strips away the id.
        this.nouns = () => Array.from(this.state.values()).map(noun => ({
            base: noun.base,
            plural: noun.plural,
            pluralization_rule: noun.pluralization_rule
        }))

        // This function is for setting up data, it will add all the nound to the
        // state in a direct way.
        this.addNouns = (nouns) => {
            nouns.forEach(noun => {
                const id = Counter.increment()
                this.state = this.state.set(
                    id,
                    new Nound({id, base: noun.base, plural: noun.plural, pluralization_rule: noun.pluralization_rule})
                )
            })
        }
        
        // Because of how NoundStore is set up it's not easy to get access to ids of
        // nound. This will get the id of a particular noun based on the index it
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
            this.state = NoundStore.reduce(this.state, action)
        }
    })

    it('ON_CLICK_DELETE_NOUND', function() {
        expect(this.nouns()).toEqual([])
        this.addNouns([
            {base: 'apple', plural: 'apples', pluralization_rule: PluralizationRule.Append_s},
            {base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es},
            {base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s},
        ])

        this.dispatch({
            type: NoundAEActionTypes.ON_CLICK_DELETE_NOUND,
            id: this.id(2),
        })

        expect(this.nouns()).toEqual([
            {base: 'apple', plural: 'apples', pluralization_rule: PluralizationRule.Append_s},
            {base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es}
        ])

        this.dispatch({
            type: NoundAEActionTypes.ON_CLICK_DELETE_NOUND,
            id: this.id(0),
        })

        expect(this.nouns()).toEqual([
            {base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es}
        ])

        this.dispatch({
            type: NoundAEActionTypes.ON_CLICK_DELETE_NOUND,
            id: this.id(0),
        })

        expect(this.nouns()).toEqual([])

    })

    it('ON_CLICK_SAVE_NOUND, new nound', function() {
        // We know that this is a new record because nound has no id.
        expect(this.nouns()).toEqual([])
        this.dispatch({
            type: NoundAEActionTypes.ON_CLICK_SAVE_NOUND,
            nound: {base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s}
        })
        expect(this.nouns()).toEqual([
            {base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s}
        ])
    })

    it('ON_CLICK_SAVE_NOUND, edit nound', function() {
        // We know that this is an update to an existing record because nound has an id.
        expect(this.nouns()).toEqual([])
        this.dispatch({
            type: NoundActionTypes.INSERT_NOUND,
            nound: {base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s}
        })

        this.dispatch({
            type: NoundAEActionTypes.ON_CLICK_SAVE_NOUND,
            nound: Nound({id: this.id(0), base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es})
        })

        expect(this.nouns()).toEqual([
            {base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es}
        ])
    })

    it('INSERT_NOUND', function() {
        expect(this.nouns()).toEqual([])

        this.dispatch({
            type: NoundActionTypes.INSERT_NOUND,
            nound: {base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s}
        })

        expect(this.nouns()).toEqual([
            {base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s}
        ])

        this.dispatch({
            type: NoundActionTypes.INSERT_NOUND,
            nound: {base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es}
        })

        expect(this.nouns()).toEqual([
            {base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s},
            {base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es}
        ])
    })
})
