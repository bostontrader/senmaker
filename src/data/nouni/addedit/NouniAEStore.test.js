import NoundActionTypes    from '../../dictionary/nound/NoundActionTypes'
import {PluralizationRule} from '../../dictionary/nound/NoundConstants'

import NouniAEActionTypes   from './NouniAEActionTypes'
import NouniAEStore         from './NouniAEStore'
import {DefinitenessSelect} from '../NouniConstants'

describe('NouniAEStore', function() {

    beforeEach(function() {
        // Always start with the initial state.
        this.state = NouniAEStore.getInitialState()

        // This function gets a more readable form of the nound that we can pass
        // to expect(). It strips away the id.
        //this.nouns = () => Array.from(this.state.values()).map(noun => ({
            //base: noun.base,
            //plural: noun.plural,
            //pluralization_rule: noun.pluralization_rule
        //}))

        // This function is for setting up data, it will add all the nound to the
        // state in a direct way.
        //this.addNouns = (nouns) => {
            //nouns.forEach(noun => {
                //const id = Counter.increment()
                //this.state = this.state.set(
                    //id,
                    //new Nound({id, base: noun.base, plural: noun.plural, pluralization_rule: noun.pluralization_rule})
                //)
            //})
        //}

        // This "dispatches" an action to our store. We can bypass the dispatcher
        // and just call the store's reduce function directly.
        this.dispatch = action => {
            this.state = NouniAEStore.reduce(this.state, action)
        }
    })

    it('Test calcResult', function() {
        expect(this.state.getIn(['nouni','generatedText'])).toEqual('')

        // Definiteness, but no nound.
        this.dispatch({
            type: NouniAEActionTypes.ON_CHANGE_DEFINITENESS,
            newDefiniteness: DefinitenessSelect.Definite
        })
        expect(this.state.getIn(['nouni','generatedText'])).toEqual('')

        this.state = NouniAEStore.getInitialState()

    })

    it('ON_CHANGE_SELECTED_NOUND', function() {
        expect(this.nouns()).toEqual([])
        this.addNouns([
            {base: 'apple', plural: 'apples', pluralization_rule: PluralizationRule.Append_s},
            {base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es},
            {base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s},
        ])
        // In this test, the value of id is unused.
        this.dispatch({
            type: NoundActionTypes.ON_CHANGE_SELECTED_NOUND,
            nound: {id:'n-666', base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es}
        })
        expect(true)
    })


    it('ON_CHANGE_DEFINITENESS', function() {
        expect(this.state.getIn(['nouni','definiteness'])).toBe(DefinitenessSelect.NoneSelected)

        this.dispatch({
            type: NouniAEActionTypes.ON_CHANGE_DEFINITENESS,
            newDefiniteness: DefinitenessSelect.Definite
        })
        expect(this.state.getIn(['nouni','definiteness'])).toBe(DefinitenessSelect.Definite)
    })
})
