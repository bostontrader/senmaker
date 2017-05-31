import DeterminerdActionTypes from './DeterminerdActionTypes'
import DeterminerdStore       from './DeterminerdStore'
import initialState     from '../../StateGetter'
import {determinerdExamples}  from '../../TestData'
import AppActionTypes   from '../../app/AppActionTypes'

describe('DeterminerdStore', () => {

    let state

    const determinerds = () => Array.from(state.getIn(['coll']).values()).map(determinerd => ({
        id: determinerd.id,
        base: determinerd.base,
        plural: determinerd.plural,
        pluralization_rule: determinerd.pluralization_rule
    }))

    beforeEach(() => {state = initialState.determinerd.getIn(['dict'])})

    it('ON_CLICK_APP_RESET', () => {
        const initialState = state

        // Now do anything, doesn't matter what, to change the initial state
        state = DeterminerdStore.reduce(state, {type: DeterminerdActionTypes.INSERT_DETERMINERD, determinerd: determinerdExamples.a})
        expect(initialState).not.toBe(state)

        // Now reset the state
        state = DeterminerdStore.reduce(state, {type: AppActionTypes.ON_CLICK_APP_RESET})
        expect(initialState).toEqual(state)
    })

    /*it('ON_CLICK_EXAMPLES', () => {
        expect(state.get('showExamplesButton')).toBe(true)

        state = DeterminerdStore.reduce(state, {type: AppActionTypes.ON_CLICK_EXAMPLES})
        expect(initialState).not.toBe(state)
        expect(determinerds()).toEqual([
            determinerdExamples.a.toJSON(),
            determinerdExamples.b.toJSON(),
            determinerdExamples.c.toJSON(),
            determinerdExamples.d.toJSON()
        ])

        expect(state.get('showExamplesButton')).toBe(false)
    })*/

    it('ON_CLICK_DELETE_DETERMINERD', () => {
        expect(determinerds()).toEqual([])

        state = DeterminerdStore.reduce(state, {type: DeterminerdActionTypes.INSERT_DETERMINERD, determinerd: determinerdExamples.a})
        state = DeterminerdStore.reduce(state, {type: DeterminerdActionTypes.INSERT_DETERMINERD, determinerd: determinerdExamples.b})
        state = DeterminerdStore.reduce(state, {type: DeterminerdActionTypes.INSERT_DETERMINERD, determinerd: determinerdExamples.c})

        state = DeterminerdStore.reduce(state, {type: DeterminerdActionTypes.ON_CLICK_DELETE_DETERMINERD, id: '2'})
        expect(determinerds()).toEqual([determinerdExamples.a.toJSON(), determinerdExamples.c.toJSON()])

        state = DeterminerdStore.reduce(state, {type: DeterminerdActionTypes.ON_CLICK_DELETE_DETERMINERD, id: '3'})
        expect(determinerds()).toEqual([determinerdExamples.a.toJSON()])

        state = DeterminerdStore.reduce(state, {type: DeterminerdActionTypes.ON_CLICK_DELETE_DETERMINERD, id: '1'})
        expect(determinerds()).toEqual([])
    })

    it('ON_CLICK_SAVE_DETERMINERD, new determinerd', () => {
        // We know that this is a new record because determinerd has no id.
        expect(determinerds()).toEqual([])
        state = DeterminerdStore.reduce(state, {type: DeterminerdActionTypes.ON_CLICK_SAVE_DETERMINERD, determinerd: determinerdExamples.a.set('id','')})
        expect(determinerds()).toEqual([determinerdExamples.a.toJSON()])
    })

    it('ON_CLICK_SAVE_DETERMINERD, edit determinerd', () => {
        expect(determinerds()).toEqual([])

        // Watch this carefully, we play tricks with the id
        // Insert a new record and we know it will be assigned id = '1'
        // Then update that record.
        const update = determinerdExamples.b.set('id','1')

        state = DeterminerdStore.reduce(state, {type: DeterminerdActionTypes.INSERT_DETERMINERD, determinerd: determinerdExamples.a})
        state = DeterminerdStore.reduce(state, {type: DeterminerdActionTypes.ON_CLICK_SAVE_DETERMINERD, determinerd: update})

        expect(determinerds()).toEqual([update.toJSON()])
    })

    it('INSERT_DETERMINERD', () => {
        expect(determinerds()).toEqual([])

        state = DeterminerdStore.reduce(state, {type: DeterminerdActionTypes.INSERT_DETERMINERD, determinerd: determinerdExamples.a})
        expect(determinerds()).toEqual([determinerdExamples.a.toJSON()])

        state = DeterminerdStore.reduce(state, {type: DeterminerdActionTypes.INSERT_DETERMINERD, determinerd: determinerdExamples.b})
        expect(determinerds()).toEqual([determinerdExamples.a.toJSON(), determinerdExamples.b.toJSON()])
    })
})
