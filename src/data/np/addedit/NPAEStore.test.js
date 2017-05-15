import NPAEStore            from './NPAEStore'
import NPActionTypes        from '../NPActionTypes'
import {DefinitenessSelect} from '../NPConstants'
import {adjectivdExamples}  from '../../TestData'
import {noundExamples}      from '../../TestData'
import {npExamples}         from '../../TestData'
import AppActionTypes       from '../../app/AppActionTypes'
import Nound                from '../../dictionary/nound/Nound'
import {PluralizationRule}  from '../../dictionary/nound/NoundConstants'

describe('NPAEStore', () => {

    let state
    
    const perturbState = () => {state = NPAEStore.reduce(state, {type: NPActionTypes.ON_CLICK_ADD_NP})}

    beforeEach(() => {state = NPAEStore.getInitialState()})

    it('ON_CLICK_APP_RESET', () => {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        state = NPAEStore.reduce(state, {type: AppActionTypes.ON_CLICK_APP_RESET})
        expect(state).toBe(initialState)
    })

    // Signal the UI to open the NPAddForm
    it('ON_CLICK_ADD_NP', () => {
        state = NPAEStore.reduce(state, {type: NPActionTypes.ON_CLICK_ADD_NP})
        expect(state.get('addNP')).toBe(true)
    })

    // Signal the UI to close NPAddForm or NPEditForm
    it('ON_CLICK_CANCEL', () => {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        // Now cancel.  This should reset the state.
        state = NPAEStore.reduce(state, {type: NPActionTypes.ON_CLICK_CANCEL})
        expect(state).toBe(initialState)
    })

    // Signal the UI to close NPAddForm or NPEditForm.
    it('ON_CLICK_DELETE_NP', () => {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        // Now close it
        state = NPAEStore.reduce(state, {type: NPActionTypes.ON_CLICK_DELETE_NP})
        expect(state).toBe(initialState)
    })

    // Signal the UI to open NPEditForm and populate with the given data.
    it('ON_CLICK_EDIT_NP', () => {
        state = NPAEStore.reduce(state, {
            type: NPActionTypes.ON_CLICK_EDIT_NP,
            np: npExamples.a
        })
        expect(state.get('np').toJSON()).toEqual(npExamples.a.toJSON())
    })

    // Signal the UI to close NPAddForm or NPEditForm. We don't test these two separately,
    // the same state should close either one.
    //
    // This action should have a np that will be used for insert or update in NPStore.  But
    // here we only close the UI and the value of np is unimportant.
    it('ON_CLICK_SAVE_NP, new np', () => {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        state = NPAEStore.reduce(state, {type: NPActionTypes.ON_CLICK_SAVE_NP, np: {}})
        expect(state).toBe(initialState)
    })
    
    it('Test calcResult', () => {
        expect(state.getIn(['np','generatedText'])).toEqual('')

        // 1. NP, but no definiteness. Only base form of noun.
        // In this test, the value of id is unused.
        state = NPAEStore.reduce(state, {
            type: NPActionTypes.ON_CHANGE_SELECTED_NOUND,
            newNound: Nound({id:'666', base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es})
        })
        //expect(state.getIn(['np','generatedText'])).toEqual('box')

        // 2. Definiteness, but no np.
        /*dispatch({
            type: NPActionTypes.ON_CHANGE_DEFINITENESS,
            newDefiniteness: DefinitenessSelect.Definite
        })
        dispatch({ // Fake reset to no selected np
            type: NPActionTypes.ON_CHANGE_SELECTED_NOUND,
            newNound: Nound({id:'', base: '', plural: '', pluralization_rule: PluralizationRule.NoneSelected})
        })
        expect(state.getIn(['np','generatedText'])).toEqual('')

        // 3. Now give it a nound and expect the definite form.
        dispatch({
            type: NPActionTypes.ON_CHANGE_SELECTED_NOUND,
            newNound: Nound({id:'666', base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es})
        })
        expect(state.getIn(['np','generatedText'])).toEqual('the box')

        // 4. Indefinite, np.base does not start with vowel.
        dispatch({
            type: NPActionTypes.ON_CHANGE_DEFINITENESS,
            newDefiniteness: DefinitenessSelect.Indefinite
        })
        expect(state.getIn(['np','generatedText'])).toEqual('a box')

        // 5. Indefinite, np.base does start with vowel.
        dispatch({
            type: NPActionTypes.ON_CHANGE_SELECTED_NOUND,
            newNound: Nound({id:'666', base: 'elephant', plural: 'elephants', pluralization_rule: PluralizationRule.Append_s})
        })
        expect(state.getIn(['np','generatedText'])).toEqual('an elephant')*/

    })

    it('ON_CHANGE_SELECTED_NOUND', () => {

        // In this test, the value of id is unused.
        state = NPAEStore.reduce(state, {
            type: NPActionTypes.ON_CHANGE_SELECTED_NOUND,
            newNound: noundExamples.a
        })
        expect(state.getIn(['np','nound']).toJSON()).toEqual(noundExamples.a.toJSON())
    })

    it('ON_CHANGE_SELECTED_ADJECTIVD', () => {

        // In this test, the value of id is unused.
        state = NPAEStore.reduce(state, {
            type: NPActionTypes.ON_CHANGE_SELECTED_ADJECTIVD,
            newAdjectivds: [adjectivdExamples.a]
        })
        expect(state.getIn(['np','adjectivds'])[0].toJSON()).toEqual(adjectivdExamples.a.toJSON())
    })
    
    it('ON_CHANGE_DEFINITENESS', () => {
        expect(state.getIn(['np','definiteness'])).toBe(DefinitenessSelect.NoneSelected)

        state = NPAEStore.reduce(state, {
            type: NPActionTypes.ON_CHANGE_DEFINITENESS,
            newDefiniteness: DefinitenessSelect.Definite
        })
        expect(state.getIn(['np','definiteness'])).toBe(DefinitenessSelect.Definite)
    })
})
