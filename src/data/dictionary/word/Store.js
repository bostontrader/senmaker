import initialState         from '../../StateGetter'
import AppActionTypes       from '../../app/AppActionTypes'

const testFunction = (Store, ActionTypes, wordType, examples) => {

    const WORDTYPE = wordType.toUpperCase()
    const save_key = 'ON_CLICK_SAVE_' + WORDTYPE
    const delete_key = 'ON_CLICK_DELETE_' + WORDTYPE
    const insert_key = 'INSERT_' + WORDTYPE

    let state

    const words = () => Array.from(state.getIn(['coll']).values()).map(word => word.toJSON() )

    beforeEach(() => {state = initialState[wordType].get('dict')})

    it('ON_CLICK_APP_RESET', function() {
        const initialState = state

        // Now do anything, doesn't matter what, to change the initial state
        state = Store.reduce(state, {type: ActionTypes[insert_key], [wordType]: examples['1']})
        expect(initialState).not.toBe(state)

        // Now reset the state
        state = Store.reduce(state, {type: AppActionTypes.ON_CLICK_APP_RESET})
        expect(initialState).toEqual(state)
    })

    it(save_key + ', new', function() {
        // We know that this is a new record because it has no id.
        expect(words()).toEqual([])
        state = Store.reduce(state, {type: ActionTypes[save_key], [wordType]: examples['1'].set('id','')})
        expect(words()).toEqual([examples['1'].toJSON()])
    })

    it(save_key + ', edit', function() {
        expect(words()).toEqual([])

        // Watch this carefully, we play tricks with the id
        // Insert a new record and we know it will be assigned id = '1'
        // Then update that record.
        const update = examples['2'].set('id','1')

        state = Store.reduce(state, {type: ActionTypes[insert_key], [wordType]: examples['1'].set('id','')})
        state = Store.reduce(state, {type: ActionTypes[save_key], [wordType]: update})

        expect(words()).toEqual([update.toJSON()])
    })

    it(delete_key, function() {
        expect(words()).toEqual([])

        state = Store.reduce(state, {type: ActionTypes[insert_key], [wordType]: examples['1']})
        state = Store.reduce(state, {type: ActionTypes[insert_key], [wordType]: examples['2']})
        state = Store.reduce(state, {type: ActionTypes[insert_key], [wordType]: examples['3']})

        state = Store.reduce(state, {type: ActionTypes[delete_key], id: '2'})
        expect(words()).toEqual([examples['1'].toJSON(), examples['3'].toJSON()])

        state = Store.reduce(state, {type: ActionTypes[delete_key], id: '3'})
        expect(words()).toEqual([examples['1'].toJSON()])

        state = Store.reduce(state, {type: ActionTypes[delete_key], id: '1'})
        expect(words()).toEqual([])
    })

    it(insert_key, function() {
        expect(words()).toEqual([])

        state = Store.reduce(state, {type: ActionTypes[insert_key], [wordType]: examples['1']})
        expect(words()).toEqual([examples['1'].toJSON()])

        state = Store.reduce(state, {type: ActionTypes[insert_key], [wordType]: examples['2']})
        expect(words()).toEqual([examples['1'].toJSON(), examples['2'].toJSON()])
    })
}

export {testFunction}
