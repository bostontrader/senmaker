import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import VerbEditForm from './VerbEditForm'
import {VerbPanelLevel} from '../../data/verbs/VerbConstants'

describe("VerbEditForm", () => {

    it("correctly renders a VerbPanelLevel.BASE VerbEditForm", () => {
        const renderExpression = <VerbEditForm level={VerbPanelLevel.BASE} editingVerb={{base: 'talk'}}/>
        const verbAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbAddForm.type).toBe('div')
        expect(verbAddForm.props.children.length).toBe(5)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("renders a VerbPanelLevel.PAST_TENSE VerbEditForm", () => {
        const renderExpression = <VerbEditForm level={VerbPanelLevel.PAST_TENSE} editingVerb={{base: 'talk'}}/>
        const verbAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbAddForm.type).toBe('div')
        expect(verbAddForm.props.children.length).toBe(6)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
