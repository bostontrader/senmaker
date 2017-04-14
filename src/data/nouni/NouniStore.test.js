import {Map} from 'immutable'

//import Counter             from './Counter'
//import Nouni               from './Nouni'
import NouniActionTypes     from './NouniActionTypes'
import {DefinitenessSelect} from './NouniConstants'
import NouniStore           from './NouniStore'
import NouniAEActionTypes   from './addedit/NouniAEActionTypes'
import AppActionTypes       from '../app/AppActionTypes'
import {PluralizationRule}  from '../dictionary/nound/NoundConstants'

describe('NouniStore', function() {

    beforeEach(function() {
        this.state = NouniStore.getInitialState()

        // This function gets a more readable form of the nouni that we can pass
        // to expect(). It strips away the id.
        this.nouns = () => Array.from(this.state.values()).map(nouni => ({
            nound: nouni.nound.toJSON(),
            definiteness: nouni.definiteness,
            generatedText: nouni.generatedText
        }))

        // This function is for setting up data, it will add all the nouni to the
        // state in a direct way.
        //this.addNouns = (nouns) => {
            //nouns.forEach(noun => {
                //const id = Counter.increment()
                //this.state = this.state.set(
                    //id,
                    //new Nouni({id, base: noun.base, plural: noun.plural, pluralization_rule: noun.pluralization_rule})
                //)
            //})
        //}
        
        // Because of how NouniStore is set up it's not easy to get access to ids of
        // nouni. This will get the id of a particular noun based on the index it
        // was added to state in.
        //this.id = (index) => {
            //if (this.state.size <= index) {
                //throw new Error(
                    //'Requested id for an index that is larger than the size of the ' +
                    //'current state.'
                //)
            //}
            //return Array.from(this.state.keys())[index]
        //}

        this.dispatch = action => {
            this.state = NouniStore.reduce(this.state, action)
        }
    })

    /*it('ON_APP_RESET', function() {
        const initialState = this.state

        // Now do anything, doesn't matter what, to change the initial state
        this.dispatch({
            type: NouniActionTypes.INSERT_NOUNI
            //nouni: {base: 'cat'}
        })
        expect(this.state).not.toBe(initialState)

        this.dispatch({type: AppActionTypes.ON_APP_RESET})
        expect(this.state).toBe(initialState)
    })*/

    /*it('ON_CLICK_DELETE_NOUNI', function() {
        expect(this.nouns()).toEqual([])
        this.addNouns([
            {base: 'apple', plural: 'apples', pluralization_rule: PluralizationRule.Append_s},
            {base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es},
            {base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s},
        ])

        this.dispatch({
            type: NouniAEActionTypes.ON_CLICK_DELETE_NOUNI,
            id: this.id(2),
        })

        expect(this.nouns()).toEqual([
            {base: 'apple', plural: 'apples', pluralization_rule: PluralizationRule.Append_s},
            {base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es}
        ])

        this.dispatch({
            type: NouniAEActionTypes.ON_CLICK_DELETE_NOUNI,
            id: this.id(0),
        })

        expect(this.nouns()).toEqual([
            {base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es}
        ])

        this.dispatch({
            type: NouniAEActionTypes.ON_CLICK_DELETE_NOUNI,
            id: this.id(0),
        })

        expect(this.nouns()).toEqual([])

    })*/

    it('ON_CLICK_SAVE_NOUNI, new nouni', function() {
        // We know that this is a new record because nouni has no id.
        expect(this.nouns()).toEqual([])

        this.dispatch({
            type: NouniAEActionTypes.ON_CLICK_SAVE_NOUNI,
            nouni: {
                nound: {id:'1', base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s},
                definiteness: DefinitenessSelect.Definite,
                generatedText: 'the cat'
            }
        })

        expect(this.nouns()).toEqual([{
            nound: {id:'1', base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s},
            definiteness: DefinitenessSelect.Definite,
            generatedText: 'the cat'
        }])

    })

    /*it('ON_CLICK_SAVE_NOUNI, edit nouni', function() {
        // We know that this is an update to an existing record because nouni has an id.
        expect(this.nouns()).toEqual([])
        this.dispatch({
            type: NouniActionTypes.INSERT_NOUNI,
            nouni: {base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s}
        })

        this.dispatch({
            type: NouniAEActionTypes.ON_CLICK_SAVE_NOUNI,
            nouni: Nouni({id: this.id(0), base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es})
        })

        expect(this.nouns()).toEqual([
            {base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es}
        ])
    })*/

    it('INSERT_NOUNI', function() {
        expect(this.nouns()).toEqual([])

        this.dispatch({
            type: NouniActionTypes.INSERT_NOUNI,
            nouni: {
                nound: {id:'1', base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s},
                definiteness: DefinitenessSelect.Definite,
                generatedText: 'the cat'
            }
        })

        expect(this.nouns()).toEqual([{
            nound: {id:'1', base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s},
            definiteness: DefinitenessSelect.Definite,
            generatedText: 'the cat'
        }])

        this.dispatch({
            type: NouniActionTypes.INSERT_NOUNI,
            nouni: {
                nound: {id:'2', base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es},
                definiteness: DefinitenessSelect.Indefinite,
                generatedText: 'a box'
            }
        })

        expect(this.nouns()).toEqual([
            {
                nound: {id:'1', base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s},
                definiteness: DefinitenessSelect.Definite,
                generatedText: 'the cat'
            },
            {
                nound: {id:'2', base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es},
                definiteness: DefinitenessSelect.Indefinite,
                generatedText: 'a box'
            }
        ])
    })
})
