import PrepositiondActionTypes from './PrepositiondActionTypes'
import PrepositiondStore       from './PrepositiondStore'
import initialState            from '../../StateGetter'
import {prepositiondExamples}  from '../../TestData'
import AppActionTypes          from '../../app/AppActionTypes'

describe('PrepositiondStore', function() {

    let state
    
    const prepositionds = () => Array.from(state.getIn(['coll']).values()).map(prepositiond => ({
        id: prepositiond.id,
        base: prepositiond.base
    }))

    beforeEach(() => {state = initialState.prepositiond.getIn(['dict'])})

    it('ON_CLICK_APP_RESET', function() {
        const initialState = state

        // Now do anything, doesn't matter what, to change the initial state
        //dispatch({type: PrepositiondActionTypes.INSERT_PREPOSITIOND, prepositiond: prepositiondExamples.a})
        state = PrepositiondStore.reduce(state, {type: PrepositiondActionTypes.INSERT_PREPOSITIOND, prepositiond: prepositiondExamples.a})

        expect(initialState).not.toBe(state)

        // Now reset the state
        state = PrepositiondStore.reduce(state, {type: AppActionTypes.ON_CLICK_APP_RESET})
        expect(initialState).toBe(state)
    })

    it('ON_CLICK_DELETE_PREPOSITIOND', function() {
        expect(prepositionds()).toEqual([])

        state = PrepositiondStore.reduce(state, {type: PrepositiondActionTypes.INSERT_PREPOSITIOND, prepositiond: prepositiondExamples.a.set('id','')})
        state = PrepositiondStore.reduce(state, {type: PrepositiondActionTypes.INSERT_PREPOSITIOND, prepositiond: prepositiondExamples.b.set('id','')})
        state = PrepositiondStore.reduce(state, {type: PrepositiondActionTypes.INSERT_PREPOSITIOND, prepositiond: prepositiondExamples.c.set('id','')})

        state = PrepositiondStore.reduce(state, {type: PrepositiondActionTypes.ON_CLICK_DELETE_PREPOSITIOND, id: '2'})
        expect(prepositionds()).toEqual([prepositiondExamples.a.toJSON(), prepositiondExamples.c.toJSON()])

        state = PrepositiondStore.reduce(state, {type: PrepositiondActionTypes.ON_CLICK_DELETE_PREPOSITIOND, id: '3'})
        expect(prepositionds()).toEqual([prepositiondExamples.a.toJSON()])

        state = PrepositiondStore.reduce(state, {type: PrepositiondActionTypes.ON_CLICK_DELETE_PREPOSITIOND, id: '1'})
        expect(prepositionds()).toEqual([])

    })

    it('ON_CLICK_SAVE_PREPOSITIOND, new prepositiond', function() {
        // We know that this is a new record because prepositiond has no id.
        expect(prepositionds()).toEqual([])
        state = PrepositiondStore.reduce(state, {type: PrepositiondActionTypes.ON_CLICK_SAVE_PREPOSITIOND, prepositiond: prepositiondExamples.a.set('id','')})
        expect(prepositionds()).toEqual([prepositiondExamples.a.toJSON()])
    })

    it('ON_CLICK_SAVE_PREPOSITIOND, edit prepositiond', function() {
        expect(prepositionds()).toEqual([])

        // Watch this carefully, we play tricks with the id
        // Insert a new record and we know it will be assigned id = '1'
        // Then update that record.
        const update = prepositiondExamples.b.set('id','1')

        state = PrepositiondStore.reduce(state, {type: PrepositiondActionTypes.INSERT_PREPOSITIOND, prepositiond: prepositiondExamples.a.set('id','')})
        state = PrepositiondStore.reduce(state, {type: PrepositiondActionTypes.ON_CLICK_SAVE_PREPOSITIOND, prepositiond: update})

        expect(prepositionds()).toEqual([update.toJSON()])
    })

    it('INSERT_PREPOSITIOND', function() {
        expect(prepositionds()).toEqual([])

        state = PrepositiondStore.reduce(state, {type: PrepositiondActionTypes.INSERT_PREPOSITIOND, prepositiond: prepositiondExamples.a})
        expect(prepositionds()).toEqual([prepositiondExamples.a.toJSON()])

        state = PrepositiondStore.reduce(state, {type: PrepositiondActionTypes.INSERT_PREPOSITIOND, prepositiond: prepositiondExamples.b})
        expect(prepositionds()).toEqual([prepositiondExamples.a.toJSON(), prepositiondExamples.b.toJSON()])
    })
})
