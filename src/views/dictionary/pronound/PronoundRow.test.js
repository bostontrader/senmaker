import React          from "react"
import ReactTestUtils from "react-dom/test-utils"
import rtRenderer     from 'react-test-renderer'

import PronoundRow          from './PronoundRow'
import {pronoundExamples}   from '../../../data/TestData'
import Pronound             from '../../../data/dictionary/pronound/Pronound'
import {PronoundPanelLevel} from '../../../data/dictionary/pronound/PronoundConstants'
import StringStore       from '../../../data/strings/StringStore'

describe("PronoundRow", () => {

    let pronoundRow
    let props
    let renderExpression

    it("renders a PronoundPanelLevel.BASE PronoundRow", () => {
        props = {pronound:pronoundExamples.a, pronoundPanelLevel:PronoundPanelLevel.BASE, strings: StringStore.getInitialState()}
        renderExpression = <PronoundRow {...props} />
        pronoundRow = ReactTestUtils.createRenderer().render(renderExpression)
        expect(pronoundRow.type).toBe('tr')
        expect(pronoundRow.props.children.length).toBe(2)  // base, edit

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("renders a PronoundPanelLevel.PLURALIZATION PronoundRow", () => {
        props = {pronound:pronoundExamples.a, pronoundPanelLevel:PronoundPanelLevel.PLURALIZATION, strings: StringStore.getInitialState()}
        renderExpression = <PronoundRow {...props} />
        pronoundRow = ReactTestUtils.createRenderer().render(renderExpression)
        expect(pronoundRow.type).toBe('tr')
        expect(pronoundRow.props.children.length).toBe(3)  // base, plural, edit

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
