import NPAEStore            from './NPAEStore'
import NPActionTypes        from '../NPActionTypes'
import {DefinitenessSelect} from '../NPConstants'
import {adjectivdExamples}  from '../../TestData'
import {noundExamples}      from '../../TestData'
import {npExamples}         from '../../TestData'
import AppActionTypes       from '../../app/AppActionTypes'
import Nound                from '../../dictionary/nound/Nound'
import {PluralizationRule}  from '../../dictionary/nound/NoundConstants'

describe('NPAEStore', function() {

    beforeEach(function() {
        this.state = NPAEStore.getInitialState()

        this.dispatch = action => {
            this.state = NPAEStore.reduce(this.state, action)
        }

        // Several tests want to reset the state back to the initial state.  In order to do
        // that we need to perturb the initial state into some perturbed state, so that we can
        // verify that our reset really does reset the state back to the initial state.
        this.perturbState = () => {
            this.dispatch({
                type: NPActionTypes.ON_CLICK_ADD_NP
            })
        }
    })

    it('ON_APP_RESET', function() {
        const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        this.dispatch({type: AppActionTypes.ON_APP_RESET})
        expect(this.state).toBe(initialState)
    })

    // Signal the UI to open the NPAddForm
    it('ON_CLICK_ADD_NP', function() {
        this.dispatch({type: NPActionTypes.ON_CLICK_ADD_NP})
        expect(this.state.get('addNP')).toBe(true)
    })

    // Signal the UI to close NPAddForm or NPEditForm
    it('ON_CLICK_CANCEL', function() {
        const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        // Now cancel.  This should reset the state.
        this.dispatch({type: NPActionTypes.ON_CLICK_CANCEL})
        expect(this.state).toBe(initialState)
    })

    // Signal the UI to close NPAddForm or NPEditForm.
    it('ON_CLICK_DELETE_NP', function() {
        const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        // Now close it
        this.dispatch({type: NPActionTypes.ON_CLICK_DELETE_NP})
        expect(this.state).toBe(initialState)
    })

    // Signal the UI to open NPEditForm and populate with the given data.
    it('ON_CLICK_EDIT_NP', function() {
        this.dispatch({
            type: NPActionTypes.ON_CLICK_EDIT_NP,
            np: npExamples.a
        })
        expect(this.state.get('np').toJSON()).toEqual(npExamples.a.toJSON())
    })

    // Signal the UI to close NPAddForm or NPEditForm. We don't test these two separately,
    // the same state should close either one.
    //
    // This action should have a np that will be used for insert or update in NPStore.  But
    // here we only close the UI and the value of np is unimportant.
    it('ON_CLICK_SAVE_NP, new np', function() {
        const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        this.dispatch({type: NPActionTypes.ON_CLICK_SAVE_NP, np: {}})
        expect(this.state).toBe(initialState)
    })
    
    it('Test calcResult', function() {
        expect(this.state.getIn(['np','generatedText'])).toEqual('')

        // 1. NP, but no definiteness. Only base form of noun.
        // In this test, the value of id is unused.
        this.dispatch({
            type: NPActionTypes.ON_CHANGE_SELECTED_NOUND,
            newNound: Nound({id:'666', base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es})
        })
        //expect(this.state.getIn(['np','generatedText'])).toEqual('box')

        // 2. Definiteness, but no np.
        /*this.dispatch({
            type: NPActionTypes.ON_CHANGE_DEFINITENESS,
            newDefiniteness: DefinitenessSelect.Definite
        })
        this.dispatch({ // Fake reset to no selected np
            type: NPActionTypes.ON_CHANGE_SELECTED_NOUND,
            newNound: Nound({id:'', base: '', plural: '', pluralization_rule: PluralizationRule.NoneSelected})
        })
        expect(this.state.getIn(['np','generatedText'])).toEqual('')

        // 3. Now give it a nound and expect the definite form.
        this.dispatch({
            type: NPActionTypes.ON_CHANGE_SELECTED_NOUND,
            newNound: Nound({id:'666', base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es})
        })
        expect(this.state.getIn(['np','generatedText'])).toEqual('the box')

        // 4. Indefinite, np.base does not start with vowel.
        this.dispatch({
            type: NPActionTypes.ON_CHANGE_DEFINITENESS,
            newDefiniteness: DefinitenessSelect.Indefinite
        })
        expect(this.state.getIn(['np','generatedText'])).toEqual('a box')

        // 5. Indefinite, np.base does start with vowel.
        this.dispatch({
            type: NPActionTypes.ON_CHANGE_SELECTED_NOUND,
            newNound: Nound({id:'666', base: 'elephant', plural: 'elephants', pluralization_rule: PluralizationRule.Append_s})
        })
        expect(this.state.getIn(['np','generatedText'])).toEqual('an elephant')*/

    })

    it('ON_CHANGE_SELECTED_NOUND', function() {

        // In this test, the value of id is unused.
        this.dispatch({
            type: NPActionTypes.ON_CHANGE_SELECTED_NOUND,
            newNound: noundExamples.a
        })
        expect(this.state.getIn(['np','nound']).toJSON()).toEqual(noundExamples.a.toJSON())
    })

    it('ON_CHANGE_SELECTED_ADJECTIVD', function() {

        // In this test, the value of id is unused.
        this.dispatch({
            type: NPActionTypes.ON_CHANGE_SELECTED_ADJECTIVD,
            newAdjectivds: [adjectivdExamples.a]
        })
        expect(this.state.getIn(['np','adjectivds'])[0].toJSON()).toEqual(adjectivdExamples.a.toJSON())
    })
    
    it('ON_CHANGE_DEFINITENESS', function() {
        expect(this.state.getIn(['np','definiteness'])).toBe(DefinitenessSelect.NoneSelected)

        this.dispatch({
            type: NPActionTypes.ON_CHANGE_DEFINITENESS,
            newDefiniteness: DefinitenessSelect.Definite
        })
        expect(this.state.getIn(['np','definiteness'])).toBe(DefinitenessSelect.Definite)
    })
})
