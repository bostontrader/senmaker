import AdjectivdAEStore     from './AdjectivdAEStore'
import AdjectivdActionTypes from '../AdjectivdActionTypes'
import initialState         from '../../../StateGetter'
import {adjectivdExamples}  from '../../../TestData'
import AppActionTypes       from '../../../app/AppActionTypes'

// The AdjectivdAEStore is responsible for setting a small bit of state to signal
// that AdjectivdAddForm or AdjectivdEditForm should be opened or closed, as well as a bit of state
// to record changes to the add/edit fields.
describe('AdjectivdAEStore', function() {

    let state

    const perturbState = () => {state = AdjectivdAEStore.reduce(state, {type: AdjectivdActionTypes.ON_CLICK_ADD_ADJECTIVD})}

    beforeEach(() => {state = initialState.adjectivd.getIn(['addedit'])})

    it('ON_CLICK_APP_RESET', function() {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        state = AdjectivdAEStore.reduce(state, {type: AppActionTypes.ON_CLICK_APP_RESET})
        expect(state).toBe(initialState)
    })

    // Signal the UI to open the AdjectivdAddForm
    it('ON_CLICK_ADD_ADJECTIVD', function() {
        state = AdjectivdAEStore.reduce(state, {type: AdjectivdActionTypes.ON_CLICK_ADD_ADJECTIVD})
        expect(state.get('addAdjectivd')).toBe(true)
    })

    // Signal the UI to close AdjectivdAddForm or AdjectivdEditForm
    it('ON_CLICK_CANCEL', function() {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        // Now cancel.  This should reset the state.
        state = AdjectivdAEStore.reduce(state, {type: AdjectivdActionTypes.ON_CLICK_CANCEL})
        expect(state).toBe(initialState)
    })

    // Signal the UI to close AdjectivdAddForm or AdjectivdEditForm.
    it('ON_CLICK_DELETE_ADJECTIVD', function() {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        // Now close it
        state = AdjectivdAEStore.reduce(state, {type: AdjectivdActionTypes.ON_CLICK_DELETE_ADJECTIVD})
        expect(state).toBe(initialState)
    })

    // Signal the UI to open AdjectivdEditForm and populate with the given data.
    it('ON_CLICK_EDIT_ADJECTIVD', function() {
        state = AdjectivdAEStore.reduce(state, {
            type: AdjectivdActionTypes.ON_CLICK_EDIT_ADJECTIVD,
            adjectivd: adjectivdExamples.a
        })
        expect(state.get('adjectivd').toJSON()).toEqual(adjectivdExamples.a.toJSON())
    })

    // Signal the UI to close AdjectivdAddForm or AdjectivdEditForm. We don't test these two separately,
    // the same state should close either one.
    //
    // This action should have a adjectivd that will be used for insert or update in AdjectivdStore.  But
    // here we only close the UI and the value of adjectivd is unimportant.
    it('ON_CLICK_SAVE_ADJECTIVD, new adjectivd', function() {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        state = AdjectivdAEStore.reduce(state, {type: AdjectivdActionTypes.ON_CLICK_SAVE_ADJECTIVD})
        expect(state).toBe(initialState)
    })

    it('ON_CHANGE_BASE', function() {
        state = AdjectivdAEStore.reduce(state, {type: AdjectivdActionTypes.ON_CHANGE_BASE, base: 'catfood'})
        expect(state.getIn(['adjectivd','base'])).toBe('catfood')
    })

})
