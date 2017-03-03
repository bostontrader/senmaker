import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import NounEditForm from './NounEditForm'
import {NounPanelLevel} from '../../data/nouns/NounConstants'

describe("NounEditForm", () => {

    it("correctly renders a NounPanelLevel.BASE NounEditForm", () => {
        const renderExpression = <NounEditForm level={NounPanelLevel.BASE} editingNoun={{base: 'cat'}}/>
        const nounAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(nounAddForm.type).toBe('div')
        expect(nounAddForm.props.children.length).toBe(5)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("renders a NounPanelLevel.PAST_TENSE NounEditForm", () => {
        const renderExpression = <NounEditForm level={NounPanelLevel.PLURALIZATION} editingNoun={{base: 'cat'}}/>
        const nounAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(nounAddForm.type).toBe('div')
        expect(nounAddForm.props.children.length).toBe(6)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
