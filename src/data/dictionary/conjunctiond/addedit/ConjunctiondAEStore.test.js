import ConjunctiondAEStore     from './ConjunctiondAEStore'
import ConjunctiondActionTypes from '../ConjunctiondActionTypes'
import initialState            from '../../../StateGetter'
import {conjunctiondExamples}  from '../../../TestData'
import AppActionTypes          from '../../../app/AppActionTypes'

// The ConjunctiondAEStore is responsible for setting a small bit of state to signal
// that ConjunctiondAddForm or ConjunctiondEditForm should be opened or closed, as well as a bit of state
// to record changes to the add/edit fields.
describe('ConjunctiondAEStore', () => {

    let state

    const perturbState = () => {state = ConjunctiondAEStore.reduce(state, {type: ConjunctiondActionTypes.ON_CLICK_ADD_CONJUNCTIOND})}

    beforeEach(() => {state = initialState.conjunctiond.getIn(['addedit'])})

    it('ON_CLICK_APP_RESET', () => {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        state = ConjunctiondAEStore.reduce(state, {type: AppActionTypes.ON_CLICK_APP_RESET})
        expect(state).toBe(initialState)
    })

    // Signal the UI to open the ConjunctiondAddForm
    it('ON_CLICK_ADD_CONJUNCTIOND', () => {
        state = ConjunctiondAEStore.reduce(state, {type: ConjunctiondActionTypes.ON_CLICK_ADD_CONJUNCTIOND})
        expect(state.get('addConjunctiond')).toBe(true)
    })

    // Signal the UI to close ConjunctiondAddForm or ConjunctiondEditForm
    it('ON_CLICK_CANCEL', () => {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        // Now cancel.  This should reset the state.
        state = ConjunctiondAEStore.reduce(state, {type: ConjunctiondActionTypes.ON_CLICK_CANCEL})
        expect(state).toBe(initialState)
    })

    // Signal the UI to close ConjunctiondAddForm or ConjunctiondEditForm.
    it('ON_CLICK_DELETE_CONJUNCTIOND', () => {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        // Now close it
        state = ConjunctiondAEStore.reduce(state, {type: ConjunctiondActionTypes.ON_CLICK_DELETE_CONJUNCTIOND})
        expect(state).toBe(initialState)
    })

    // Signal the UI to open ConjunctiondEditForm and populate with the given data.
    it('ON_CLICK_EDIT_CONJUNCTIOND', () => {
        state = ConjunctiondAEStore.reduce(state, {
            type: ConjunctiondActionTypes.ON_CLICK_EDIT_CONJUNCTIOND,
            conjunctiond: conjunctiondExamples.a
        })
        expect(state.get('conjunctiond').toJSON()).toEqual(conjunctiondExamples.a.toJSON())
    })

    // Signal the UI to close ConjunctiondAddForm or ConjunctiondEditForm. We don't test these two separately,
    // the same state should close either one.
    //
    // This action should have a conjunctiond that will be used for insert or update in ConjunctiondStore.  But
    // here we only close the UI and the value of conjunctiond is unimportant.
    it('ON_CLICK_SAVE_CONJUNCTIOND, new conjunctiond', () => {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        state = ConjunctiondAEStore.reduce(state, {type: ConjunctiondActionTypes.ON_CLICK_SAVE_CONJUNCTIOND})
        expect(state).toBe(initialState)
    })

    it('ON_CHANGE_BASE', () => {
        state = ConjunctiondAEStore.reduce(state, {type: ConjunctiondActionTypes.ON_CHANGE_BASE, base: 'catfood'})
        expect(state.getIn(['conjunctiond','base'])).toBe('catfood')
    })

})
