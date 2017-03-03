import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import NounAddForm from './NounAddForm'
import {NounPanelLevel} from '../../data/nouns/NounConstants'

describe("NounAddForm", () => {

    it("correctly renders a NounPanelLevel.BASE NounAddForm", () => {
        const renderExpression = <NounAddForm level={NounPanelLevel.BASE} />
        const nounAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(nounAddForm.type).toBe('div')
        expect(nounAddForm.props.children.length).toBe(4)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("renders a NounPanelLevel.PAST_TENSE NounAddForm", () => {
        const renderExpression = <NounAddForm level={NounPanelLevel.PLURALIZATION} />
        const nounAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(nounAddForm.type).toBe('div')
        expect(nounAddForm.props.children.length).toBe(5)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
