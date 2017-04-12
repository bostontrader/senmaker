//import Counter             from './Counter'
//import NP               from './NP'
import NPActionTypes    from './NPActionTypes'
import NPStore          from './NPStore'
//import {PluralizationRule} from './NPConstants'
//import NPAEActionTypes  from './addedit/NPAEActionTypes'
import AppActionTypes      from '../app/AppActionTypes'

describe('NPStore', function() {

    beforeEach(function() {
        this.state = NPStore.getInitialState()

        // This function gets a more readable form of the np that we can pass
        // to expect(). It strips away the id.
        this.nps = () => Array.from(this.state.values()).map(np => ({
            base: np.base
        }))

        // This function is for setting up data, it will add all the np to the
        // state in a direct way.
        this.addNouns = (nps) => {
            nps.forEach(np => {
                const id = Counter.increment()
                this.state = this.state.set(
                    id,
                    new NP({id, base: np.base})
                )
            })
        }
        
        // Because of how NPStore is set up it's not easy to get access to ids of
        // np. This will get the id of a particular np based on the index it
        // was added to state in.
        this.id = (index) => {
            if (this.state.size <= index) {
                throw new Error(
                    'Requested id for an index that is larger than the size of the ' +
                    'current state.'
                )
            }
            return Array.from(this.state.keys())[index]
        }

        this.dispatch = action => {
            this.state = NPStore.reduce(this.state, action)
        }
    })

    it('ON_APP_RESET', function() {
        const initialState = this.state

        // Now do anything, doesn't matter what, to change the initial state
        this.dispatch({
            type: NPActionTypes.INSERT_NP,
            np: {base: 'cat'}
        })
        expect(initialState).not.toBe(this.state)

        // Now reset the state
        this.dispatch({
            type: AppActionTypes.ON_APP_RESET
        })
        expect(initialState).toBe(this.state)
    })

    /*it('ON_CLICK_DELETE_NP', function() {
        expect(this.nps()).toEqual([])
        this.addNouns([
            {base: 'apple'},
            {base: 'box'},
            {base: 'cat'},
        ])

        this.dispatch({
            type: NPAEActionTypes.ON_CLICK_DELETE_NP,
            id: this.id(2),
        })

        expect(this.nps()).toEqual([
            {base: 'apple'},
            {base: 'box'}
        ])

        this.dispatch({
            type: NPAEActionTypes.ON_CLICK_DELETE_NP,
            id: this.id(0),
        })

        expect(this.nps()).toEqual([
            {base: 'box'}
        ])

        this.dispatch({
            type: NPAEActionTypes.ON_CLICK_DELETE_NP,
            id: this.id(0),
        })

        expect(this.nps()).toEqual([])

    })

    it('ON_CLICK_SAVE_NP, new np', function() {
        // We know that this is a new record because np has no id.
        expect(this.nps()).toEqual([])
        this.dispatch({
            type: NPAEActionTypes.ON_CLICK_SAVE_NP,
            np: {base: 'cat'}
        })
        expect(this.nps()).toEqual([
            {base: 'cat'}
        ])
    })

    it('ON_CLICK_SAVE_NP, edit np', function() {
        // We know that this is an update to an existing record because np has an id.
        expect(this.nps()).toEqual([])
        this.dispatch({
            type: NPActionTypes.INSERT_NP,
            np: {base: 'cat'}
        })

        this.dispatch({
            type: NPAEActionTypes.ON_CLICK_SAVE_NP,
            np: NP({id: this.id(0), base: 'box'})
        })

        expect(this.nps()).toEqual([
            {base: 'box'}
        ])
    })

    it('INSERT_NP', function() {
        expect(this.nps()).toEqual([])

        this.dispatch({
            type: NPActionTypes.INSERT_NP,
            np: {base: 'cat'}
        })

        expect(this.nps()).toEqual([
            {base: 'cat'}
        ])

        this.dispatch({
            type: NPActionTypes.INSERT_NP,
            np: {base: 'box'}
        })

        expect(this.nps()).toEqual([
            {base: 'cat'},
            {base: 'box'}
        ])
    })*/
})
