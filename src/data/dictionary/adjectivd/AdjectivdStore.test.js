import Adjectivd              from './Adjectivd'
import AdjectivdActionTypes   from './AdjectivdActionTypes'
import AdjectivdStore         from './AdjectivdStore'
import Counter                from './Counter'
import AdjectivdAEActionTypes from './addedit/AdjectivdAEActionTypes'
import AppActionTypes      from '../../app/AppActionTypes'


describe('AdjectivdStore', function() {

    beforeEach(function() {
        this.state = AdjectivdStore.getInitialState()

        // This function gets a more readable form of the adjectivd that we can pass
        // to expect(). It strips away the id.
        this.adjectivs = () => Array.from(this.state.values()).map(adjectiv => ({
            base: adjectiv.base
            
            
        }))

        // This function is for setting up data, it will add all the adjectivd to the
        // state in a direct way.
        this.addAdjectivs = (adjectivs) => {
            adjectivs.forEach(adjectiv => {
                const id = Counter.increment()
                this.state = this.state.set(
                    id,
                    new Adjectivd({id, base: adjectiv.base})
                )
            })
        }
        
        // Because of how AdjectivdStore is set up it's not easy to get access to ids of
        // adjectivd. This will get the id of a particular adjectiv based on the index it
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
            this.state = AdjectivdStore.reduce(this.state, action)
        }
    })

    it('ON_APP_RESET', function() {
        const initialState = this.state

        // Now do anything, doesn't matter what, to change the initial state
        this.dispatch({
            type: AdjectivdActionTypes.INSERT_ADJECTIVD,
            adjectivd: {base: 'cat'}
        })
        expect(initialState).not.toBe(this.state)

        // Now reset the state
        this.dispatch({
            type: AppActionTypes.ON_APP_RESET
        })
        expect(initialState).toBe(this.state)
    })
    
    it('ON_CLICK_DELETE_ADJECTIVD', function() {
        expect(this.adjectivs()).toEqual([])
        this.addAdjectivs([
            {base: 'stupid'},
            {base: 'fat'},
            {base: 'lazy'},
        ])

        this.dispatch({
            type: AdjectivdAEActionTypes.ON_CLICK_DELETE_ADJECTIVD,
            id: this.id(2),
        })

        expect(this.adjectivs()).toEqual([
            {base: 'stupid'},
            {base: 'fat'}
        ])

        this.dispatch({
            type: AdjectivdAEActionTypes.ON_CLICK_DELETE_ADJECTIVD,
            id: this.id(0),
        })

        expect(this.adjectivs()).toEqual([
            {base: 'fat'}
        ])

        this.dispatch({
            type: AdjectivdAEActionTypes.ON_CLICK_DELETE_ADJECTIVD,
            id: this.id(0),
        })

        expect(this.adjectivs()).toEqual([])

    })

    it('ON_CLICK_SAVE_ADJECTIVD, new adjectivd', function() {
        // We know that this is a new record because adjectivd has no id.
        expect(this.adjectivs()).toEqual([])
        this.dispatch({
            type: AdjectivdAEActionTypes.ON_CLICK_SAVE_ADJECTIVD,
            adjectivd: {base: 'fat'}
        })
        expect(this.adjectivs()).toEqual([
            {base: 'fat'}
        ])
    })

    it('ON_CLICK_SAVE_ADJECTIVD, edit adjectivd', function() {
        // We know that this is an update to an existing record because adjectivd has an id.
        expect(this.adjectivs()).toEqual([])
        this.dispatch({
            type: AdjectivdActionTypes.INSERT_ADJECTIVD,
            adjectivd: {base: 'fat'}
        })

        this.dispatch({
            type: AdjectivdAEActionTypes.ON_CLICK_SAVE_ADJECTIVD,
            adjectivd: Adjectivd({id: this.id(0), base: 'lazy'})
        })

        expect(this.adjectivs()).toEqual([
            {base: 'lazy'}
        ])
    })

    it('INSERT_ADJECTIVD', function() {
        expect(this.adjectivs()).toEqual([])

        this.dispatch({
            type: AdjectivdActionTypes.INSERT_ADJECTIVD,
            adjectivd: {base: 'fat'}
        })

        expect(this.adjectivs()).toEqual([
            {base: 'fat'}
        ])

        this.dispatch({
            type: AdjectivdActionTypes.INSERT_ADJECTIVD,
            adjectivd: {base: 'lazy'}
        })

        expect(this.adjectivs()).toEqual([
            {base: 'fat'},
            {base: 'lazy'}
        ])
    })
})
