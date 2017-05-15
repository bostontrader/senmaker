import {Map} from 'immutable'

import ClauseActionTypes   from './ClauseActionTypes'
import ClauseStore         from './ClauseStore'
import {clauseExamples}    from '../TestData'
import AppActionTypes  from '../app/AppActionTypes'

describe('ClauseStore', function() {

    /*beforeEach(function() {
        //this.state = ClauseStore.getInitialState()
        // ClauseStore.getInitialState w/o any pre-loaded examples.
        this.state = Map({nextid:1, coll:Map()})

        this.clauses = () => Array.from(this.state.getIn(['coll']).values()).map(clause => ({
            id: clause.id,
            np: clause.np.toJSON(),
            vp: clause.vp.toJSON(),
            generatedText: clause.generatedText
        }))

        this.dispatch = action => {this.state = ClauseStore.reduce(this.state, action)}

    })*/

    it('ON_CLICK_APP_RESET', function() {
        //const initialState = this.state
        // Now do anything, doesn't matter what, to change the initial state
        //this.dispatch({type: ClauseActionTypes.INSERT_CLAUSE, clause: clauseExamples.a})
        //expect(initialState).not.toBe(this.state)

        //this.dispatch({type: AppActionTypes.ON_CLICK_APP_RESET})
        //expect(initialState).toBe(this.state)
    })

    /*it('ON_CLICK_DELETE_CLAUSE', function() {
        expect(this.clauses()).toEqual([])

        this.dispatch({type: ClauseActionTypes.INSERT_CLAUSE, clause: clauseExamples.a.set('id','')})
        this.dispatch({type: ClauseActionTypes.INSERT_CLAUSE, clause: clauseExamples.b.set('id','')})
        this.dispatch({type: ClauseActionTypes.INSERT_CLAUSE, clause: clauseExamples.c.set('id','')})

        this.dispatch({type: ClauseActionTypes.ON_CLICK_DELETE_CLAUSE, id: '2'})
        expect(this.clauses()).toEqual([clauseExamples.a.toJSON(), clauseExamples.c.toJSON()])

        this.dispatch({type: ClauseActionTypes.ON_CLICK_DELETE_CLAUSE, id: '3'})
        expect(this.clauses()).toEqual([clauseExamples.a.toJSON()])

        this.dispatch({type: ClauseActionTypes.ON_CLICK_DELETE_CLAUSE, id: '1'})
        expect(this.clauses()).toEqual([])

    })

    it('ON_CLICK_SAVE_CLAUSE, new clause', function() {
        // We know that this is a new record because clause has no id.
        expect(this.clauses()).toEqual([])
        this.dispatch({type: ClauseActionTypes.ON_CLICK_SAVE_CLAUSE, clause: clauseExamples.a.set('id','')})
        expect(this.clauses()).toEqual([clauseExamples.a.toJSON()])
    })

    it('ON_CLICK_SAVE_CLAUSE, edit clause', function() {
        expect(this.clauses()).toEqual([])

        // Watch this carefully, we play tricks with the id
        // Insert a new record and we know it will be assigned id = '1'
        // Then update that record.
        const update = clauseExamples.b.set('id','1')

        this.dispatch({type: ClauseActionTypes.INSERT_CLAUSE, clause: clauseExamples.a.set('id','')})
        this.dispatch({type: ClauseActionTypes.ON_CLICK_SAVE_CLAUSE, clause: update})

        expect(this.clauses()).toEqual([update.toJSON()])
    })

    it('INSERT_CLAUSE', function() {
        expect(this.clauses()).toEqual([])

        this.dispatch({type: ClauseActionTypes.INSERT_CLAUSE, clause: clauseExamples.a.set('id','')})
        expect(this.clauses()).toEqual([clauseExamples.a.toJSON()])

        this.dispatch({type: ClauseActionTypes.INSERT_CLAUSE, clause: clauseExamples.b.set('id','')})
        expect(this.clauses()).toEqual([clauseExamples.a.toJSON(), clauseExamples.b.toJSON()])
    })*/
})
