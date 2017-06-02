import ActionTypes            from './ConjunctiondActionTypes'
import Store                  from './ConjunctiondStore'
import {conjunctiondExamples} from '../../../data/TestData'

import {testFunction} from '../word/Store'

describe("ConjunctiondStore", () => {testFunction(Store, ActionTypes, 'conjunctiond', conjunctiondExamples)})

/*import ConjunctiondActionTypes from './ConjunctiondActionTypes'
import ConjunctiondStore       from './ConjunctiondStore'
import initialState            from '../../StateGetter'
import {conjunctiondExamples}  from '../../TestData'
import AppActionTypes          from '../../app/AppActionTypes'

describe('ConjunctiondStore', () => {

    let state

    const conjunctionds = () => Array.from(state.getIn(['coll']).values()).map(conjunctiond => ({
        id: conjunctiond.id,
        v: conjunctiond.v,
        base: conjunctiond.base
    }))

    beforeEach(() => {state = initialState.conjunctiond.getIn(['dict'])})

    it('ON_CLICK_APP_RESET', () => {
        const initialState = state

        // Now do anything, doesn't matter what, to change the initial state
        state = ConjunctiondStore.reduce(state, {type: ConjunctiondActionTypes.INSERT_CONJUNCTIOND, conjunctiond: conjunctiondExamples.a})
        expect(initialState).not.toBe(state)

        // Now reset the state
        state = ConjunctiondStore.reduce(state, {type: AppActionTypes.ON_CLICK_APP_RESET})
        expect(initialState).toEqual(state)
    })

    it('ON_CLICK_DELETE_CONJUNCTIOND', () => {
        expect(conjunctionds()).toEqual([])

        state = ConjunctiondStore.reduce(state, {type: ConjunctiondActionTypes.INSERT_CONJUNCTIOND, conjunctiond: conjunctiondExamples.a})
        state = ConjunctiondStore.reduce(state, {type: ConjunctiondActionTypes.INSERT_CONJUNCTIOND, conjunctiond: conjunctiondExamples.b})
        state = ConjunctiondStore.reduce(state, {type: ConjunctiondActionTypes.INSERT_CONJUNCTIOND, conjunctiond: conjunctiondExamples.c})

        state = ConjunctiondStore.reduce(state, {type: ConjunctiondActionTypes.ON_CLICK_DELETE_CONJUNCTIOND, id: '2'})
        expect(conjunctionds()).toEqual([conjunctiondExamples.a.toJSON(), conjunctiondExamples.c.toJSON()])

        state = ConjunctiondStore.reduce(state, {type: ConjunctiondActionTypes.ON_CLICK_DELETE_CONJUNCTIOND, id: '3'})
        expect(conjunctionds()).toEqual([conjunctiondExamples.a.toJSON()])

        state = ConjunctiondStore.reduce(state, {type: ConjunctiondActionTypes.ON_CLICK_DELETE_CONJUNCTIOND, id: '1'})
        expect(conjunctionds()).toEqual([])
    })

    it('ON_CLICK_SAVE_CONJUNCTIOND, new conjunctiond', () => {
        // We know that this is a new record because conjunctiond has no id.
        expect(conjunctionds()).toEqual([])
        state = ConjunctiondStore.reduce(state, {type: ConjunctiondActionTypes.ON_CLICK_SAVE_CONJUNCTIOND, conjunctiond: conjunctiondExamples.a.set('id','')})
        expect(conjunctionds()).toEqual([conjunctiondExamples.a.toJSON()])
    })

    it('ON_CLICK_SAVE_CONJUNCTIOND, edit conjunctiond', () => {
        expect(conjunctionds()).toEqual([])

        // Watch this carefully, we play tricks with the id
        // Insert a new record and we know it will be assigned id = '1'
        // Then update that record.
        const update = conjunctiondExamples.b.set('id','1')

        state = ConjunctiondStore.reduce(state, {type: ConjunctiondActionTypes.INSERT_CONJUNCTIOND, conjunctiond: conjunctiondExamples.a})
        state = ConjunctiondStore.reduce(state, {type: ConjunctiondActionTypes.ON_CLICK_SAVE_CONJUNCTIOND, conjunctiond: update})

        expect(conjunctionds()).toEqual([update.toJSON()])
    })

    it('INSERT_CONJUNCTIOND', () => {
        expect(conjunctionds()).toEqual([])

        state = ConjunctiondStore.reduce(state, {type: ConjunctiondActionTypes.INSERT_CONJUNCTIOND, conjunctiond: conjunctiondExamples.a})
        expect(conjunctionds()).toEqual([conjunctiondExamples.a.toJSON()])

        state = ConjunctiondStore.reduce(state, {type: ConjunctiondActionTypes.INSERT_CONJUNCTIOND, conjunctiond: conjunctiondExamples.b})
        expect(conjunctionds()).toEqual([conjunctiondExamples.a.toJSON(), conjunctiondExamples.b.toJSON()])
    })
})
*/