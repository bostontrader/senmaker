import Nound               from './Nound'
import NoundActionTypes    from './NoundActionTypes'
import NoundStore          from './NoundStore'
import {PluralizationRule} from './NoundConstants'
import AppActionTypes      from '../../app/AppActionTypes'

describe('NoundStore', function() {

    beforeEach(function() {
        this.state = NoundStore.getInitialState()

        // This function gets a more readable form of the nound that we can pass
        // to expect(). It strips away the id.
        this.nouns = () => Array.from(this.state.getIn(['coll']).values()).map(noun => ({
            base: noun.base,
            plural: noun.plural,
            pluralization_rule: noun.pluralization_rule
        }))

        // This function is for setting up data, it will add all the nound to the
        // state in a direct way.
        this.addNouns = (nouns) => {
            let id = 0
            nouns.forEach(noun => {
                this.state = this.state.setIn(['coll',id],
                    new Nound({id, base: noun.base, plural: noun.plural, pluralization_rule: noun.pluralization_rule})
                )
                id++
            })
        }
        
        // Because of how NoundStore is set up it's not easy to get access to ids of
        // nound. This will get the id of a particular noun based on the index it
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

        this.dispatch = action => {this.state = NoundStore.reduce(this.state, action)}

        this.example0 = {base: 'apple', plural: 'apples', pluralization_rule: PluralizationRule.Append_s}
        this.example1 = {base: 'box',   plural: 'boxes',  pluralization_rule: PluralizationRule.Append_es}
        this.example2 = {base: 'cat',   plural: 'cats',   pluralization_rule: PluralizationRule.Append_s}
    })

    it('ON_APP_RESET', function() {
        const initialState = this.state

        // Now do anything, doesn't matter what, to change the initial state
        this.dispatch({ 
            type: NoundActionTypes.INSERT_NOUND,
            nound: this.example0
        })
        expect(initialState).not.toBe(this.state)

        // Now reset the state
        this.dispatch({type: AppActionTypes.ON_APP_RESET})
        expect(initialState).toBe(this.state)
    })

    it('ON_CLICK_DELETE_NOUND', function() {
        expect(this.nouns()).toEqual([])
        this.addNouns([
            this.example0,
            this.example1,
            this.example2,
        ])

        this.dispatch({
            type: NoundActionTypes.ON_CLICK_DELETE_NOUND,
            id: this.id(2),
        })

        expect(this.nouns()).toEqual([
            this.example0,
            this.example1
        ])

        this.dispatch({
            type: NoundActionTypes.ON_CLICK_DELETE_NOUND,
            id: this.id(0),
        })

        expect(this.nouns()).toEqual([this.example1])

        this.dispatch({
            type: NoundActionTypes.ON_CLICK_DELETE_NOUND,
            id: this.id(0),
        })

        expect(this.nouns()).toEqual([])

    })

    it('ON_CLICK_SAVE_NOUND, new nound', function() {
        // We know that this is a new record because nound has no id.
        expect(this.nouns()).toEqual([])
        this.dispatch({
            type: NoundActionTypes.ON_CLICK_SAVE_NOUND,
            nound: this.example0
        })
        expect(this.nouns()).toEqual([this.example0])
    })

    it('ON_CLICK_SAVE_NOUND, edit nound', function() {
        // We know that this is an update to an existing record because nound has an id.
        expect(this.nouns()).toEqual([])
        this.dispatch({
            type: NoundActionTypes.INSERT_NOUND,
            nound: this.example0
        })

        this.dispatch({
            type: NoundActionTypes.ON_CLICK_SAVE_NOUND,
            nound: Nound({id: this.id(0), base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es})
        })

        expect(this.nouns()).toEqual([this.example1])
    })

    it('INSERT_NOUND', function() {
        expect(this.nouns()).toEqual([])

        this.dispatch({
            type: NoundActionTypes.INSERT_NOUND,
            nound: this.example0
        })

        expect(this.nouns()).toEqual([this.example0])

        this.dispatch({
            type: NoundActionTypes.INSERT_NOUND,
            nound: this.example1
        })

        expect(this.nouns()).toEqual([
            this.example0,
            this.example1
        ])
    })
})
