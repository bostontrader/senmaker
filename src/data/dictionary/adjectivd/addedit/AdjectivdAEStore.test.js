import AdjectivdAEActionTypes  from './AdjectivdAEActionTypes'
import AdjectivdAEStore        from './AdjectivdAEStore'

// The AdjectivdAEStore is responsible for setting a small bit of state to signal
// that AdjectivdAddForm or AdjectivdEditForm should be opened or closed, as well as a bit of state
// to record changes to the add/edit fields.
describe('AdjectivdAEStore', function() {

    beforeEach(function() {
        // Always start with the initial state.
        this.state = AdjectivdAEStore.getInitialState()

        // This "dispatches" an action to our store. We can bypass the dispatcher
        // and just call the store's reduce function directly.
        this.dispatch = action => {
            this.state = AdjectivdAEStore.reduce(this.state, action)
        }
    })

    // Signal the UI to open the AdjectivdAddForm
    it('ON_CLICK_ADD_ADJECTIVD', function() {
        this.dispatch({
            type: AdjectivdAEActionTypes.ON_CLICK_ADD_ADJECTIVD
        })
        expect(this.state.get('addAdjectivd')).toBe(true)
    })

    // Signal the UI to close AdjectivdAddForm or AdjectivdEditForm
    it('ON_CLICK_CANCEL', function() {
        this.dispatch({
            type: AdjectivdAEActionTypes.ON_CLICK_CANCEL
        })
        this.state = AdjectivdAEStore.getInitialState()
    })

    // Signal the UI to close AdjectivdAddForm or AdjectivdEditForm. We don't test these two separately,
    // the same state should close either one. But the delete button is only available on AdjectivdEditForm.
    it('ON_CLICK_DELETE_ADJECTIVD', function() {

        // Now close it
        this.dispatch({
            type: AdjectivdAEActionTypes.ON_CLICK_DELETE_ADJECTIVD,
            adjectivd: {} // This action doesn't care about the adjectivd
        })
        expect(this.state).toEqual(AdjectivdAEStore.getInitialState())
    })

    // Signal the UI to open AdjectivdEditForm and populate with the given data.
    it('ON_CLICK_EDIT_ADJECTIVD', function() {
        this.dispatch({
            type: AdjectivdAEActionTypes.ON_CLICK_EDIT_ADJECTIVD,
            adjectivd: {id: '1', base: 'fat'}
        })
        expect(this.state.get('adjectivd').toJSON()).toEqual({id: '1', base: 'fat'})
    })

    // Signal the UI to close AdjectivdAddForm or AdjectivdEditForm. We don't test these two separately,
    // the same state should close either one.
    //
    // This action should have a adjectivd that will be used for insert or update in AdjectivdStore.  But
    // here we only close the UI and the value of adjectivd is unimportant.
    it('ON_CLICK_SAVE_ADJECTIVD, new adjectivd', function() {
        // We know this is a new record because adjectivd has no id.
        this.dispatch({
            type: AdjectivdAEActionTypes.ON_CLICK_SAVE_ADJECTIVD,
            adjectivd: {}
        })
        expect(this.state).toEqual(AdjectivdAEStore.getInitialState())
    })

    it('ON_CHANGE_BASE', function() {
        this.dispatch({
            type: AdjectivdAEActionTypes.ON_CHANGE_BASE,
            base: 'fat'
        })
        expect(this.state.getIn(['adjectivd','base'])).toBe('fat')
    })

})
