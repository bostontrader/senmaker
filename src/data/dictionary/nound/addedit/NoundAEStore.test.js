import NoundAEActionTypes from './NoundAEActionTypes'
import NoundAEStore from './NoundAEStore'
import {PluralizationRule} from '../NoundConstants'

// The NoundAEStore is responsible for setting a small bit of state to signal
// that NoundAddForm or NoundEditForm should be opened or closed, as well as a bit of state
// to record changes to the add/edit fields.
describe('NoundAEStore', function() {

    beforeEach(function() {
        // Always start with the initial state.
        this.state = NoundAEStore.getInitialState()

        // This "dispatches" an action to our store. We can bypass the dispatcher
        // and just call the store's reduce function directly.
        this.dispatch = action => {
            this.state = NoundAEStore.reduce(this.state, action)
        }
    })

    // Signal the UI to open the NoundAddForm
    it('CLICK_ADD_NOUND', function() {
        this.dispatch({
            type: NoundAEActionTypes.CLICK_ADD_NOUND
        })
        expect(this.state.get('addNound')).toBe(true)
    })

    // Signal the UI to close NoundAddForm or NoundEditForm
    it('CLICK_CANCEL', function() {
        this.dispatch({
            type: NoundAEActionTypes.CLICK_CANCEL
        })
        this.state = NoundAEStore.getInitialState()
    })

    // Signal the UI to close NoundAddForm or NoundEditForm. We don't test these two separately,
    // the same state should close either one. But the delete button is only available on NoundEditForm.
    it('CLICK_DELETE_NOUND', function() {

        // Now close it
        this.dispatch({
            type: NoundAEActionTypes.CLICK_DELETE_NOUND,
            nound: {} // This action doesn't care about the nound
        })
        expect(this.state).toEqual(NoundAEStore.getInitialState())
    })

    // Signal the UI to open NoundEditForm and populate with the given data.
    it('CLICK_EDIT_NOUND', function() {
        this.dispatch({
            type: NoundAEActionTypes.CLICK_EDIT_NOUND,
            nound: {id: '1', base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s}
        })
        expect(this.state.get('nound').toJSON()).toEqual({id: '1', base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s})
    })

    // Signal the UI to close NoundAddForm or NoundEditForm. We don't test these two separately,
    // the same state should close either one.
    //
    // This action should have a nound that will be used for insert or update in NoundStore.  But
    // here we only close the UI and the value of nound is unimportant.
    it('CLICK_SAVE_NOUND, new nound', function() {
        // We know this is a new record because nound has no id.
        this.dispatch({
            type: NoundAEActionTypes.CLICK_SAVE_NOUND,
            nound: {}
        })
        expect(this.state).toEqual(NoundAEStore.getInitialState())
    })

    it('ON_CHANGE_BASE', function() {
        this.dispatch({
            type: NoundAEActionTypes.ON_CHANGE_BASE,
            base: 'catfood'
        })
        expect(this.state.getIn(['nound','base'])).toBe('catfood')
    })

})