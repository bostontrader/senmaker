import NP                   from './NP'
import NPActionTypes        from './NPActionTypes'
import {DefinitenessSelect} from './NPConstants'
import NPStore              from './NPStore'
import {npExamples}         from '../TestData'
import AppActionTypes       from '../app/AppActionTypes'
import Nound                from '../dictionary/nound/Nound'
import {PluralizationRule}  from '../dictionary/nound/NoundConstants'

describe('NPStore', function() {

    /*beforeEach(function() {
        this.state = NPStore.getInitialState()

        this.verbPhrases = () => Array.from(this.state.getIn(['coll']).values()).map(np => ({
            id: np.id,
            nound: np.nound.toJSON(),
            definiteness: np.definiteness,
            generatedText: np.generatedText,
            adjectivds: np.adjectivds.toJSON()
        }))
        
        this.dispatch = action => {this.state = NPStore.reduce(this.state, action)}
        
    })*/

    it('ON_CLICK_APP_RESET', function() {
        //const initialState = this.state

        // Now do anything, doesn't matter what, to change the initial state
        //this.dispatch({type: NPActionTypes.INSERT_NP, np: npExamples.a})
        //expect(initialState).not.toBe(this.state)

        //this.dispatch({type: AppActionTypes.ON_CLICK_APP_RESET})
        //expect(initialState).toBe(this.state)
    })

    /*it('ON_CLICK_DELETE_NP', function() {
        expect(this.verbPhrases()).toEqual([])

        this.dispatch({type: NPActionTypes.INSERT_NP, np: npExamples.a.set('id','')})
        this.dispatch({type: NPActionTypes.INSERT_NP, np: npExamples.b.set('id','')})
        this.dispatch({type: NPActionTypes.INSERT_NP, np: npExamples.c.set('id','')})

        this.dispatch({type: NPActionTypes.ON_CLICK_DELETE_NP, id: '2'})
        expect(this.verbPhrases()).toEqual([npExamples.a.toJSON(), npExamples.c.toJSON()])

        this.dispatch({type: NPActionTypes.ON_CLICK_DELETE_NP, id: '3'})
        expect(this.verbPhrases()).toEqual([npExamples.a.toJSON()])

        this.dispatch({type: NPActionTypes.ON_CLICK_DELETE_NP, id: '1'})
        expect(this.verbPhrases()).toEqual([])

    })

    it('ON_CLICK_SAVE_NP, new np', function() {
        // We know that this is a new record because np has no id.
        expect(this.verbPhrases()).toEqual([])
        this.dispatch({type: NPActionTypes.ON_CLICK_SAVE_NP, np: npExamples.a.set('id','')})
        expect(this.verbPhrases()).toEqual([npExamples.a.toJSON()])
    })

    it('ON_CLICK_SAVE_NP, edit np', function() {
        expect(this.verbPhrases()).toEqual([])

        // Watch this carefully, we play tricks with the id
        // Insert a new record and we know it will be assigned id = '1'
        // Then update that record.
        const update = npExamples.b.set('id','1')

        this.dispatch({type: NPActionTypes.INSERT_NP, np: npExamples.a.set('id','')})
        this.dispatch({type: NPActionTypes.ON_CLICK_SAVE_NP, np: update})

        expect(this.verbPhrases()).toEqual([update.toJSON()])
    })

    it('INSERT_NP', function() {
        expect(this.verbPhrases()).toEqual([])

        this.dispatch({type: NPActionTypes.INSERT_NP, np: npExamples.a.set('id','')})
        expect(this.verbPhrases()).toEqual([npExamples.a.toJSON()])

        this.dispatch({type: NPActionTypes.INSERT_NP, np: npExamples.b.set('id','')})
        expect(this.verbPhrases()).toEqual([npExamples.a.toJSON(), npExamples.b.toJSON()])
    })*/
})
