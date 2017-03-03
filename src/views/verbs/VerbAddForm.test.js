import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import VerbAddForm from './VerbAddForm'
import {VerbPanelLevel} from '../../data/verbs/VerbConstants'

describe("VerbAddForm", () => {

    it("correctly renders a VerbPanelLevel.BASE VerbAddForm", () => {
        const renderExpression = <VerbAddForm level={VerbPanelLevel.BASE} />
        const verbAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbAddForm.type).toBe('div')
        expect(verbAddForm.props.children.length).toBe(4)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("renders a VerbPanelLevel.PAST_TENSE VerbAddForm", () => {
        const renderExpression = <VerbAddForm level={VerbPanelLevel.PAST_TENSE} />
        const verbAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbAddForm.type).toBe('div')
        expect(verbAddForm.props.children.length).toBe(5)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
