import NPAEActionTypes  from './NPAEActionTypes'
import NPAEStore        from './NPAEStore'
//import {PluralizationRule} from '../NPConstants'
import AppActionTypes      from '../../app/AppActionTypes'

// The NPAEStore is responsible for setting a small bit of state to signal
// that NPAddForm or NPEditForm should be opened or closed, as well as a bit of state
// to record changes to the add/edit fields.
describe('NPAEStore', function() {

    beforeEach(function() {
        this.state = NPAEStore.getInitialState()

        this.dispatch = action => {
            this.state = NPAEStore.reduce(this.state, action)
        }
    })

    it('ON_APP_RESET', function() {
        const initialState = this.state

        // Now do anything, doesn't matter what, to change the initial state
        this.dispatch({
            type: NPAEActionTypes.ON_CLICK_ADD_NP
        })
        expect(initialState).not.toBe(this.state)

        // Now reset the state
        this.dispatch({
            type: AppActionTypes.ON_APP_RESET
        })
        expect(initialState).toBe(this.state)
    })

    // Signal the UI to open the NPAddForm
    /*it('ON_CLICK_ADD_NP', function() {
        this.dispatch({
            type: NPAEActionTypes.ON_CLICK_ADD_NP
        })
        expect(this.state.get('addNP')).toBe(true)
    })

    // Signal the UI to close NPAddForm or NPEditForm
    it('ON_CLICK_CANCEL', function() {
        this.dispatch({
            type: NPAEActionTypes.ON_CLICK_CANCEL
        })
        this.state = NPAEStore.getInitialState()
    })

    // Signal the UI to close NPAddForm or NPEditForm. We don't test these two separately,
    // the same state should close either one. But the delete button is only available on NPEditForm.
    it('ON_CLICK_DELETE_NP', function() {

        // Now close it
        this.dispatch({
            type: NPAEActionTypes.ON_CLICK_DELETE_NP,
            np: {} // This action doesn't care about the np
        })
        expect(this.state).toEqual(NPAEStore.getInitialState())
    })

    // Signal the UI to open NPEditForm and populate with the given data.
    it('ON_CLICK_EDIT_NP', function() {
        this.dispatch({
            type: NPAEActionTypes.ON_CLICK_EDIT_NP,
            np: {id: '1', base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s}
        })
        expect(this.state.get('np').toJSON()).toEqual({id: '1', base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s})
    })

    // Signal the UI to close NPAddForm or NPEditForm. We don't test these two separately,
    // the same state should close either one.
    //
    // This action should have a np that will be used for insert or update in NPStore.  But
    // here we only close the UI and the value of np is unimportant.
    it('ON_CLICK_SAVE_NP, new np', function() {
        // We know this is a new record because np has no id.
        this.dispatch({
            type: NPAEActionTypes.ON_CLICK_SAVE_NP,
            np: {}
        })
        expect(this.state).toEqual(NPAEStore.getInitialState())
    })

    it('ON_CHANGE_BASE', function() {
        this.dispatch({
            type: NPAEActionTypes.ON_CHANGE_BASE,
            base: 'catfood'
        })
        expect(this.state.getIn(['np','base'])).toBe('catfood')
    })*/

})
