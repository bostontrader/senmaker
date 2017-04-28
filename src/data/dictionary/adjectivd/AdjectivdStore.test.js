import {Map} from 'immutable'

import Adjectivd            from './Adjectivd'
import AdjectivdActionTypes from './AdjectivdActionTypes'
import AdjectivdStore       from './AdjectivdStore'
import AppActionTypes       from '../../app/AppActionTypes'


describe('AdjectivdStore', function() {

    beforeEach(function() {
        //this.state = AdjectivdStore.getInitialState()
        // AdjectivdStore.getInitialState w/o any pre-loaded examples.
        this.state = Map({nextid:1, coll:Map()})

        // This function gets a more readable form of the adjectivd that we can pass
        // to expect(). It strips away the id.
        this.adjectivs = () => Array.from(this.state.getIn(['coll']).values()).map(adjectiv => ({
            base: adjectiv.base
            
            
        }))

        // This function is for setting up data, it will add all the adjectivd to the
        // state in a direct way.
        this.addAdjectivs = (adjectivs) => {
            let id = 0
            adjectivs.forEach(adjectiv => {
                this.state = this.state.setIn(['coll',id],
                    new Adjectivd({id, base: adjectiv.base})
                )
                id++
            })
        }
        
        // Because of how AdjectivdStore is set up it's not easy to get access to ids of
        // adjectivd. This will get the id of a particular adjectiv based on the index it
        // was added to state in.
        this.id = (index) => {
            if (this.state.getIn(['coll']).size <= index) {
                throw new Error(
                    'Requested id for an index that is larger than the size of the ' +
                    'current state.'
                )
            }
            return Array.from(this.state.getIn(['coll']).keys())[index]
        }
        
        this.dispatch = action => {this.state = AdjectivdStore.reduce(this.state, action)}

        this.example0 = {base: 'fat'}
        this.example1 = {base: 'drunk'}
        this.example2 = {base: 'stupid'}
    })

    it('ON_APP_RESET', function() {
        const initialState = this.state

        // Now do anything, doesn't matter what, to change the initial state
        this.dispatch({
            type: AdjectivdActionTypes.INSERT_ADJECTIVD,
            adjectivd: this.example0
        })
        expect(initialState).not.toBe(this.state)

        // Now reset the state
        this.dispatch({type: AppActionTypes.ON_APP_RESET})
        expect(initialState).toBe(this.state)
    })
    
    it('ON_CLICK_DELETE_ADJECTIVD', function() {
        expect(this.adjectivs()).toEqual([])
        this.addAdjectivs([
            this.example0,
            this.example1,
            this.example2,
        ])

        this.dispatch({
            type: AdjectivdActionTypes.ON_CLICK_DELETE_ADJECTIVD,
            id: this.id(2),
        })

        expect(this.adjectivs()).toEqual([
            this.example0,
            this.example1
        ])

        this.dispatch({
            type: AdjectivdActionTypes.ON_CLICK_DELETE_ADJECTIVD,
            id: this.id(0),
        })

        expect(this.adjectivs()).toEqual([this.example1])

        this.dispatch({
            type: AdjectivdActionTypes.ON_CLICK_DELETE_ADJECTIVD,
            id: this.id(0),
        })

        expect(this.adjectivs()).toEqual([])

    })

    it('ON_CLICK_SAVE_ADJECTIVD, new adjectivd', function() {
        // We know that this is a new record because adjectivd has no id.
        expect(this.adjectivs()).toEqual([])
        this.dispatch({
            type: AdjectivdActionTypes.ON_CLICK_SAVE_ADJECTIVD,
            adjectivd: this.example0
        })
        expect(this.adjectivs()).toEqual([this.example0])
    })

    it('ON_CLICK_SAVE_ADJECTIVD, edit adjectivd', function() {
        // We know that this is an update to an existing record because adjectivd has an id.
        expect(this.adjectivs()).toEqual([])
        this.dispatch({
            type: AdjectivdActionTypes.INSERT_ADJECTIVD,
            adjectivd: this.example0
        })

        this.dispatch({
            type: AdjectivdActionTypes.ON_CLICK_SAVE_ADJECTIVD,
            adjectivd: Adjectivd({id: this.id(0), base: 'drunk'})
        })

        expect(this.adjectivs()).toEqual([this.example1])
    })

    it('INSERT_ADJECTIVD', function() {
        expect(this.adjectivs()).toEqual([])

        this.dispatch({
            type: AdjectivdActionTypes.INSERT_ADJECTIVD,
            adjectivd: this.example0
        })

        expect(this.adjectivs()).toEqual([this.example0])

        this.dispatch({
            type: AdjectivdActionTypes.INSERT_ADJECTIVD,
            adjectivd: this.example1
        })

        expect(this.adjectivs()).toEqual([
            this.example0,
            this.example1
        ])
    })
})
