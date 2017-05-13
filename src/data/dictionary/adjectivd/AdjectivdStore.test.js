import AdjectivdActionTypes from './AdjectivdActionTypes'
import AdjectivdStore       from './AdjectivdStore'
import AppActionTypes       from '../../app/AppActionTypes'
import {adjectivdExamples}  from '../../TestData'

describe('AdjectivdStore', function() {

    beforeEach(function() {
        this.state = AdjectivdStore.getInitialState()

        this.adjectivds = () => Array.from(this.state.getIn(['coll']).values()).map(adjectivd => ({
            id: adjectivd.id,
            base: adjectivd.base
        }))

        this.dispatch = action => {this.state = AdjectivdStore.reduce(this.state, action)}

    })

    it('ON_CLICK_APP_RESET', function() {
        const initialState = this.state

        // Now do anything, doesn't matter what, to change the initial state
        this.dispatch({type: AdjectivdActionTypes.INSERT_ADJECTIVD, adjectivd: adjectivdExamples.a})
        expect(initialState).not.toBe(this.state)

        // Now reset the state
        this.dispatch({type: AppActionTypes.ON_CLICK_APP_RESET})
        expect(initialState).toBe(this.state)
    })

    it('ON_CLICK_DELETE_ADJECTIVD', function() {
        expect(this.adjectivds()).toEqual([])

        this.dispatch({type: AdjectivdActionTypes.INSERT_ADJECTIVD, adjectivd: adjectivdExamples.a.set('id','')})
        this.dispatch({type: AdjectivdActionTypes.INSERT_ADJECTIVD, adjectivd: adjectivdExamples.b.set('id','')})
        this.dispatch({type: AdjectivdActionTypes.INSERT_ADJECTIVD, adjectivd: adjectivdExamples.c.set('id','')})

        this.dispatch({type: AdjectivdActionTypes.ON_CLICK_DELETE_ADJECTIVD, id: '2'})
        expect(this.adjectivds()).toEqual([adjectivdExamples.a.toJSON(), adjectivdExamples.c.toJSON()])

        this.dispatch({type: AdjectivdActionTypes.ON_CLICK_DELETE_ADJECTIVD, id: '3'})
        expect(this.adjectivds()).toEqual([adjectivdExamples.a.toJSON()])

        this.dispatch({type: AdjectivdActionTypes.ON_CLICK_DELETE_ADJECTIVD, id: '1'})
        expect(this.adjectivds()).toEqual([])

    })

    it('ON_CLICK_SAVE_ADJECTIVD, new adjectivd', function() {
        // We know that this is a new record because adjectivd has no id.
        expect(this.adjectivds()).toEqual([])
        this.dispatch({type: AdjectivdActionTypes.ON_CLICK_SAVE_ADJECTIVD, adjectivd: adjectivdExamples.a.set('id','')})
        expect(this.adjectivds()).toEqual([adjectivdExamples.a.toJSON()])
    })

    it('ON_CLICK_SAVE_ADJECTIVD, edit adjectivd', function() {
        expect(this.adjectivds()).toEqual([])

        // Watch this carefully, we play tricks with the id
        // Insert a new record and we know it will be assigned id = '1'
        // Then update that record.
        const update = adjectivdExamples.b.set('id','1')

        this.dispatch({type: AdjectivdActionTypes.INSERT_ADJECTIVD, adjectivd: adjectivdExamples.a.set('id','')})
        this.dispatch({type: AdjectivdActionTypes.ON_CLICK_SAVE_ADJECTIVD, adjectivd: update})

        expect(this.adjectivds()).toEqual([update.toJSON()])
    })

    it('INSERT_ADJECTIVD', function() {
        expect(this.adjectivds()).toEqual([])

        this.dispatch({type: AdjectivdActionTypes.INSERT_ADJECTIVD, adjectivd: adjectivdExamples.a})
        expect(this.adjectivds()).toEqual([adjectivdExamples.a.toJSON()])

        this.dispatch({type: AdjectivdActionTypes.INSERT_ADJECTIVD, adjectivd: adjectivdExamples.b})
        expect(this.adjectivds()).toEqual([adjectivdExamples.a.toJSON(), adjectivdExamples.b.toJSON()])
    })
})
