import NoundActionTypes    from './NoundActionTypes'
import NoundStore          from './NoundStore'
import {PluralizationRule} from './NoundConstants'
import AppActionTypes      from '../../app/AppActionTypes'
import {noundExamples}     from '../../TestData'

describe('NoundStore', function() {

    beforeEach(function() {
        this.state = NoundStore.getInitialState()
        
        this.nounds = () => Array.from(this.state.getIn(['coll']).values()).map(nound => ({
            id: nound.id,
            base: nound.base,
            plural: nound.plural,
            pluralization_rule: nound.pluralization_rule
        }))

        this.dispatch = action => {this.state = NoundStore.reduce(this.state, action)}

    })

    it('ON_APP_RESET', function() {
        const initialState = this.state

        // Now do anything, doesn't matter what, to change the initial state
        this.dispatch({type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.a})
        expect(initialState).not.toBe(this.state)

        // Now reset the state
        this.dispatch({type: AppActionTypes.ON_APP_RESET})
        expect(initialState).toBe(this.state)
    })

    it('ON_CLICK_DELETE_NOUND', function() {
        expect(this.nounds()).toEqual([])

        this.dispatch({type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.a.set('id','')})
        this.dispatch({type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.b.set('id','')})
        this.dispatch({type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.c.set('id','')})

        this.dispatch({type: NoundActionTypes.ON_CLICK_DELETE_NOUND, id: '2'})
        expect(this.nounds()).toEqual([noundExamples.a.toJSON(), noundExamples.c.toJSON()])

        this.dispatch({type: NoundActionTypes.ON_CLICK_DELETE_NOUND, id: '3'})
        expect(this.nounds()).toEqual([noundExamples.a.toJSON()])

        this.dispatch({type: NoundActionTypes.ON_CLICK_DELETE_NOUND, id: '1'})
        expect(this.nounds()).toEqual([])

    })

    it('ON_CLICK_SAVE_NOUND, new nound', function() {
        // We know that this is a new record because nound has no id.
        expect(this.nounds()).toEqual([])
        this.dispatch({type: NoundActionTypes.ON_CLICK_SAVE_NOUND, nound: noundExamples.a.set('id','')})
        expect(this.nounds()).toEqual([noundExamples.a.toJSON()])
    })

    it('ON_CLICK_SAVE_NOUND, edit nound', function() {
        expect(this.nounds()).toEqual([])

        // Watch this carefully, we play tricks with the id
        // Insert a new record and we know it will be assigned id = '1'
        // Then update that record.
        const update = noundExamples.b.set('id','1')
        
        this.dispatch({type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.a.set('id','')})
        this.dispatch({type: NoundActionTypes.ON_CLICK_SAVE_NOUND, nound: update})

        expect(this.nounds()).toEqual([update.toJSON()])
    })

    it('INSERT_NOUND', function() {
        expect(this.nounds()).toEqual([])

        this.dispatch({type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.a})
        expect(this.nounds()).toEqual([noundExamples.a.toJSON()])

        this.dispatch({type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.b})
        expect(this.nounds()).toEqual([noundExamples.a.toJSON(), noundExamples.b.toJSON()])
    })
})
