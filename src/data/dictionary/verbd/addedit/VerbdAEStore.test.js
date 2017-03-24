import VerbdAEActionTypes from './VerbdAEActionTypes'
import VerbdAEStore from './VerbdAEStore'
import {PastTenseRule} from '../VerbdConstants'

// The VerbdAEStore is responsible for setting a small bit of state to signal
// that VerbdAddForm or VerbdEditForm should be opened or closed, as well as a bit of state
// to record changes to the add/edit fields.
describe('VerbdAEStore', function() {

    beforeEach(function() {
        // Always start with the initial state.
        this.state = VerbdAEStore.getInitialState()

        // This "dispatches" an action to our store. We can bypass the dispatcher
        // and just call the store's reduce function directly.
        this.dispatch = action => {
            this.state = VerbdAEStore.reduce(this.state, action)
        }
    })

    // Signal the UI to open the VerbdAddForm
    it('CLICK_ADD_VERBD', function() {
        this.dispatch({
            type: VerbdAEActionTypes.CLICK_ADD_VERBD
        })
        expect(this.state.get('addVerbd')).toBe(true)
    })

    // Signal the UI to close VerbdAddForm or VerbdEditForm
    it('CLICK_CANCEL', function() {
        this.dispatch({
            type: VerbdAEActionTypes.CLICK_CANCEL
        })
        this.state = VerbdAEStore.getInitialState()
    })

    // Signal the UI to close VerbdAddForm or VerbdEditForm. We don't test these two separately,
    // the same state should close either one. But the delete button is only available on VerbdEditForm.
    it('CLICK_DELETE_VERBD', function() {

        // Now close it
        this.dispatch({
            type: VerbdAEActionTypes.CLICK_DELETE_VERBD,
            verbd: {} // This action doesn't care about the verbd
        })
        expect(this.state).toEqual(VerbdAEStore.getInitialState())
    })

    // Signal the UI to open VerbdEditForm and populate with the given data.
    it('CLICK_EDIT_VERBD', function() {
        this.dispatch({
            type: VerbdAEActionTypes.CLICK_EDIT_VERBD,
            verbd: {id: '1', base: 'run', pastTense: 'ran', pastTense_rule: PastTenseRule.Irregular}
        })
        expect(this.state.get('verbd').toJSON()).toEqual({id: '1', base: 'run', pastTense: 'ran', pastTense_rule: PastTenseRule.Irregular})
    })

    // Signal the UI to close VerbdAddForm or VerbdEditForm. We don't test these two separately,
    // the same state should close either one.
    //
    // This action should have a verbd that will be used for insert or update in VerbdStore.  But
    // here we only close the UI and the value of verbd is unimportant.
    it('CLICK_SAVE_VERBD, new verbd', function() {
        // We know this is a new record because verbd has no id.
        this.dispatch({
            type: VerbdAEActionTypes.CLICK_SAVE_VERBD,
            verbd: {}
        })
        expect(this.state).toEqual(VerbdAEStore.getInitialState())
    })

    it('ON_CHANGE_BASE', function() {
        this.dispatch({
            type: VerbdAEActionTypes.ON_CHANGE_BASE,
            base: 'catfood'
        })
        expect(this.state.getIn(['verbd','base'])).toBe('catfood')
    })

})
