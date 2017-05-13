import AdjectivdAEStore     from './AdjectivdAEStore'
import AdjectivdActionTypes from '../AdjectivdActionTypes'
import {adjectivdExamples}  from '../../../TestData'
import AppActionTypes       from '../../../app/AppActionTypes'

// The AdjectivdAEStore is responsible for setting a small bit of state to signal
// that AdjectivdAddForm or AdjectivdEditForm should be opened or closed, as well as a bit of state
// to record changes to the add/edit fields.
describe('AdjectivdAEStore', function() {

    beforeEach(function() {
        this.state = AdjectivdAEStore.getInitialState()

        this.dispatch = action => {
            this.state = AdjectivdAEStore.reduce(this.state, action)
        }

        // Several tests want to reset the state back to the initial state.  In order to do
        // that we need to perturb the initial state into some perturbed state, so that we can
        // verify that our reset really does reset the state back to the initial state.
        this.perturbState = () => {
            this.dispatch({
                type: AdjectivdActionTypes.ON_CLICK_ADD_ADJECTIVD
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

    // Signal the UI to open the AdjectivdAddForm
    it('ON_CLICK_ADD_ADJECTIVD', function() {
        this.dispatch({type: AdjectivdActionTypes.ON_CLICK_ADD_ADJECTIVD})
        expect(this.state.get('addAdjectivd')).toBe(true)
    })

    // Signal the UI to close AdjectivdAddForm or AdjectivdEditForm
    it('ON_CLICK_CANCEL', function() {
        const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        // Now cancel.  This should reset the state.
        this.dispatch({type: AdjectivdActionTypes.ON_CLICK_CANCEL})
        expect(this.state).toBe(initialState)
    })

    // Signal the UI to close AdjectivdAddForm or AdjectivdEditForm.
    it('ON_CLICK_DELETE_ADJECTIVD', function() {
        const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        // Now close it
        this.dispatch({type: AdjectivdActionTypes.ON_CLICK_DELETE_ADJECTIVD})
        expect(this.state).toBe(initialState)
    })

    // Signal the UI to open AdjectivdEditForm and populate with the given data.
    it('ON_CLICK_EDIT_ADJECTIVD', function() {
        this.dispatch({
            type: AdjectivdActionTypes.ON_CLICK_EDIT_ADJECTIVD,
            adjectivd: adjectivdExamples.a
        })
        expect(this.state.get('adjectivd').toJSON()).toEqual(adjectivdExamples.a.toJSON())
    })

    // Signal the UI to close AdjectivdAddForm or AdjectivdEditForm. We don't test these two separately,
    // the same state should close either one.
    //
    // This action should have a adjectivd that will be used for insert or update in AdjectivdStore.  But
    // here we only close the UI and the value of adjectivd is unimportant.
    it('ON_CLICK_SAVE_ADJECTIVD, new adjectivd', function() {
        const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        this.dispatch({type: AdjectivdActionTypes.ON_CLICK_SAVE_ADJECTIVD})
        expect(this.state).toBe(initialState)
    })

    it('ON_CHANGE_BASE', function() {
        this.dispatch({type: AdjectivdActionTypes.ON_CHANGE_BASE, base: 'catfood'})
        expect(this.state.getIn(['adjectivd','base'])).toBe('catfood')
    })

})
