import VerbdAEStore       from './VerbdAEStore'
import VerbdActionTypes   from '../VerbdActionTypes'
import {verbdExamples}     from '../../../TestData'
import AppActionTypes     from '../../../app/AppActionTypes'

// The VerbdAEStore is responsible for setting a small bit of state to signal
// that VerbdAddForm or VerbdEditForm should be opened or closed, as well as a bit of state
// to record changes to the add/edit fields.
describe('VerbdAEStore', function() {

    beforeEach(function() {
        this.state = VerbdAEStore.getInitialState()

        this.dispatch = action => {
            this.state = VerbdAEStore.reduce(this.state, action)
        }

        // Several tests want to reset the state back to the initial state.  In order to do
        // that we need to perturb the initial state into some perturbed state, so that we can
        // verify that our reset really does reset the state back to the initial state.
        this.perturbState = () => {
            this.dispatch({
                type: VerbdActionTypes.ON_CLICK_ADD_VERBD
            })
        }
    })

    it('ON_CLICK_APP_RESET', function() {
        const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        this.dispatch({type: AppActionTypes.ON_CLICK_APP_RESET})
        expect(this.state).toBe(initialState)
    })

    // Signal the UI to open the VerbdAddForm
    it('ON_CLICK_ADD_VERBD', function() {
        this.dispatch({type: VerbdActionTypes.ON_CLICK_ADD_VERBD})
        expect(this.state.get('addVerbd')).toBe(true)
    })

    // Signal the UI to close VerbdAddForm or VerbdEditForm
    it('ON_CLICK_CANCEL', function() {
        const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        // Now cancel.  This should reset the state.
        this.dispatch({type: VerbdActionTypes.ON_CLICK_CANCEL})
        expect(this.state).toBe(initialState)
    })

    // Signal the UI to close VerbdAddForm or VerbdEditForm.
    it('ON_CLICK_DELETE_VERBD', function() {
        const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        // Now close it
        this.dispatch({type: VerbdActionTypes.ON_CLICK_DELETE_VERBD})
        expect(this.state).toBe(initialState)
    })

    // Signal the UI to open VerbdEditForm and populate with the given data.
    it('ON_CLICK_EDIT_VERBD', function() {
        this.dispatch({
            type: VerbdActionTypes.ON_CLICK_EDIT_VERBD,
            verbd: verbdExamples.a
        })
        expect(this.state.get('verbd').toJSON()).toEqual(verbdExamples.a.toJSON())
    })

    // Signal the UI to close VerbdAddForm or VerbdEditForm. We don't test these two separately,
    // the same state should close either one.
    //
    // This action should have a verbd that will be used for insert or update in VerbdStore.  But
    // here we only close the UI and the value of verbd is unimportant.
    it('ON_CLICK_SAVE_VERBD, new verbd', function() {
        const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        this.dispatch({type: VerbdActionTypes.ON_CLICK_SAVE_VERBD})
        expect(this.state).toBe(initialState)
    })

    it('ON_CHANGE_BASE', function() {
        this.dispatch({type: VerbdActionTypes.ON_CHANGE_BASE, base: 'talk'})
        expect(this.state.getIn(['verbd','base'])).toBe('talk')
    })

    it('ON_CHANGE_PAST_FORM', function() {
        this.dispatch({type: VerbdActionTypes.ON_CHANGE_PAST_FORM, pastForm: 'talked'})
        expect(this.state.getIn(['verbd','pastForm'])).toBe('talked')
    })

})
