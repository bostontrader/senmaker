import PrepositiondAEStore     from './PrepositiondAEStore'
import PrepositiondActionTypes from '../PrepositiondActionTypes'
import initialState            from '../../../StateGetter'
import {prepositiondExamples}  from '../../../TestData'
import AppActionTypes          from '../../../app/AppActionTypes'

// The PrepositiondAEStore is responsible for setting a small bit of state to signal
// that PrepositiondAddForm or PrepositiondEditForm should be opened or closed, as well as a bit of state
// to record changes to the add/edit fields.
describe('PrepositiondAEStore', function() {

    let state

    const perturbState = () => {state = PrepositiondAEStore.reduce(state, {type: PrepositiondActionTypes.ON_CLICK_ADD_PREPOSITIOND})}

    beforeEach(() => {state = initialState.prepositiond.getIn(['addedit'])})

    it('ON_CLICK_APP_RESET', function() {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        state = PrepositiondAEStore.reduce(state, {type: AppActionTypes.ON_CLICK_APP_RESET})
        expect(state).toBe(initialState)
    })

    // Signal the UI to open the PrepositiondAddForm
    it('ON_CLICK_ADD_PREPOSITIOND', function() {
        state = PrepositiondAEStore.reduce(state, {type: PrepositiondActionTypes.ON_CLICK_ADD_PREPOSITIOND})
        expect(state.get('addPrepositiond')).toBe(true)
    })

    // Signal the UI to close PrepositiondAddForm or PrepositiondEditForm
    it('ON_CLICK_CANCEL', function() {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        // Now cancel.  This should reset the state.
        state = PrepositiondAEStore.reduce(state, {type: PrepositiondActionTypes.ON_CLICK_CANCEL})
        expect(state).toBe(initialState)
    })

    // Signal the UI to close PrepositiondAddForm or PrepositiondEditForm.
    it('ON_CLICK_DELETE_PREPOSITIOND', function() {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        // Now close it
        state = PrepositiondAEStore.reduce(state, {type: PrepositiondActionTypes.ON_CLICK_DELETE_PREPOSITIOND})
        expect(state).toBe(initialState)
    })

    // Signal the UI to open PrepositiondEditForm and populate with the given data.
    it('ON_CLICK_EDIT_PREPOSITIOND', function() {
        state = PrepositiondAEStore.reduce(state, {
            type: PrepositiondActionTypes.ON_CLICK_EDIT_PREPOSITIOND,
            prepositiond: prepositiondExamples.a
        })
        expect(state.get('prepositiond').toJSON()).toEqual(prepositiondExamples.a.toJSON())
    })

    // Signal the UI to close PrepositiondAddForm or PrepositiondEditForm. We don't test these two separately,
    // the same state should close either one.
    //
    // This action should have a prepositiond that will be used for insert or update in PrepositiondStore.  But
    // here we only close the UI and the value of prepositiond is unimportant.
    it('ON_CLICK_SAVE_PREPOSITIOND, new prepositiond', function() {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        state = PrepositiondAEStore.reduce(state, {type: PrepositiondActionTypes.ON_CLICK_SAVE_PREPOSITIOND})
        expect(state).toBe(initialState)
    })

    it('ON_CHANGE_BASE', function() {
        state = PrepositiondAEStore.reduce(state, {type: PrepositiondActionTypes.ON_CHANGE_BASE, base: 'catfood'})
        expect(state.getIn(['prepositiond','base'])).toBe('catfood')
    })

})
