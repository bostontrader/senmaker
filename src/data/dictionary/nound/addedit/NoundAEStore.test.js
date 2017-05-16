import NoundAEStore        from './NoundAEStore'
import NoundActionTypes    from '../NoundActionTypes'
import {PluralizationRule} from '../NoundConstants'
import initialState        from '../../../StateGetter'
import {noundExamples}     from '../../../TestData'
import AppActionTypes      from '../../../app/AppActionTypes'

// The NoundAEStore is responsible for setting a small bit of state to signal
// that NoundAddForm or NoundEditForm should be opened or closed, as well as a bit of state
// to record changes to the add/edit fields.
describe('NoundAEStore', () => {

    let state

    const perturbState = () => {state = NoundAEStore.reduce(state, {type: NoundActionTypes.ON_CLICK_ADD_NOUND})}

    beforeEach(() => {state = initialState.nound.getIn(['addedit'])})

    it('ON_CLICK_APP_RESET', () => {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        state = NoundAEStore.reduce(state, {type: AppActionTypes.ON_CLICK_APP_RESET})
        expect(state).toBe(initialState)
    })

    // Signal the UI to open the NoundAddForm
    it('ON_CLICK_ADD_NOUND', () => {
        state = NoundAEStore.reduce(state, {type: NoundActionTypes.ON_CLICK_ADD_NOUND})
        expect(state.get('addNound')).toBe(true)
    })

    // Signal the UI to close NoundAddForm or NoundEditForm
    it('ON_CLICK_CANCEL', () => {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        // Now cancel.  This should reset the state.
        state = NoundAEStore.reduce(state, {type: NoundActionTypes.ON_CLICK_CANCEL})
        expect(state).toBe(initialState)
    })

    // Signal the UI to close NoundAddForm or NoundEditForm.
    it('ON_CLICK_DELETE_NOUND', () => {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        // Now close it
        state = NoundAEStore.reduce(state, {type: NoundActionTypes.ON_CLICK_DELETE_NOUND})
        expect(state).toBe(initialState)
    })

    // Signal the UI to open NoundEditForm and populate with the given data.
    it('ON_CLICK_EDIT_NOUND', () => {
        state = NoundAEStore.reduce(state, {
            type: NoundActionTypes.ON_CLICK_EDIT_NOUND,
            nound: noundExamples.a
        })
        expect(state.get('nound').toJSON()).toEqual(noundExamples.a.toJSON())
    })

    // Signal the UI to close NoundAddForm or NoundEditForm. We don't test these two separately,
    // the same state should close either one.
    //
    // This action should have a nound that will be used for insert or update in NoundStore.  But
    // here we only close the UI and the value of nound is unimportant.
    it('ON_CLICK_SAVE_NOUND, new nound', () => {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        state = NoundAEStore.reduce(state, {type: NoundActionTypes.ON_CLICK_SAVE_NOUND})
        expect(state).toBe(initialState)
    })

    it('ON_CHANGE_BASE', () => {
        state = NoundAEStore.reduce(state, {type: NoundActionTypes.ON_CHANGE_BASE, base: 'catfood'})
        expect(state.getIn(['nound','base'])).toBe('catfood')
    })

    it('ON_CHANGE_PLURALIZATION_RULE', () => {
        expect(state.getIn(['nound','pluralization_rule'])).toBe(PluralizationRule.NoneSelected)

        state = NoundAEStore.reduce(state, {
            type: NoundActionTypes.ON_CHANGE_PLURALIZATION_RULE,
            newPluralizationRule: PluralizationRule.Append_es
        })
        expect(state.getIn(['nound','pluralization_rule'])).toBe(PluralizationRule.Append_es)
    })

    it('ON_CHANGE_PLURAL', () => {
        state = NoundAEStore.reduce(state, {type: NoundActionTypes.ON_CHANGE_PLURAL, plural: 'catfood'})
        expect(state.getIn(['nound','plural'])).toBe('catfood')
    })

})
