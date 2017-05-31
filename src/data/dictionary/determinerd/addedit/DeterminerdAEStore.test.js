import DeterminerdAEStore        from './DeterminerdAEStore'
import DeterminerdActionTypes    from '../DeterminerdActionTypes'
import {PluralizationRule} from '../DeterminerdConstants'
import initialState        from '../../../StateGetter'
import {determinerdExamples}     from '../../../TestData'
import AppActionTypes      from '../../../app/AppActionTypes'

// The DeterminerdAEStore is responsible for setting a small bit of state to signal
// that DeterminerdAddForm or DeterminerdEditForm should be opened or closed, as well as a bit of state
// to record changes to the add/edit fields.
describe('DeterminerdAEStore', () => {

    let state

    const perturbState = () => {state = DeterminerdAEStore.reduce(state, {type: DeterminerdActionTypes.ON_CLICK_ADD_DETERMINERD})}

    beforeEach(() => {state = initialState.determinerd.getIn(['addedit'])})

    it('ON_CLICK_APP_RESET', () => {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        state = DeterminerdAEStore.reduce(state, {type: AppActionTypes.ON_CLICK_APP_RESET})
        expect(state).toBe(initialState)
    })

    // Signal the UI to open the DeterminerdAddForm
    it('ON_CLICK_ADD_DETERMINERD', () => {
        state = DeterminerdAEStore.reduce(state, {type: DeterminerdActionTypes.ON_CLICK_ADD_DETERMINERD})
        expect(state.get('addDeterminerd')).toBe(true)
    })

    // Signal the UI to close DeterminerdAddForm or DeterminerdEditForm
    it('ON_CLICK_CANCEL', () => {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        // Now cancel.  This should reset the state.
        state = DeterminerdAEStore.reduce(state, {type: DeterminerdActionTypes.ON_CLICK_CANCEL})
        expect(state).toBe(initialState)
    })

    // Signal the UI to close DeterminerdAddForm or DeterminerdEditForm.
    it('ON_CLICK_DELETE_DETERMINERD', () => {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        // Now close it
        state = DeterminerdAEStore.reduce(state, {type: DeterminerdActionTypes.ON_CLICK_DELETE_DETERMINERD})
        expect(state).toBe(initialState)
    })

    // Signal the UI to open DeterminerdEditForm and populate with the given data.
    it('ON_CLICK_EDIT_DETERMINERD', () => {
        state = DeterminerdAEStore.reduce(state, {
            type: DeterminerdActionTypes.ON_CLICK_EDIT_DETERMINERD,
            determinerd: determinerdExamples.a
        })
        expect(state.get('determinerd').toJSON()).toEqual(determinerdExamples.a.toJSON())
    })

    // Signal the UI to close DeterminerdAddForm or DeterminerdEditForm. We don't test these two separately,
    // the same state should close either one.
    //
    // This action should have a determinerd that will be used for insert or update in DeterminerdStore.  But
    // here we only close the UI and the value of determinerd is unimportant.
    it('ON_CLICK_SAVE_DETERMINERD, new determinerd', () => {
        const initialState = state
        perturbState()
        expect(state).not.toBe(initialState)

        state = DeterminerdAEStore.reduce(state, {type: DeterminerdActionTypes.ON_CLICK_SAVE_DETERMINERD})
        expect(state).toBe(initialState)
    })

    it('ON_CHANGE_BASE', () => {
        state = DeterminerdAEStore.reduce(state, {type: DeterminerdActionTypes.ON_CHANGE_BASE, base: 'catfood'})
        expect(state.getIn(['determinerd','base'])).toBe('catfood')
    })

    it('ON_CHANGE_PLURALIZATION_RULE', () => {
        expect(state.getIn(['determinerd','pluralization_rule'])).toBe(PluralizationRule.NoneSelected)

        state = DeterminerdAEStore.reduce(state, {
            type: DeterminerdActionTypes.ON_CHANGE_PLURALIZATION_RULE,
            newPluralizationRule: PluralizationRule.Append_es
        })
        expect(state.getIn(['determinerd','pluralization_rule'])).toBe(PluralizationRule.Append_es)
    })

    it('ON_CHANGE_PLURAL', () => {
        state = DeterminerdAEStore.reduce(state, {type: DeterminerdActionTypes.ON_CHANGE_PLURAL, plural: 'catfood'})
        expect(state.getIn(['determinerd','plural'])).toBe('catfood')
    })

})
