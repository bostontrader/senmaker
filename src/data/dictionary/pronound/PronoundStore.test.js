import PronoundActionTypes from './PronoundActionTypes'
import PronoundStore       from './PronoundStore'
import initialState     from '../../StateGetter'
import {pronoundExamples}  from '../../TestData'
import AppActionTypes   from '../../app/AppActionTypes'

describe('PronoundStore', () => {

    let state

    const pronounds = () => Array.from(state.getIn(['coll']).values()).map(pronound => ({
        id: pronound.id,
        base: pronound.base,
        plural: pronound.plural,
        pluralization_rule: pronound.pluralization_rule
    }))

    beforeEach(() => {state = initialState.pronound.getIn(['dict'])})

    it('ON_CLICK_APP_RESET', () => {
        const initialState = state

        // Now do anything, doesn't matter what, to change the initial state
        state = PronoundStore.reduce(state, {type: PronoundActionTypes.INSERT_PRONOUND, pronound: pronoundExamples.a})
        expect(initialState).not.toBe(state)

        // Now reset the state
        state = PronoundStore.reduce(state, {type: AppActionTypes.ON_CLICK_APP_RESET})
        expect(initialState).toEqual(state)
    })

    /*it('ON_CLICK_EXAMPLES', () => {
        expect(state.get('showExamplesButton')).toBe(true)

        state = PronoundStore.reduce(state, {type: AppActionTypes.ON_CLICK_EXAMPLES})
        expect(initialState).not.toBe(state)
        expect(pronounds()).toEqual([
            pronoundExamples.a.toJSON(),
            pronoundExamples.b.toJSON(),
            pronoundExamples.c.toJSON(),
            pronoundExamples.d.toJSON()
        ])

        expect(state.get('showExamplesButton')).toBe(false)
    })*/

    it('ON_CLICK_DELETE_PRONOUND', () => {
        expect(pronounds()).toEqual([])

        state = PronoundStore.reduce(state, {type: PronoundActionTypes.INSERT_PRONOUND, pronound: pronoundExamples.a})
        state = PronoundStore.reduce(state, {type: PronoundActionTypes.INSERT_PRONOUND, pronound: pronoundExamples.b})
        state = PronoundStore.reduce(state, {type: PronoundActionTypes.INSERT_PRONOUND, pronound: pronoundExamples.c})

        state = PronoundStore.reduce(state, {type: PronoundActionTypes.ON_CLICK_DELETE_PRONOUND, id: '2'})
        expect(pronounds()).toEqual([pronoundExamples.a.toJSON(), pronoundExamples.c.toJSON()])

        state = PronoundStore.reduce(state, {type: PronoundActionTypes.ON_CLICK_DELETE_PRONOUND, id: '3'})
        expect(pronounds()).toEqual([pronoundExamples.a.toJSON()])

        state = PronoundStore.reduce(state, {type: PronoundActionTypes.ON_CLICK_DELETE_PRONOUND, id: '1'})
        expect(pronounds()).toEqual([])
    })

    it('ON_CLICK_SAVE_PRONOUND, new pronound', () => {
        // We know that this is a new record because pronound has no id.
        expect(pronounds()).toEqual([])
        state = PronoundStore.reduce(state, {type: PronoundActionTypes.ON_CLICK_SAVE_PRONOUND, pronound: pronoundExamples.a.set('id','')})
        expect(pronounds()).toEqual([pronoundExamples.a.toJSON()])
    })

    it('ON_CLICK_SAVE_PRONOUND, edit pronound', () => {
        expect(pronounds()).toEqual([])

        // Watch this carefully, we play tricks with the id
        // Insert a new record and we know it will be assigned id = '1'
        // Then update that record.
        const update = pronoundExamples.b.set('id','1')

        state = PronoundStore.reduce(state, {type: PronoundActionTypes.INSERT_PRONOUND, pronound: pronoundExamples.a})
        state = PronoundStore.reduce(state, {type: PronoundActionTypes.ON_CLICK_SAVE_PRONOUND, pronound: update})

        expect(pronounds()).toEqual([update.toJSON()])
    })

    it('INSERT_PRONOUND', () => {
        expect(pronounds()).toEqual([])

        state = PronoundStore.reduce(state, {type: PronoundActionTypes.INSERT_PRONOUND, pronound: pronoundExamples.a})
        expect(pronounds()).toEqual([pronoundExamples.a.toJSON()])

        state = PronoundStore.reduce(state, {type: PronoundActionTypes.INSERT_PRONOUND, pronound: pronoundExamples.b})
        expect(pronounds()).toEqual([pronoundExamples.a.toJSON(), pronoundExamples.b.toJSON()])
    })
})
