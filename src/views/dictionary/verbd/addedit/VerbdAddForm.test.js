import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import VerbdAddForm from './VerbdAddForm'
import VerbdAEStore from '../../../../data/dictionary/verbd/addedit/VerbdAEStore'
import StringStore  from '../../../../data/strings/StringStore'
//import AppActionTypes from '../../../../data/app/AppActionTypes'
//import AppStore from '../../../../data/app/AppStore'


describe("VerbdAddForm", () => {

    it("Renders a VerbPanelLevel.BASE VerbdAddForm", () => {
        const props = {
            verbd: Map({
                addedit: VerbdAEStore.getInitialState(),
                verbs: Map()
            }),
            strings:StringStore.getInitialState()
        }
        
        const renderExpression = <VerbdAddForm {...props} />
        const verbdAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbdAddForm.type).toBe('div')
        expect(verbdAddForm.props.children.length).toBe(4) // noun, input, save, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    /*it("Renders a VerbPanelLevel.PAST_TENSE VerbdAddForm", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const strings = StringStore.getInitialState()
        const props = {level:newState.get('level'), verbs: OrderedMap(), addEditVerb: VerbdAEStore.getInitialState(), strings:strings}

        const renderExpression = <VerbdAddForm {...props} />
        const verbdAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbdAddForm.type).toBe('div')
        expect(verbdAddForm.props.children.length).toBe(5)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })*/

})
