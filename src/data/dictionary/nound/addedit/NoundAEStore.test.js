import NoundAEActionTypes from './NoundAEActionTypes'
import NoundAEStore from './NoundAEStore'
import {PluralizationRule} from '../NoundConstants'

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

    it('CLICK_ADD_NOUND', function() {
        this.dispatch({
            type: NoundAEActionTypes.CLICK_ADD_NOUND
        })
        expect(this.state.get('addNound')).toBe(true)
    })

    // Just close the add/edit UI
    it('CLICK_DELETE_NOUND', function() {

        // First open the UI
        this.dispatch({
            type: NoundAEActionTypes.CLICK_EDIT_NOUND,
            nound: {id: '1', base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s}
        })
        expect(this.state.get('nound').toJSON()).toEqual({id: '1', base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s})

        // Now close it
        this.dispatch({
            type: NoundAEActionTypes.CLICK_DELETE_NOUND,
            nound: {} // This action doesn't care about the nound
        })
        expect(this.state).toEqual(NoundAEStore.getInitialState())
    })

    it('CLICK_EDIT_NOUND', function() {
        this.dispatch({
            type: NoundAEActionTypes.CLICK_EDIT_NOUND,
            nound: {id: '1', base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s}
        })
        expect(this.state.get('nound').toJSON()).toEqual({id: '1', base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s})
    })

    // This test only closes the UI. The value of nound is unimportant
    it('CLICK_SAVE_NOUND, new nound', function() {
        // We know this is a new record because nound has no id.
        this.dispatch({
            type: NoundAEActionTypes.CLICK_SAVE_NOUND,
            nound: {}
        })
        expect(this.state.get('addNound')).toBe(false)
    })

    it('ON_CHANGE_BASE', function() {
        this.dispatch({
            type: NoundAEActionTypes.ON_CHANGE_BASE,
            base: 'catfood'
        })
        expect(this.state.getIn(['nound','base'])).toBe('catfood')
    })

})
