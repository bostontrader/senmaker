import NoundActionTypes    from '../../dictionary/nound/NoundActionTypes'
import {PluralizationRule} from '../../dictionary/nound/NoundConstants'

import Nound                from '../../dictionary/nound/Nound'
import NouniAEActionTypes   from './NouniAEActionTypes'
import NouniAEStore         from './NouniAEStore'
import {DefinitenessSelect} from '../NouniConstants'

describe('NouniAEStore', function() {

    beforeEach(function() {
        // Always start with the initial state.
        this.state = NouniAEStore.getInitialState()

        // This "dispatches" an action to our store. We can bypass the dispatcher
        // and just call the store's reduce function directly.
        this.dispatch = action => {
            this.state = NouniAEStore.reduce(this.state, action)
        }
    })

    it('Test calcResult', function() {
        expect(this.state.getIn(['nouni','generatedText'])).toEqual('')

        // 1. Nound, but no definiteness. Only base form of noun.
        // In this test, the value of id is unused.
        this.dispatch({
            type: NoundActionTypes.ON_CHANGE_SELECTED_NOUND,
            nound: Nound({id:'n-666', base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es})
        })
        expect(this.state.getIn(['nouni','generatedText'])).toEqual('box')

        // 2. Definiteness, but no nound.
        this.dispatch({
            type: NouniAEActionTypes.ON_CHANGE_DEFINITENESS,
            newDefiniteness: DefinitenessSelect.Definite
        })
        this.dispatch({ // Fake reset to no selected nound
            type: NoundActionTypes.ON_CHANGE_SELECTED_NOUND,
            nound: Nound({id:'', base: '', plural: '', pluralization_rule: PluralizationRule.NoneSelected})
        })
        expect(this.state.getIn(['nouni','generatedText'])).toEqual('')

        // 3. Now give it a noun and expect the definite form.
        this.dispatch({
            type: NoundActionTypes.ON_CHANGE_SELECTED_NOUND,
            nound: Nound({id:'n-666', base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es})
        })
        expect(this.state.getIn(['nouni','generatedText'])).toEqual('the box')

        // 4. Indefinite, nound.base does not start with vowel.
        this.dispatch({
            type: NouniAEActionTypes.ON_CHANGE_DEFINITENESS,
            newDefiniteness: DefinitenessSelect.Indefinite
        })
        expect(this.state.getIn(['nouni','generatedText'])).toEqual('a box')

        // 5. Indefinite, nound.base does start with vowel.
        this.dispatch({
            type: NoundActionTypes.ON_CHANGE_SELECTED_NOUND,
            nound: Nound({id:'n-666', base: 'elephant', plural: 'elephants', pluralization_rule: PluralizationRule.Append_s})
        })
        expect(this.state.getIn(['nouni','generatedText'])).toEqual('an elephant')

    })

    it('ON_CHANGE_SELECTED_NOUND', function() {

        // In this test, the value of id is unused.
        this.dispatch({
            type: NoundActionTypes.ON_CHANGE_SELECTED_NOUND,
            nound: Nound({id:'n-666', base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es})
        })
        expect(this.state.getIn(['nouni','nound']).toJSON()).toEqual({id:'n-666', base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es})
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
