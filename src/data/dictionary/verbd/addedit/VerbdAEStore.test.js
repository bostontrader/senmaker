import VerbdAEStore     from './VerbdAEStore'
import VerbdActionTypes from '../VerbdActionTypes'
import initialState     from '../../../StateGetter'
import {verbdExamples}  from '../../../TestData'
import AppActionTypes   from '../../../app/AppActionTypes'

// The VerbdAEStore is responsible for setting a small bit of state to signal
// that VerbdAddForm or VerbdEditForm should be opened or closed, as well as a bit of state
// to record changes to the add/edit fields.
describe('VerbdAEStore', function() {

    let state

    const perturbState = () => {state = VerbdAEStore.reduce(state, {type: VerbdActionTypes.ON_CLICK_ADD_VERBD})}

    beforeEach(() => {state = initialState.verbd.getIn(['addedit'])})

    it('ON_CLICK_APP_RESET', function() {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        state = VerbdAEStore.reduce(state, {type: AppActionTypes.ON_CLICK_APP_RESET})
        expect(state).toBe(initialState)
    })

    // Signal the UI to open the VerbdAddForm
    it('ON_CLICK_ADD_VERBD', function() {
        state = VerbdAEStore.reduce(state, {type: VerbdActionTypes.ON_CLICK_ADD_VERBD})
        expect(state.get('addVerbd')).toBe(true)
    })

    // Signal the UI to close VerbdAddForm or VerbdEditForm
    it('ON_CLICK_CANCEL', function() {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        // Now cancel.  This should reset the state.
        state = VerbdAEStore.reduce(state, {type: VerbdActionTypes.ON_CLICK_CANCEL})
        expect(state).toBe(initialState)
    })

    // Signal the UI to close VerbdAddForm or VerbdEditForm.
    it('ON_CLICK_DELETE_VERBD', function() {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        // Now close it
        state = VerbdAEStore.reduce(state, {type: VerbdActionTypes.ON_CLICK_DELETE_VERBD})
        expect(state).toBe(initialState)
    })

    // Signal the UI to open VerbdEditForm and populate with the given data.
    it('ON_CLICK_EDIT_VERBD', function() {
        state = VerbdAEStore.reduce(state, {
            type: VerbdActionTypes.ON_CLICK_EDIT_VERBD,
            verbd: verbdExamples.a
        })
        expect(state.get('verbd').toJSON()).toEqual(verbdExamples.a.toJSON())
    })

    // Signal the UI to close VerbdAddForm or VerbdEditForm. We don't test these two separately,
    // the same state should close either one.
    //
    // This action should have a verbd that will be used for insert or update in VerbdStore.  But
    // here we only close the UI and the value of verbd is unimportant.
    it('ON_CLICK_SAVE_VERBD, new verbd', function() {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        state = VerbdAEStore.reduce(state, {type: VerbdActionTypes.ON_CLICK_SAVE_VERBD})
        expect(state).toBe(initialState)
    })

    it('ON_CHANGE_BASE', function() {
        state = VerbdAEStore.reduce(state, {type: VerbdActionTypes.ON_CHANGE_BASE, base: 'talk'})
        expect(state.getIn(['verbd','base'])).toBe('talk')
    })

    it('ON_CHANGE_PAST_FORM', function() {
        state = VerbdAEStore.reduce(state, {type: VerbdActionTypes.ON_CHANGE_PAST_FORM, pastForm: 'talked'})
        expect(state.getIn(['verbd','pastForm'])).toBe('talked')
    })

})
