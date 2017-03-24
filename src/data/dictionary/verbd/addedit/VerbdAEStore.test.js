import VerbdAEActionTypes from './VerbdAEActionTypes'
import VerbdAEStore from './VerbdAEStore'
import {PastTenseRule} from '../VerbdConstants'

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

    it('CLICK_ADD_VERBD', function() {
        this.dispatch({
            type: VerbdAEActionTypes.CLICK_ADD_VERBD
        })
        expect(this.state.get('addVerbd')).toBe(true)
    })

    // Just close the add/edit UI
    it('CLICK_DELETE_VERBD', function() {

        // First open the UI
        this.dispatch({
            type: VerbdAEActionTypes.CLICK_EDIT_VERBD,
            verbd: {id: '1', base: 'run', pastTense: 'ran', pastTense_rule: PastTenseRule.Irregular}
        })
        expect(this.state.get('verbd').toJSON()).toEqual({id: '1', base: 'run', pastTense: 'ran', pastTense_rule: PastTenseRule.Irregular})

        // Now close it
        this.dispatch({
            type: VerbdAEActionTypes.CLICK_DELETE_VERBD,
            verbd: {} // This action doesn't care about the verbd
        })
        expect(this.state).toEqual(VerbdAEStore.getInitialState())
    })

    it('CLICK_EDIT_VERBD', function() {
        this.dispatch({
            type: VerbdAEActionTypes.CLICK_EDIT_VERBD,
            verbd: {id: '1', base: 'run', pastTense: 'ran', pastTense_rule: PastTenseRule.Irregular}
        })
        expect(this.state.get('verbd').toJSON()).toEqual({id: '1', base: 'run', pastTense: 'ran', pastTense_rule: PastTenseRule.Irregular})
    })

    // This test only closes the UI. The value of verbd is unimportant
    it('CLICK_SAVE_VERBD, new verbd', function() {
        // We know this is a new record because verbd has no id.
        this.dispatch({
            type: VerbdAEActionTypes.CLICK_SAVE_VERBD,
            verbd: {}
        })
        expect(this.state.get('addVerbd')).toBe(false)
    })

    it('ON_CHANGE_BASE', function() {
        this.dispatch({
            type: VerbdAEActionTypes.ON_CHANGE_BASE,
            base: 'jump'
        })
        expect(this.state.getIn(['verbd','base'])).toBe('jump')
    })

})
