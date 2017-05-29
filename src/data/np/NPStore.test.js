import NPActionTypes  from './NPActionTypes'
import NPStore        from './NPStore'
import initialState   from '../StateGetter'
import {npExamples}   from '../TestData'
import AppActionTypes from '../app/AppActionTypes'

describe('NPStore', () => {

    let state

    const nps = () => Array.from(state.getIn(['coll']).values()).map(np => ({
        id: np.id,
        nound: np.nound.toJSON(),
        definiteness: np.definiteness,
        generatedText: np.generatedText,
        adjectivds: np.adjectivds.toJSON()
    }))

    beforeEach(() => {state = initialState.np.getIn(['dict'])})

    it('ON_CLICK_APP_RESET', () => {
        const initialState = state

        // Now do anything, doesn't matter what, to change the initial state
        state = NPStore.reduce(state, {type: NPActionTypes.INSERT_NP, np: npExamples.a})
        expect(initialState).not.toBe(state)

        // Now reset the state
        state = NPStore.reduce(state, {type: AppActionTypes.ON_CLICK_APP_RESET})
        expect(initialState).toEqual(state)
    })

    it('ON_CLICK_EXAMPLES', () => {
        expect(state.get('showExamplesButton')).toBe(true)

        state = NPStore.reduce(state, {type: AppActionTypes.ON_CLICK_EXAMPLES})
        expect(initialState).not.toBe(state)
        expect(nps()).toEqual([
            npExamples.a.toJSON(),
            npExamples.b.toJSON(),
            npExamples.c.toJSON()
        ])

        expect(state.get('showExamplesButton')).toBe(false)
    })

    it('ON_CLICK_DELETE_NP', () => {
        expect(nps()).toEqual([])

        state = NPStore.reduce(state, {type: NPActionTypes.INSERT_NP, np: npExamples.a})
        state = NPStore.reduce(state, {type: NPActionTypes.INSERT_NP, np: npExamples.b})
        state = NPStore.reduce(state, {type: NPActionTypes.INSERT_NP, np: npExamples.c})

        state = NPStore.reduce(state, {type: NPActionTypes.ON_CLICK_DELETE_NP, id: '2'})
        expect(nps()).toEqual([npExamples.a.toJSON(), npExamples.c.toJSON()])

        state = NPStore.reduce(state, {type: NPActionTypes.ON_CLICK_DELETE_NP, id: '3'})
        expect(nps()).toEqual([npExamples.a.toJSON()])

        state = NPStore.reduce(state, {type: NPActionTypes.ON_CLICK_DELETE_NP, id: '1'})
        expect(nps()).toEqual([])
    })

    it('ON_CLICK_SAVE_NP, new np', () => {
        // We know that this is a new record because np has no id.
        expect(nps()).toEqual([])
        state = NPStore.reduce(state, {type: NPActionTypes.ON_CLICK_SAVE_NP, np: npExamples.a.set('id','')})
        expect(nps()).toEqual([npExamples.a.toJSON()])
    })

    it('ON_CLICK_SAVE_NP, edit np', () => {
        expect(nps()).toEqual([])

        // Watch this carefully, we play tricks with the id
        // Insert a new record and we know it will be assigned id = '1'
        // Then update that record.
        const update = npExamples.b.set('id','1')

        state = NPStore.reduce(state, {type: NPActionTypes.INSERT_NP, np: npExamples.a})
        state = NPStore.reduce(state, {type: NPActionTypes.ON_CLICK_SAVE_NP, np: update})

        expect(nps()).toEqual([update.toJSON()])
    })

    it('INSERT_NP', () => {
        expect(nps()).toEqual([])

        state = NPStore.reduce(state, {type: NPActionTypes.INSERT_NP, np: npExamples.a})
        expect(nps()).toEqual([npExamples.a.toJSON()])

        state = NPStore.reduce(state, {type: NPActionTypes.INSERT_NP, np: npExamples.b})
        expect(nps()).toEqual([npExamples.a.toJSON(), npExamples.b.toJSON()])
    })
})
