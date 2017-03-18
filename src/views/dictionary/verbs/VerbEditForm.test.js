import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import AppActionTypes from '../../../data/AppActionTypes'
import AppStore from '../../../data/AppStore'
import StringStore from '../../../data/StringStore'
import VerbEditForm from './VerbEditForm'
import VerbAddEditStore from '../../../data/dictionary/verbs/VerbDictionaryItemAddEditStore'

describe("VerbEditForm", () => {

    it("correctly renders a VerbPanelLevel.BASE VerbEditForm", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const strings = StringStore.getInitialState()
        const props = {level:newState.get('level'), verbs: OrderedMap(), addEditVerb: VerbAddEditStore.getInitialState(), strings:strings}
        const renderExpression = <VerbEditForm {...props} />
        const verbAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbAddForm.type).toBe('div')
        //expect(verbAddForm.props.children.length).toBe(5)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("renders a VerbPanelLevel.PAST_TENSE VerbEditForm", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const strings = StringStore.getInitialState()
        const props = {level:newState.get('level'), verbs: OrderedMap(), addEditVerb: VerbAddEditStore.getInitialState(), strings:strings}
        
        const renderExpression = <VerbEditForm {...props} />
        const verbAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbAddForm.type).toBe('div')
        //expect(verbAddForm.props.children.length).toBe(6)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
