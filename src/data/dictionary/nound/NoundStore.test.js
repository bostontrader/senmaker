import NoundActionTypes from './NoundActionTypes'
import NoundStore       from './NoundStore'
import initialState     from '../../StateGetter'
import {noundExamples}  from '../../TestData'
import AppActionTypes   from '../../app/AppActionTypes'

describe('NoundStore', () => {

    let state

    const nounds = () => Array.from(state.getIn(['coll']).values()).map(nound => ({
        id: nound.id,
        base: nound.base,
        plural: nound.plural,
        pluralization_rule: nound.pluralization_rule
    }))

    beforeEach(() => {state = initialState.nound.getIn(['dict'])})

    it('ON_CLICK_APP_RESET', () => {
        const initialState = state

        // Now do anything, doesn't matter what, to change the initial state
        state = NoundStore.reduce(state, {type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.a})
        expect(initialState).not.toBe(state)

        // Now reset the state
        state = NoundStore.reduce(state, {type: AppActionTypes.ON_CLICK_APP_RESET})
        expect(initialState).toEqual(state)
    })

    /*it('ON_CLICK_EXAMPLES', () => {
        expect(state.get('showExamplesButton')).toBe(true)

        state = NoundStore.reduce(state, {type: AppActionTypes.ON_CLICK_EXAMPLES})
        expect(initialState).not.toBe(state)
        expect(nounds()).toEqual([
            noundExamples.a.toJSON(),
            noundExamples.b.toJSON(),
            noundExamples.c.toJSON(),
            noundExamples.d.toJSON()
        ])

        expect(state.get('showExamplesButton')).toBe(false)
    })*/

    it('ON_CLICK_DELETE_NOUND', () => {
        expect(nounds()).toEqual([])

        state = NoundStore.reduce(state, {type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.a})
        state = NoundStore.reduce(state, {type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.b})
        state = NoundStore.reduce(state, {type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.c})

        state = NoundStore.reduce(state, {type: NoundActionTypes.ON_CLICK_DELETE_NOUND, id: '2'})
        expect(nounds()).toEqual([noundExamples.a.toJSON(), noundExamples.c.toJSON()])

        state = NoundStore.reduce(state, {type: NoundActionTypes.ON_CLICK_DELETE_NOUND, id: '3'})
        expect(nounds()).toEqual([noundExamples.a.toJSON()])

        state = NoundStore.reduce(state, {type: NoundActionTypes.ON_CLICK_DELETE_NOUND, id: '1'})
        expect(nounds()).toEqual([])
    })

    it('ON_CLICK_SAVE_NOUND, new nound', () => {
        // We know that this is a new record because nound has no id.
        expect(nounds()).toEqual([])
        state = NoundStore.reduce(state, {type: NoundActionTypes.ON_CLICK_SAVE_NOUND, nound: noundExamples.a.set('id','')})
        expect(nounds()).toEqual([noundExamples.a.toJSON()])
    })

    it('ON_CLICK_SAVE_NOUND, edit nound', () => {
        expect(nounds()).toEqual([])

        // Watch this carefully, we play tricks with the id
        // Insert a new record and we know it will be assigned id = '1'
        // Then update that record.
        const update = noundExamples.b.set('id','1')

        state = NoundStore.reduce(state, {type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.a})
        state = NoundStore.reduce(state, {type: NoundActionTypes.ON_CLICK_SAVE_NOUND, nound: update})

        expect(nounds()).toEqual([update.toJSON()])
    })

    it('INSERT_NOUND', () => {
        expect(nounds()).toEqual([])

        state = NoundStore.reduce(state, {type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.a})
        expect(nounds()).toEqual([noundExamples.a.toJSON()])

        state = NoundStore.reduce(state, {type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.b})
        expect(nounds()).toEqual([noundExamples.a.toJSON(), noundExamples.b.toJSON()])
    })
})
