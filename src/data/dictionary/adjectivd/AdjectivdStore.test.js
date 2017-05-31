import AdjectivdActionTypes from './AdjectivdActionTypes'
import AdjectivdStore       from './AdjectivdStore'
import initialState         from '../../StateGetter'
import {adjectivdExamples}  from '../../TestData'
import AppActionTypes       from '../../app/AppActionTypes'

describe('AdjectivdStore', function() {

    let state
    
    const adjectivds = () => Array.from(state.getIn(['coll']).values()).map(adjectivd => ({
        id: adjectivd.id,
        base: adjectivd.base
    }))

    beforeEach(() => {state = initialState.adjectivd.getIn(['dict'])})

    it('ON_CLICK_APP_RESET', function() {
        const initialState = state

        // Now do anything, doesn't matter what, to change the initial state
        //dispatch({type: AdjectivdActionTypes.INSERT_ADJECTIVD, adjectivd: adjectivdExamples.a})
        state = AdjectivdStore.reduce(state, {type: AdjectivdActionTypes.INSERT_ADJECTIVD, adjectivd: adjectivdExamples.a})

        expect(initialState).not.toBe(state)

        // Now reset the state
        state = AdjectivdStore.reduce(state, {type: AppActionTypes.ON_CLICK_APP_RESET})
        expect(initialState).toEqual(state)
    })

    it('ON_CLICK_DELETE_ADJECTIVD', function() {
        expect(adjectivds()).toEqual([])

        state = AdjectivdStore.reduce(state, {type: AdjectivdActionTypes.INSERT_ADJECTIVD, adjectivd: adjectivdExamples.a.set('id','')})
        state = AdjectivdStore.reduce(state, {type: AdjectivdActionTypes.INSERT_ADJECTIVD, adjectivd: adjectivdExamples.b.set('id','')})
        state = AdjectivdStore.reduce(state, {type: AdjectivdActionTypes.INSERT_ADJECTIVD, adjectivd: adjectivdExamples.c.set('id','')})

        state = AdjectivdStore.reduce(state, {type: AdjectivdActionTypes.ON_CLICK_DELETE_ADJECTIVD, id: '2'})
        expect(adjectivds()).toEqual([adjectivdExamples.a.toJSON(), adjectivdExamples.c.toJSON()])

        state = AdjectivdStore.reduce(state, {type: AdjectivdActionTypes.ON_CLICK_DELETE_ADJECTIVD, id: '3'})
        expect(adjectivds()).toEqual([adjectivdExamples.a.toJSON()])

        state = AdjectivdStore.reduce(state, {type: AdjectivdActionTypes.ON_CLICK_DELETE_ADJECTIVD, id: '1'})
        expect(adjectivds()).toEqual([])

    })

    it('ON_CLICK_SAVE_ADJECTIVD, new adjectivd', function() {
        // We know that this is a new record because adjectivd has no id.
        expect(adjectivds()).toEqual([])
        state = AdjectivdStore.reduce(state, {type: AdjectivdActionTypes.ON_CLICK_SAVE_ADJECTIVD, adjectivd: adjectivdExamples.a.set('id','')})
        expect(adjectivds()).toEqual([adjectivdExamples.a.toJSON()])
    })

    it('ON_CLICK_SAVE_ADJECTIVD, edit adjectivd', function() {
        expect(adjectivds()).toEqual([])

        // Watch this carefully, we play tricks with the id
        // Insert a new record and we know it will be assigned id = '1'
        // Then update that record.
        const update = adjectivdExamples.b.set('id','1')

        state = AdjectivdStore.reduce(state, {type: AdjectivdActionTypes.INSERT_ADJECTIVD, adjectivd: adjectivdExamples.a.set('id','')})
        state = AdjectivdStore.reduce(state, {type: AdjectivdActionTypes.ON_CLICK_SAVE_ADJECTIVD, adjectivd: update})

        expect(adjectivds()).toEqual([update.toJSON()])
    })

    it('INSERT_ADJECTIVD', function() {
        expect(adjectivds()).toEqual([])

        state = AdjectivdStore.reduce(state, {type: AdjectivdActionTypes.INSERT_ADJECTIVD, adjectivd: adjectivdExamples.a})
        expect(adjectivds()).toEqual([adjectivdExamples.a.toJSON()])

        state = AdjectivdStore.reduce(state, {type: AdjectivdActionTypes.INSERT_ADJECTIVD, adjectivd: adjectivdExamples.b})
        expect(adjectivds()).toEqual([adjectivdExamples.a.toJSON(), adjectivdExamples.b.toJSON()])
    })
})
