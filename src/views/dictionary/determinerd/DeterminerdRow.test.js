import React          from "react"
import ReactTestUtils from "react-dom/test-utils"
import rtRenderer     from 'react-test-renderer'

import DeterminerdRow          from './DeterminerdRow'
import {determinerdExamples}   from '../../../data/TestData'
import Determinerd             from '../../../data/dictionary/determinerd/Determinerd'
import {DeterminerdPanelLevel} from '../../../data/dictionary/determinerd/DeterminerdConstants'
import StringStore       from '../../../data/strings/StringStore'

describe("DeterminerdRow", () => {

    let determinerdRow
    let props
    let renderExpression

    it("renders a DeterminerdPanelLevel.BASE DeterminerdRow", () => {
        props = {determinerd:determinerdExamples.a, determinerdPanelLevel:DeterminerdPanelLevel.BASE, strings: StringStore.getInitialState()}
        renderExpression = <DeterminerdRow {...props} />
        determinerdRow = ReactTestUtils.createRenderer().render(renderExpression)
        expect(determinerdRow.type).toBe('tr')
        expect(determinerdRow.props.children.length).toBe(2)  // base, edit

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("renders a DeterminerdPanelLevel.PLURALIZATION DeterminerdRow", () => {
        props = {determinerd:determinerdExamples.a, determinerdPanelLevel:DeterminerdPanelLevel.PLURALIZATION, strings: StringStore.getInitialState()}
        renderExpression = <DeterminerdRow {...props} />
        determinerdRow = ReactTestUtils.createRenderer().render(renderExpression)
        expect(determinerdRow.type).toBe('tr')
        expect(determinerdRow.props.children.length).toBe(3)  // base, plural, edit

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
