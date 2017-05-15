import ClauseAEStore     from './ClauseAEStore'
import ClauseActionTypes from '../ClauseActionTypes'
import {npExamples}      from '../../TestData'
import {vpExamples}      from '../../TestData'
import {clauseExamples}  from '../../TestData'
import AppActionTypes    from '../../app/AppActionTypes'

describe('ClauseAEStore', function() {

    /*beforeEach(function() {
        this.state = ClauseAEStore.getInitialState()

        this.dispatch = action => {
            this.state = ClauseAEStore.reduce(this.state, action)
        }

        // Several tests want to reset the state back to the initial state.  In order to do
        // that we need to perturb the initial state into some perturbed state, so that we can
        // verify that our reset really does reset the state back to the initial state.
        this.perturbState = () => {
            this.dispatch({
                type: ClauseActionTypes.ON_CLICK_ADD_CLAUSE
            })
        }
    })*/

    it('ON_CLICK_APP_RESET', function() {
        //const initialState = this.state
        //this.perturbState()
        //expect(this.state).not.toBe(initialState)

        //this.dispatch({type: AppActionTypes.ON_CLICK_APP_RESET})
        //expect(this.state).toBe(initialState)
    })

    // Signal the UI to open the VPAddForm
    /*it('ON_CLICK_ADD_CLAUSE', function() {
        this.dispatch({type: ClauseActionTypes.ON_CLICK_ADD_CLAUSE})
        expect(this.state.get('addClause')).toBe(true)
    })

    // Signal the UI to close VPAddForm or VPEditForm
    it('ON_CLICK_CANCEL', function() {
        const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        // Now cancel.  This should reset the state.
        this.dispatch({type: ClauseActionTypes.ON_CLICK_CANCEL})
        expect(this.state).toBe(initialState)
    })

    // Signal the UI to close VPAddForm or VPEditForm.
    it('ON_CLICK_DELETE_CLAUSE', function() {
        const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        // Now close it
        this.dispatch({type: ClauseActionTypes.ON_CLICK_DELETE_CLAUSE})
        expect(this.state).toBe(initialState)
    })

    // Signal the UI to open VPEditForm and populate with the given data.
    it('ON_CLICK_EDIT_CLAUSE', function() {
        this.dispatch({
            type: ClauseActionTypes.ON_CLICK_EDIT_CLAUSE,
            clause: clauseExamples.a
        })
        expect(this.state.get('clause').toJSON()).toEqual(clauseExamples.a.toJSON())
    })*/

    // Signal the UI to close VPAddForm or VPEditForm. We don't test these two separately,
    // the same state should close either one.
    //
    // This action should have a vp that will be used for insert or update in VPStore.  But
    // here we only close the UI and the value of vp is unimportant.
    /*it('ON_CLICK_SAVE_CLAUSE, new vp', function() {
        const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        this.dispatch({type: ClauseActionTypes.ON_CLICK_SAVE_CLAUSE, clause: {}})
        expect(this.state).toBe(initialState)
    })*/
    
    /*it('Test calcResult', function() {
        expect(this.state.getIn(['clause','generatedText'])).toEqual('')

        // 1. VP, but no actionTime. Only base form of verb.
        // In this test, the value of id is unused.
        this.dispatch({
            type: ClauseActionTypes.ON_CHANGE_SELECTED_VERBD,
            newVerbd: verbdExamples.a
        })
        expect(this.state.getIn(['clause','generatedText'])).toEqual(verbdExamples.a.get('base'))

        // 2. actionTime, but no vp.
        this.dispatch({
            type: ClauseActionTypes.ON_CHANGE_ACTION_TIME,
            newActionTime: ActionTimeSelect.Past
        })
        this.dispatch({ // Fake reset to no selected vp
            type: ClauseActionTypes.ON_CHANGE_SELECTED_VERBD,
            newVerbd: Verbd()
        })
        expect(this.state.getIn(['clause','generatedText'])).toEqual('')

        // 3. Now give it a verbd and expect the past tense form.
        this.dispatch({
            type: ClauseActionTypes.ON_CHANGE_SELECTED_VERBD,
            newVerbd: verbdExamples.a
        })
        expect(this.state.getIn(['clause','generatedText'])).toEqual(verbdExamples.a.get('pastForm'))

        // 4. Now change to present tense
        this.dispatch({
            type: ClauseActionTypes.ON_CHANGE_ACTION_TIME,
            newActionTime: ActionTimeSelect.Present
        })
        //expect(this.state.getIn(['clause','generatedText'])).toEqual('eats')

        // 5. Now change to future tense
        this.dispatch({
            type: ClauseActionTypes.ON_CHANGE_ACTION_TIME,
            newActionTime: ActionTimeSelect.Future
        })
        //expect(this.state.getIn(['clause','generatedText'])).toEqual('will eat')

    })*/

    /*it('ON_CHANGE_SELECTED_NP', function() {
        this.dispatch({
            type: ClauseActionTypes.ON_CHANGE_SELECTED_NP,
            newNP: npExamples.a
        })
        expect(this.state.getIn(['clause','np']).toJSON()).toEqual(npExamples.a.toJSON())

        this.dispatch({
            type: ClauseActionTypes.ON_CHANGE_SELECTED_NP,
            newNP: npExamples.b
        })
        expect(this.state.getIn(['clause','np']).toJSON()).toEqual(npExamples.b.toJSON())
    })

    it('ON_CHANGE_SELECTED_VP', function() {
        this.dispatch({
            type: ClauseActionTypes.ON_CHANGE_SELECTED_VP,
            newVP: vpExamples.a
        })
        expect(this.state.getIn(['clause','vp']).toJSON()).toEqual(vpExamples.a.toJSON())

        this.dispatch({
            type: ClauseActionTypes.ON_CHANGE_SELECTED_VP,
            newVP: vpExamples.b
        })
        expect(this.state.getIn(['clause','vp']).toJSON()).toEqual(vpExamples.b.toJSON())
    })*/

})
