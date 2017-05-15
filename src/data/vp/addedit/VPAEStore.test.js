import VPAEStore          from './VPAEStore'
import VPActionTypes      from '../VPActionTypes'
import {ActionTimeSelect} from '../VPConstants'
import {verbdExamples}    from '../../TestData'
import {vpExamples}       from '../../TestData'
import AppActionTypes     from '../../app/AppActionTypes'
import Verbd              from '../../dictionary/verbd/Verbd'
//import {PastFormRule}     from '../../dictionary/verbd/VerbdConstants'

describe('VPAEStore', function() {

    /*beforeEach(function() {
        this.state = VPAEStore.getInitialState()

        this.dispatch = action => {
            this.state = VPAEStore.reduce(this.state, action)
        }

        // Several tests want to reset the state back to the initial state.  In order to do
        // that we need to perturb the initial state into some perturbed state, so that we can
        // verify that our reset really does reset the state back to the initial state.
        this.perturbState = () => {
            this.dispatch({
                type: VPActionTypes.ON_CLICK_ADD_VP
            })
        }
    })*/

    it('ON_CLICK_APP_RESET', function() {
        /*const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        this.dispatch({type: AppActionTypes.ON_CLICK_APP_RESET})
        expect(this.state).toBe(initialState)*/
    })

    // Signal the UI to open the VPAddForm
    /*it('ON_CLICK_ADD_VP', function() {
        this.dispatch({type: VPActionTypes.ON_CLICK_ADD_VP})
        expect(this.state.get('addVP')).toBe(true)
    })

    // Signal the UI to close VPAddForm or VPEditForm
    it('ON_CLICK_CANCEL', function() {
        const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        // Now cancel.  This should reset the state.
        this.dispatch({type: VPActionTypes.ON_CLICK_CANCEL})
        expect(this.state).toBe(initialState)
    })

    // Signal the UI to close VPAddForm or VPEditForm.
    it('ON_CLICK_DELETE_VP', function() {
        const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        // Now close it
        this.dispatch({type: VPActionTypes.ON_CLICK_DELETE_VP})
        expect(this.state).toBe(initialState)
    })

    // Signal the UI to open VPEditForm and populate with the given data.
    it('ON_CLICK_EDIT_VP', function() {
        this.dispatch({
            type: VPActionTypes.ON_CLICK_EDIT_VP,
            vp: vpExamples.a
        })
        expect(this.state.get('vp').toJSON()).toEqual(vpExamples.a.toJSON())
    })

    // Signal the UI to close VPAddForm or VPEditForm. We don't test these two separately,
    // the same state should close either one.
    //
    // This action should have a vp that will be used for insert or update in VPStore.  But
    // here we only close the UI and the value of vp is unimportant.
    it('ON_CLICK_SAVE_VP, new vp', function() {
        const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        this.dispatch({type: VPActionTypes.ON_CLICK_SAVE_VP, vp: {}})
        expect(this.state).toBe(initialState)
    })
    
    it('Test calcResult', function() {
        expect(this.state.getIn(['vp','generatedText'])).toEqual('')

        // 1. VP, but no actionTime. Only base form of verb.
        // In this test, the value of id is unused.
        this.dispatch({
            type: VPActionTypes.ON_CHANGE_SELECTED_VERBD,
            newVerbd: verbdExamples.a
        })
        expect(this.state.getIn(['vp','generatedText'])).toEqual(verbdExamples.a.get('base'))

        // 2. actionTime, but no vp.
        this.dispatch({
            type: VPActionTypes.ON_CHANGE_ACTION_TIME,
            newActionTime: ActionTimeSelect.Past
        })
        this.dispatch({ // Fake reset to no selected vp
            type: VPActionTypes.ON_CHANGE_SELECTED_VERBD,
            newVerbd: Verbd()
        })
        expect(this.state.getIn(['vp','generatedText'])).toEqual('')

        // 3. Now give it a verbd and expect the past form form.
        this.dispatch({
            type: VPActionTypes.ON_CHANGE_SELECTED_VERBD,
            newVerbd: verbdExamples.a
        })
        expect(this.state.getIn(['vp','generatedText'])).toEqual(verbdExamples.a.get('pastForm'))

        // 4. Now change to present tense
        this.dispatch({
            type: VPActionTypes.ON_CHANGE_ACTION_TIME,
            newActionTime: ActionTimeSelect.Present
        })
        //expect(this.state.getIn(['vp','generatedText'])).toEqual('eats')

        // 5. Now change to future tense
        this.dispatch({
            type: VPActionTypes.ON_CHANGE_ACTION_TIME,
            newActionTime: ActionTimeSelect.Future
        })
        //expect(this.state.getIn(['vp','generatedText'])).toEqual('will eat')

    })

    it('ON_CHANGE_SELECTED_VERBD', function() {
        this.dispatch({type: VPActionTypes.ON_CHANGE_SELECTED_VERBD, newVerbd: verbdExamples.a})
        expect(this.state.getIn(['vp','verbd']).toJSON()).toEqual(verbdExamples.a.toJSON())
    })
    
    it('ON_CHANGE_ACTION_TIME', function() {
        expect(this.state.getIn(['vp','actionTime'])).toBe(ActionTimeSelect.Present)
        this.dispatch({type: VPActionTypes.ON_CHANGE_ACTION_TIME, newActionTime: ActionTimeSelect.Past})
        expect(this.state.getIn(['vp','actionTime'])).toBe(ActionTimeSelect.Past)
    })

    // We cannot directly change simple from true to false because
    // if we could then perfect and progressive would also be false and that does not compute.
    it('ON_CHANGE_SIMPLE from true to false', function() {
        expect(this.state.getIn(['vp','simple'])).toBe(true)
        this.dispatch({type: VPActionTypes.ON_CHANGE_SIMPLE, newSimple: false})
        expect(this.state.getIn(['vp','simple'])).toBe(true) // no change
    })

    // This should set perfect and progressive to false
    it('ON_CHANGE_SIMPLE from false to true', function() {
        // this.dispatch({type: VPActionTypes.ON_CHANGE_SIMPLE,      newSimple: false}) cannot do this
        this.dispatch({type: VPActionTypes.ON_CHANGE_PERFECT,     newPerfect: true})
        this.dispatch({type: VPActionTypes.ON_CHANGE_PROGRESSIVE, newProgressive: true})
        expect(this.state.getIn(['vp','simple'])).toBe(false)
        expect(this.state.getIn(['vp','perfect'])).toBe(true)
        expect(this.state.getIn(['vp','progressive'])).toBe(true)

        this.dispatch({type: VPActionTypes.ON_CHANGE_SIMPLE, newSimple: true})
        expect(this.state.getIn(['vp','simple'])).toBe(true)
        expect(this.state.getIn(['vp','perfect'])).toBe(false)
        expect(this.state.getIn(['vp','progressive'])).toBe(false)
    })

    it('ON_CHANGE_PERFECT to true', function() {
        expect(this.state.getIn(['vp','simple'])).toBe(true)
        expect(this.state.getIn(['vp','perfect'])).toBe(false)

        this.dispatch({type: VPActionTypes.ON_CHANGE_PERFECT, newPerfect: true})
        expect(this.state.getIn(['vp','simple'])).toBe(false)
        expect(this.state.getIn(['vp','perfect'])).toBe(true)
    })

    it('ON_CHANGE_PROGRESSIVE to true', function() {
        expect(this.state.getIn(['vp','simple'])).toBe(true)
        expect(this.state.getIn(['vp','progressive'])).toBe(false)

        this.dispatch({type: VPActionTypes.ON_CHANGE_PROGRESSIVE, newProgressive: true})
        expect(this.state.getIn(['vp','simple'])).toBe(false)
        expect(this.state.getIn(['vp','progressive'])).toBe(true)
    })

    it('ON_CHANGE_PERFECT to false and then ON_CHANGE_PROGRESSIVE to false', function() {
        this.dispatch({type: VPActionTypes.ON_CHANGE_PERFECT, newPerfect: true})
        this.dispatch({type: VPActionTypes.ON_CHANGE_PROGRESSIVE, newProgressive: true})
        expect(this.state.getIn(['vp','simple'])).toBe(false)

        this.dispatch({type: VPActionTypes.ON_CHANGE_PERFECT, newPerfect: false})
        expect(this.state.getIn(['vp','simple'])).toBe(false)

        this.dispatch({type: VPActionTypes.ON_CHANGE_PROGRESSIVE, newProgressive: false})
        expect(this.state.getIn(['vp','simple'])).toBe(true)
    })

    it('ON_CHANGE_PROGRESSIVE to false and then ON_CHANGE_PERFECT to false', function() {
        this.dispatch({type: VPActionTypes.ON_CHANGE_PERFECT, newPerfect: true})
        this.dispatch({type: VPActionTypes.ON_CHANGE_PROGRESSIVE, newProgressive: true})
        expect(this.state.getIn(['vp','simple'])).toBe(false)

        this.dispatch({type: VPActionTypes.ON_CHANGE_PROGRESSIVE, newProgressive: false})
        expect(this.state.getIn(['vp','simple'])).toBe(false)

        this.dispatch({type: VPActionTypes.ON_CHANGE_PERFECT, newPerfect: false})
        expect(this.state.getIn(['vp','simple'])).toBe(true)
    })*/

})
