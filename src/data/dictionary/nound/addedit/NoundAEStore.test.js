import NoundAEStore        from './NoundAEStore'
import NoundActionTypes    from '../NoundActionTypes'
import {PluralizationRule} from '../NoundConstants'
import {noundExamples}     from '../../../TestData'
import AppActionTypes      from '../../../app/AppActionTypes'

// The NoundAEStore is responsible for setting a small bit of state to signal
// that NoundAddForm or NoundEditForm should be opened or closed, as well as a bit of state
// to record changes to the add/edit fields.
describe('NoundAEStore', function() {

    beforeEach(function() {
        this.state = NoundAEStore.getInitialState()

        this.dispatch = action => {
            this.state = NoundAEStore.reduce(this.state, action)
        }

        // Several tests want to reset the state back to the initial state.  In order to do
        // that we need to perturb the initial state into some perturbed state, so that we can
        // verify that our reset really does reset the state back to the initial state.
        this.perturbState = () => {
            this.dispatch({
                type: NoundActionTypes.ON_CLICK_ADD_NOUND
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

    // Signal the UI to open the NoundAddForm
    it('ON_CLICK_ADD_NOUND', function() {
        this.dispatch({type: NoundActionTypes.ON_CLICK_ADD_NOUND})
        expect(this.state.get('addNound')).toBe(true)
    })

    // Signal the UI to close NoundAddForm or NoundEditForm
    it('ON_CLICK_CANCEL', function() {
        const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        // Now cancel.  This should reset the state.
        this.dispatch({type: NoundActionTypes.ON_CLICK_CANCEL})
        expect(this.state).toBe(initialState)
    })

    // Signal the UI to close NoundAddForm or NoundEditForm.
    it('ON_CLICK_DELETE_NOUND', function() {
        const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        // Now close it
        this.dispatch({type: NoundActionTypes.ON_CLICK_DELETE_NOUND})
        expect(this.state).toBe(initialState)
    })

    // Signal the UI to open NoundEditForm and populate with the given data.
    it('ON_CLICK_EDIT_NOUND', function() {
        this.dispatch({
            type: NoundActionTypes.ON_CLICK_EDIT_NOUND,
            nound: noundExamples.a
        })
        expect(this.state.get('nound').toJSON()).toEqual(noundExamples.a.toJSON())
    })

    // Signal the UI to close NoundAddForm or NoundEditForm. We don't test these two separately,
    // the same state should close either one.
    //
    // This action should have a nound that will be used for insert or update in NoundStore.  But
    // here we only close the UI and the value of nound is unimportant.
    it('ON_CLICK_SAVE_NOUND, new nound', function() {
        const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        this.dispatch({type: NoundActionTypes.ON_CLICK_SAVE_NOUND})
        expect(this.state).toBe(initialState)
    })

    it('ON_CHANGE_BASE', function() {
        this.dispatch({type: NoundActionTypes.ON_CHANGE_BASE, base: 'catfood'})
        expect(this.state.getIn(['nound','base'])).toBe('catfood')
    })

    it('ON_CHANGE_PLURALIZATION_RULE', function() {
        expect(this.state.getIn(['nound','pluralization_rule'])).toBe(PluralizationRule.NoneSelected)

        this.dispatch({
            type: NoundActionTypes.ON_CHANGE_PLURALIZATION_RULE,
            newPluralizationRule: PluralizationRule.Append_es
        })
        expect(this.state.getIn(['nound','pluralization_rule'])).toBe(PluralizationRule.Append_es)
    })

    it('ON_CHANGE_PLURAL', function() {
        this.dispatch({type: NoundActionTypes.ON_CHANGE_PLURAL, plural: 'catfood'})
        expect(this.state.getIn(['nound','plural'])).toBe('catfood')
    })

})
