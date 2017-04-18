import Nouni                from './Nouni'
import NouniActionTypes     from './NouniActionTypes'
import {DefinitenessSelect} from './NouniConstants'
import NouniStore           from './NouniStore'
import AppActionTypes       from '../app/AppActionTypes'
import Nound                from '../dictionary/nound/Nound'
import {PluralizationRule}  from '../dictionary/nound/NoundConstants'

describe('NouniStore', function() {

    beforeEach(function() {
        this.state = NouniStore.getInitialState()

        // This function gets a more readable form of the nouni that we can pass
        // to expect(). It strips away the id.
        this.nouns = () => Array.from(this.state.getIn(['coll']).values()).map(nouni => ({
            nound: nouni.nound.toJSON(),
            definiteness: nouni.definiteness,
            generatedText: nouni.generatedText
        }))

        // This function is for setting up data, it will add all the nouni to the
        // state in a direct way.
        this.addNouns = (nouns) => {
            let id = 0
            nouns.forEach(noun => {
                const nound = Nound(noun.nound)
                this.state = this.state.setIn(['coll',id],
                    new Nouni({id, nound: nound, definiteness: noun.definiteness, generatedText: noun.generatedText})
                )
                id++
            })
        }
        
        // Because of how NouniStore is set up it's not easy to get access to ids of
        // nouni. This will get the id of a particular noun based on the index it
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

        this.dispatch = action => {this.state = NouniStore.reduce(this.state, action)}

        this.example0 = {
            nound: {id:'1', base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s},
            definiteness: DefinitenessSelect.Definite,
            generatedText: 'the cat'
        }
        this.example1 = {
            nound: {id:'2', base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es},
            definiteness: DefinitenessSelect.Indefinite,
            generatedText: 'a box'
        }
        this.example2 = {
            nound: {id:'3', base: 'fish', plural: 'fish', pluralization_rule: PluralizationRule.NoChange},
            definiteness: DefinitenessSelect.Definite,
            generatedText: 'the fish'
        }
    })

    it('ON_APP_RESET', function() {
        const initialState = this.state

        // Now do anything, doesn't matter what, to change the initial state
        this.dispatch({
            type: NouniActionTypes.INSERT_NOUNI,
            nouni: this.example0
        })
        expect(initialState).not.toBe(this.state)

        this.dispatch({type: AppActionTypes.ON_APP_RESET})
        expect(initialState).toBe(this.state)
    })

    it('ON_CLICK_DELETE_NOUNI', function() {
        expect(this.nouns()).toEqual([])
        this.addNouns([
            this.example0,
            this.example1,
            this.example2,
        ])

        this.dispatch({
            type: NouniActionTypes.ON_CLICK_DELETE_NOUNI,
            id: this.id(2),
        })

        expect(this.nouns()).toEqual([
            this.example0,
            this.example1
        ])

        this.dispatch({
            type: NouniActionTypes.ON_CLICK_DELETE_NOUNI,
            id: this.id(0),
        })

        expect(this.nouns()).toEqual([this.example1])

        this.dispatch({
            type: NouniActionTypes.ON_CLICK_DELETE_NOUNI,
            id: this.id(0),
        })

        expect(this.nouns()).toEqual([])

    })

    it('ON_CLICK_SAVE_NOUNI, new nouni', function() {
        // We know that this is a new record because nouni has no id.
        expect(this.nouns()).toEqual([])
        this.dispatch({
            type: NouniActionTypes.ON_CLICK_SAVE_NOUNI,
            nouni: this.example0
        })
        expect(this.nouns()).toEqual([this.example0])
    })

    it('ON_CLICK_SAVE_NOUNI, edit nouni', function() {
        // We know that this is an update to an existing record because nouni has an id.
        expect(this.nouns()).toEqual([])
        this.dispatch({
            type: NouniActionTypes.INSERT_NOUNI,
            nouni: this.example0
        })

        this.dispatch({
            type: NouniActionTypes.ON_CLICK_SAVE_NOUNI,
            nouni: {
                id: this.id(0),
                nound: Nound( {id:'1', base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es}),
                definiteness: DefinitenessSelect.Indefinite,
                generatedText: 'a box'
            }
        })

        expect(this.nouns()).toEqual([{
            nound: {id:'1', base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es},
            definiteness: DefinitenessSelect.Indefinite,
            generatedText: 'a box'
        }])
    })

    it('INSERT_NOUNI', function() {
        expect(this.nouns()).toEqual([])

        this.dispatch({
            type: NouniActionTypes.INSERT_NOUNI,
            nouni: this.example0
        })

        expect(this.nouns()).toEqual([this.example0])

        this.dispatch({
            type: NouniActionTypes.INSERT_NOUNI,
            nouni: this.example1
        })

        expect(this.nouns()).toEqual([
            this.example0,
            this.example1
        ])
    })
})
