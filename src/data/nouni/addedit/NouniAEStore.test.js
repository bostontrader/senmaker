import NouniAEActionTypes   from './NouniAEActionTypes'
import NouniAEStore         from './NouniAEStore'
import {DefinitenessSelect} from '../NouniConstants'
import AppActionTypes       from '../../app/AppActionTypes'
import {PluralizationRule}  from '../../dictionary/nound/NoundConstants'

//import NouniActionTypes    from '../../dictionary/nouni/NouniActionTypes'
//import Nouni                from '../../dictionary/nouni/Nouni'

describe('NouniAEStore', function() {

    beforeEach(function() {
        this.state = NouniAEStore.getInitialState()

        this.dispatch = action => {
            this.state = NouniAEStore.reduce(this.state, action)
        }

        // Several tests want to reset the state back to the initial state.  In order to do
        // that we need to perturb the initial state into some perturbed state, so that we can
        // verify that our reset really does reset the state back to the initial state.
        this.perturbState = () => {
            this.dispatch({
                type: NouniAEActionTypes.ON_CLICK_ADD_NOUNI
            })
        }
    })

    it('ON_APP_RESET', function() {
        const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        this.dispatch({type: AppActionTypes.ON_APP_RESET})
        expect(this.state).toBe(initialState)
    })

    // Signal the UI to open the NouniAddForm
    it('ON_CLICK_ADD_NOUNI', function() {
        this.dispatch({type: NouniAEActionTypes.ON_CLICK_ADD_NOUNI})
        expect(this.state.get('addNouni')).toBe(true)
    })

    // Signal the UI to close NouniAddForm or NouniEditForm
    it('ON_CLICK_CANCEL', function() {
        const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        // Now cancel.  This should reset the state.
        this.dispatch({type: NouniAEActionTypes.ON_CLICK_CANCEL})
        expect(this.state).toBe(initialState)
    })

    // Signal the UI to close NouniAddForm or NouniEditForm. We don't test these two separately,
    // the same state should close either one. But the delete button is only available on NouniEditForm.
    it('ON_CLICK_DELETE_NOUNI', function() {
        const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        // Now close it
        this.dispatch({
            type: NouniAEActionTypes.ON_CLICK_DELETE_NOUNI,
            nouni: {} // This action doesn't care about the nouni
        })
        expect(this.state).toBe(initialState)
    })

    // Signal the UI to open NouniEditForm and populate with the given data.
    it('ON_CLICK_EDIT_NOUNI', function() {
        this.dispatch({
            type: NouniAEActionTypes.ON_CLICK_EDIT_NOUNI,
            nouni: {
                id: '1',
                nound: {id: '1', base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s},
                definiteness: DefinitenessSelect.Definite,
                generatedText: 'the cat'
            }
        })
        expect(this.state.get('nouni').toJSON()).toEqual({
            id: '1',
            nound: {id: '1', base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s},
            definiteness: DefinitenessSelect.Definite,
            generatedText: 'the cat'
        })
    })

    // Signal the UI to close NouniAddForm or NouniEditForm. We don't test these two separately,
    // the same state should close either one.
    //
    // This action should have a nouni that will be used for insert or update in NouniStore.  But
    // here we only close the UI and the value of nouni is unimportant.
    it('ON_CLICK_SAVE_NOUNI, new nouni', function() {
        const initialState = this.state
        this.perturbState()
        expect(this.state).not.toBe(initialState)

        this.dispatch({type: NouniAEActionTypes.ON_CLICK_SAVE_NOUNI, nouni: {}})
        expect(this.state).toBe(initialState)
    })
    
    /*it('Test calcResult', function() {
        expect(this.state.getIn(['nouni','generatedText'])).toEqual('')

        // 1. Nouni, but no definiteness. Only base form of noun.
        // In this test, the value of id is unused.
        this.dispatch({
            type: NouniActionTypes.ON_CHANGE_SELECTED_NOUNI,
            nouni: Nouni({id:'n-666', base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es})
        })
        expect(this.state.getIn(['nouni','generatedText'])).toEqual('box')

        // 2. Definiteness, but no nouni.
        this.dispatch({
            type: NouniAEActionTypes.ON_CHANGE_DEFINITENESS,
            newDefiniteness: DefinitenessSelect.Definite
        })
        this.dispatch({ // Fake reset to no selected nouni
            type: NouniActionTypes.ON_CHANGE_SELECTED_NOUNI,
            nouni: Nouni({id:'', base: '', plural: '', pluralization_rule: PluralizationRule.NoneSelected})
        })
        expect(this.state.getIn(['nouni','generatedText'])).toEqual('')

        // 3. Now give it a noun and expect the definite form.
        this.dispatch({
            type: NouniActionTypes.ON_CHANGE_SELECTED_NOUNI,
            nouni: Nouni({id:'n-666', base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es})
        })
        expect(this.state.getIn(['nouni','generatedText'])).toEqual('the box')

        // 4. Indefinite, nouni.base does not start with vowel.
        this.dispatch({
            type: NouniAEActionTypes.ON_CHANGE_DEFINITENESS,
            newDefiniteness: DefinitenessSelect.Indefinite
        })
        expect(this.state.getIn(['nouni','generatedText'])).toEqual('a box')

        // 5. Indefinite, nouni.base does start with vowel.
        this.dispatch({
            type: NouniActionTypes.ON_CHANGE_SELECTED_NOUNI,
            nouni: Nouni({id:'n-666', base: 'elephant', plural: 'elephants', pluralization_rule: PluralizationRule.Append_s})
        })
        expect(this.state.getIn(['nouni','generatedText'])).toEqual('an elephant')

    })*/

    /*it('ON_CHANGE_SELECTED_NOUNI', function() {

        // In this test, the value of id is unused.
        this.dispatch({
            type: NouniActionTypes.ON_CHANGE_SELECTED_NOUNI,
            nouni: Nouni({id:'n-666', base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es})
        })
        expect(this.state.getIn(['nouni','nouni']).toJSON()).toEqual({id:'n-666', base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es})
    })
    
    it('ON_CHANGE_DEFINITENESS', function() {
        expect(this.state.getIn(['nouni','definiteness'])).toBe(DefinitenessSelect.NoneSelected)

        this.dispatch({
            type: NouniAEActionTypes.ON_CHANGE_DEFINITENESS,
            newDefiniteness: DefinitenessSelect.Definite
        })
        expect(this.state.getIn(['nouni','definiteness'])).toBe(DefinitenessSelect.Definite)
    })*/
})
