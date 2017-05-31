import PronoundAEStore     from './PronoundAEStore'
import PronoundActionTypes from '../PronoundActionTypes'
import {PluralizationRule}    from '../PronoundConstants'
import initialState           from '../../../StateGetter'
import {pronoundExamples}     from '../../../TestData'
import AppActionTypes         from '../../../app/AppActionTypes'

// The PronoundAEStore is responsible for setting a small bit of state to signal
// that PronoundAddForm or PronoundEditForm should be opened or closed, as well as a bit of state
// to record changes to the add/edit fields.
describe('PronoundAEStore', () => {

    let state

    const perturbState = () => {state = PronoundAEStore.reduce(state, {type: PronoundActionTypes.ON_CLICK_ADD_PRONOUND})}

    beforeEach(() => {state = initialState.pronound.getIn(['addedit'])})

    it('ON_CLICK_APP_RESET', () => {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        state = PronoundAEStore.reduce(state, {type: AppActionTypes.ON_CLICK_APP_RESET})
        expect(state).toBe(initialState)
    })

    // Signal the UI to open the PronoundAddForm
    it('ON_CLICK_ADD_PRONOUND', () => {
        state = PronoundAEStore.reduce(state, {type: PronoundActionTypes.ON_CLICK_ADD_PRONOUND})
        expect(state.get('addPronound')).toBe(true)
    })

    // Signal the UI to close PronoundAddForm or PronoundEditForm
    it('ON_CLICK_CANCEL', () => {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        // Now cancel.  This should reset the state.
        state = PronoundAEStore.reduce(state, {type: PronoundActionTypes.ON_CLICK_CANCEL})
        expect(state).toBe(initialState)
    })

    // Signal the UI to close PronoundAddForm or PronoundEditForm.
    it('ON_CLICK_DELETE_PRONOUND', () => {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        // Now close it
        state = PronoundAEStore.reduce(state, {type: PronoundActionTypes.ON_CLICK_DELETE_PRONOUND})
        expect(state).toBe(initialState)
    })

    // Signal the UI to open PronoundEditForm and populate with the given data.
    it('ON_CLICK_EDIT_PRONOUND', () => {
        state = PronoundAEStore.reduce(state, {
            type: PronoundActionTypes.ON_CLICK_EDIT_PRONOUND,
            pronound: pronoundExamples.a
        })
        expect(state.get('pronound').toJSON()).toEqual(pronoundExamples.a.toJSON())
    })

    // Signal the UI to close PronoundAddForm or PronoundEditForm. We don't test these two separately,
    // the same state should close either one.
    //
    // This action should have a pronound that will be used for insert or update in PronoundStore.  But
    // here we only close the UI and the value of pronound is unimportant.
    it('ON_CLICK_SAVE_PRONOUND, new pronound', () => {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        state = PronoundAEStore.reduce(state, {type: PronoundActionTypes.ON_CLICK_SAVE_PRONOUND})
        expect(state).toBe(initialState)
    })

    it('ON_CHANGE_BASE', () => {
        state = PronoundAEStore.reduce(state, {type: PronoundActionTypes.ON_CHANGE_BASE, base: 'catfood'})
        expect(state.getIn(['pronound','base'])).toBe('catfood')
    })

    it('ON_CHANGE_PLURALIZATION_RULE', () => {
        expect(state.getIn(['pronound','pluralization_rule'])).toBe(PluralizationRule.NoneSelected)

        state = PronoundAEStore.reduce(state, {
            type: PronoundActionTypes.ON_CHANGE_PLURALIZATION_RULE,
            newPluralizationRule: PluralizationRule.Append_es
        })
        expect(state.getIn(['pronound','pluralization_rule'])).toBe(PluralizationRule.Append_es)
    })

    it('ON_CHANGE_PLURAL', () => {
        state = PronoundAEStore.reduce(state, {type: PronoundActionTypes.ON_CHANGE_PLURAL, plural: 'catfood'})
        expect(state.getIn(['pronound','plural'])).toBe('catfood')
    })

})
