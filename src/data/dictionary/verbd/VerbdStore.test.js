import VerbdActionTypes from './VerbdActionTypes'
import VerbdStore       from './VerbdStore'
import initialState     from '../../StateGetter'
import {verbdExamples}  from '../../TestData'
import AppActionTypes   from '../../app/AppActionTypes'

describe('VerbdStore', function() {

    let state

    const verbds = () => Array.from(state.getIn(['coll']).values()).map(verbd => ({
        id: verbd.id,
        base: verbd.base,
        pastForm: verbd.pastForm,
        pastForm_rule: verbd.pastForm_rule,
        aspectOrSimple: verbd.aspectOrSimple,
        aspect: verbd.aspect
    }))

    beforeEach(() => {state = initialState.verbd.getIn(['dict'])})

    it('ON_CLICK_APP_RESET', function() {
        const initialState = state

        // Now do anything, doesn't matter what, to change the initial state
        state = VerbdStore.reduce(state, {type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.a})
        expect(initialState).not.toBe(state)

        // Now reset the state
        state = VerbdStore.reduce(state, {type: AppActionTypes.ON_CLICK_APP_RESET})
        expect(initialState).toBe(state)
    })

    it('ON_CLICK_DELETE_VERBD', function() {
        expect(verbds()).toEqual([])

        state = VerbdStore.reduce(state, {type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.a.set('id','')})
        state = VerbdStore.reduce(state, {type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.b.set('id','')})
        state = VerbdStore.reduce(state, {type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.c.set('id','')})

        state = VerbdStore.reduce(state, {type: VerbdActionTypes.ON_CLICK_DELETE_VERBD, id: '2'})
        expect(verbds()).toEqual([verbdExamples.a.toJSON(), verbdExamples.c.toJSON()])

        state = VerbdStore.reduce(state, {type: VerbdActionTypes.ON_CLICK_DELETE_VERBD, id: '3'})
        expect(verbds()).toEqual([verbdExamples.a.toJSON()])

        state = VerbdStore.reduce(state, {type: VerbdActionTypes.ON_CLICK_DELETE_VERBD, id: '1'})
        expect(verbds()).toEqual([])

    })

    it('ON_CLICK_SAVE_VERBD, new verbd', function() {
        // We know that this is a new record because verbd has no id.
        expect(verbds()).toEqual([])
        state = VerbdStore.reduce(state, {type: VerbdActionTypes.ON_CLICK_SAVE_VERBD, verbd: verbdExamples.a.set('id','')})
        expect(verbds()).toEqual([verbdExamples.a.toJSON()])
    })

    it('ON_CLICK_SAVE_VERBD, edit verbd', function() {
        expect(verbds()).toEqual([])

        // Watch this carefully, we play tricks with the id
        // Insert a new record and we know it will be assigned id = '1'
        // Then update that record.
        const update = verbdExamples.b.set('id','1')

        state = VerbdStore.reduce(state, {type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.a.set('id','')})
        state = VerbdStore.reduce(state, {type: VerbdActionTypes.ON_CLICK_SAVE_VERBD, verbd: update})

        expect(verbds()).toEqual([update.toJSON()])
    })

    it('INSERT_VERBD', function() {
        expect(verbds()).toEqual([])

        state = VerbdStore.reduce(state, {type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.a})
        expect(verbds()).toEqual([verbdExamples.a.toJSON()])

        state = VerbdStore.reduce(state, {type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.b})
        expect(verbds()).toEqual([verbdExamples.a.toJSON(), verbdExamples.b.toJSON()])
    })
})
