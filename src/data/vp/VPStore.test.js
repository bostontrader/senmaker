import VP              from './VP'
import VPActionTypes   from './VPActionTypes'
import VPStore         from './VPStore'
import {vpExamples}    from '../TestData'
import AppActionTypes  from '../app/AppActionTypes'
import Verbd           from '../dictionary/verbd/Verbd'
import {PastTenseRule} from '../dictionary/verbd/VerbdConstants'

describe('VPStore', function() {

    beforeEach(function() {
        this.state = VPStore.getInitialState()

        this.verbPhrases = () => Array.from(this.state.getIn(['coll']).values()).map(vp => ({
            id: vp.id,
            verbd: vp.verbd.toJSON(),
            actionTime: vp.actionTime,
            generatedText: vp.generatedText
        }))

        this.dispatch = action => {this.state = VPStore.reduce(this.state, action)}

    })

    it('ON_APP_RESET', function() {
        const initialState = this.state

        // Now do anything, doesn't matter what, to change the initial state
        this.dispatch({type: VPActionTypes.INSERT_VP, vp: vpExamples.a})
        expect(initialState).not.toBe(this.state)

        this.dispatch({type: AppActionTypes.ON_APP_RESET})
        expect(initialState).toBe(this.state)
    })

    it('ON_CLICK_DELETE_VP', function() {
        expect(this.verbPhrases()).toEqual([])

        this.dispatch({type: VPActionTypes.INSERT_VP, vp: vpExamples.a.set('id','')})
        this.dispatch({type: VPActionTypes.INSERT_VP, vp: vpExamples.b.set('id','')})
        this.dispatch({type: VPActionTypes.INSERT_VP, vp: vpExamples.c.set('id','')})

        this.dispatch({type: VPActionTypes.ON_CLICK_DELETE_VP, id: '2'})
        expect(this.verbPhrases()).toEqual([vpExamples.a.toJSON(), vpExamples.c.toJSON()])

        this.dispatch({type: VPActionTypes.ON_CLICK_DELETE_VP, id: '3'})
        expect(this.verbPhrases()).toEqual([vpExamples.a.toJSON()])

        this.dispatch({type: VPActionTypes.ON_CLICK_DELETE_VP, id: '1'})
        expect(this.verbPhrases()).toEqual([])

    })

    it('ON_CLICK_SAVE_VP, new vp', function() {
        // We know that this is a new record because vp has no id.
        expect(this.verbPhrases()).toEqual([])
        this.dispatch({type: VPActionTypes.ON_CLICK_SAVE_VP, vp: vpExamples.a.set('id','')})
        expect(this.verbPhrases()).toEqual([vpExamples.a.toJSON()])
    })

    it('ON_CLICK_SAVE_VP, edit vp', function() {
        expect(this.verbPhrases()).toEqual([])

        // Watch this carefully, we play tricks with the id
        // Insert a new record and we know it will be assigned id = '1'
        // Then update that record.
        const update = vpExamples.b.set('id','1')

        this.dispatch({type: VPActionTypes.INSERT_VP, vp: vpExamples.a.set('id','')})
        this.dispatch({type: VPActionTypes.ON_CLICK_SAVE_VP, vp: update})

        expect(this.verbPhrases()).toEqual([update.toJSON()])
    })

    it('INSERT_VP', function() {
        expect(this.verbPhrases()).toEqual([])

        this.dispatch({type: VPActionTypes.INSERT_VP, vp: vpExamples.a.set('id','')})
        expect(this.verbPhrases()).toEqual([vpExamples.a.toJSON()])

        this.dispatch({type: VPActionTypes.INSERT_VP, vp: vpExamples.b.set('id','')})
        expect(this.verbPhrases()).toEqual([vpExamples.a.toJSON(), vpExamples.b.toJSON()])
    })
})
