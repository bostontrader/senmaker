import VerbdActionTypes from './VerbdActionTypes'
import VerbdStore       from './VerbdStore'
//import {PastFormRule}   from './VerbdConstants'
import AppActionTypes   from '../../app/AppActionTypes'
import {verbdExamples}  from '../../TestData'

describe('VerbdStore', function() {

    beforeEach(function() {
        this.state = VerbdStore.getInitialState()

        this.verbds = () => Array.from(this.state.getIn(['coll']).values()).map(verbd => ({
            id: verbd.id,
            base: verbd.base,
            pastForm: verbd.pastForm,
            pastForm_rule: verbd.pastForm_rule,
            aspectOrSimple: verbd.aspectOrSimple,
            aspect: verbd.aspect
        }))
        
        this.dispatch = action => {this.state = VerbdStore.reduce(this.state, action)}

    })

    it('ON_CLICK_APP_RESET', function() {
        const initialState = this.state

        // Now do anything, doesn't matter what, to change the initial state
        this.dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.a})
        expect(initialState).not.toBe(this.state)

        // Now reset the state
        this.dispatch({type: AppActionTypes.ON_CLICK_APP_RESET})
        expect(initialState).toBe(this.state)
    })

    it('ON_CLICK_DELETE_VERBD', function() {
        expect(this.verbds()).toEqual([])

        this.dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.a.set('id','')})
        this.dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.b.set('id','')})
        this.dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.c.set('id','')})

        this.dispatch({type: VerbdActionTypes.ON_CLICK_DELETE_VERBD, id: '2'})
        expect(this.verbds()).toEqual([verbdExamples.a.toJSON(), verbdExamples.c.toJSON()])

        this.dispatch({type: VerbdActionTypes.ON_CLICK_DELETE_VERBD, id: '3'})
        expect(this.verbds()).toEqual([verbdExamples.a.toJSON()])

        this.dispatch({type: VerbdActionTypes.ON_CLICK_DELETE_VERBD, id: '1'})
        expect(this.verbds()).toEqual([])

    })

    it('ON_CLICK_SAVE_VERBD, new verbd', function() {
        // We know that this is a new record because verbd has no id.
        expect(this.verbds()).toEqual([])
        this.dispatch({type: VerbdActionTypes.ON_CLICK_SAVE_VERBD, verbd: verbdExamples.a.set('id','')})
        expect(this.verbds()).toEqual([verbdExamples.a.toJSON()])
    })

    it('ON_CLICK_SAVE_VERBD, edit verbd', function() {
        expect(this.verbds()).toEqual([])

        // Watch this carefully, we play tricks with the id
        // Insert a new record and we know it will be assigned id = '1'
        // Then update that record.
        const update = verbdExamples.b.set('id','1')

        this.dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.a.set('id','')})
        this.dispatch({type: VerbdActionTypes.ON_CLICK_SAVE_VERBD, verbd: update})

        expect(this.verbds()).toEqual([update.toJSON()])
    })

    it('INSERT_VERBD', function() {
        expect(this.verbds()).toEqual([])

        this.dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.a})
        expect(this.verbds()).toEqual([verbdExamples.a.toJSON()])

        this.dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.b})
        expect(this.verbds()).toEqual([verbdExamples.a.toJSON(), verbdExamples.b.toJSON()])
    })
})
