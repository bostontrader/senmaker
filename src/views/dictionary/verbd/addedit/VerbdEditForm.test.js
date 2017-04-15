import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import VerbdEditForm from './VerbdEditForm'
import VerbdAEStore  from '../../../../data/dictionary/verbd/addedit/VerbdAEStore'
import StringStore   from '../../../../data/strings/StringStore'

//import AppActionTypes from '../../../../data/app/AppActionTypes'
//import AppStore from '../../../../data/app/AppStore'


describe("VerbdEditForm", () => {

    it("Renders a VerbdPanelLevel.BASE VerbdEditForm", () => {
        const props = {
            verbd: Map({
                addedit: VerbdAEStore.getInitialState(),
                verbs: Map()
            }),
            strings:StringStore.getInitialState()
        }
        const renderExpression = <VerbdEditForm {...props} />
        const verbdEditForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbdEditForm.type).toBe('div')
        expect(verbdEditForm.props.children.length).toBe(5) // noun, input, save, delete, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    /*it("renders a VerbPanelLevel.PAST_TENSE VerbdEditForm", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const strings = StringStore.getInitialState()
        const props = {
            verbs: OrderedMap(),
            addEditVerb: VerbAEStore.getInitialState(), strings:strings}
        
        const renderExpression = <VerbdEditForm {...props} />
        const verbdEditForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbdEditForm.type).toBe('div')
        //expect(verbdEditForm.props.children.length).toBe(6)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })*/

})
