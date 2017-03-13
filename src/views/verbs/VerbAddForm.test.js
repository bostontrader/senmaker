import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import AppActionTypes from '../../data/AppActionTypes'
import AppStore from '../../data/AppStore'
import VerbAddForm from './VerbAddForm'
import VerbAddEditStore from '../../data/verbs/VerbAddEditStore'
import {VerbPanelLevel} from '../../data/verbs/VerbConstants'

describe("VerbAddForm", () => {

    it("Renders a VerbPanelLevel.BASE VerbAddForm", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const props = {level:newState, verbs: OrderedMap(), addEditVerb: VerbAddEditStore.getInitialState()}
        
        const renderExpression = <VerbAddForm {...props} />
        const verbAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbAddForm.type).toBe('div')
        expect(verbAddForm.props.children.length).toBe(4)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a VerbPanelLevel.PAST_TENSE VerbAddForm", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const props = {level:newState, verbs: OrderedMap(), addEditVerb: VerbAddEditStore.getInitialState()}

        const renderExpression = <VerbAddForm {...props} />
        const verbAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbAddForm.type).toBe('div')
        expect(verbAddForm.props.children.length).toBe(5)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
