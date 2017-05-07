import React      from "react"
import TestUtils  from "react-addons-test-utils"
import rtRenderer from 'react-test-renderer'

import VerbdRow          from './VerbdRow'
import {verbdExamples}   from '../../../data/TestData'
import Verbd             from '../../../data/dictionary/verbd/Verbd'
import {VerbdPanelLevel} from '../../../data/dictionary/verbd/VerbdConstants'
import StringStore       from '../../../data/strings/StringStore'

describe("VerbdRow", () => {

    let verbdRow
    let props
    let renderExpression

    it("renders a VerbdPanelLevel.BASE VerbdRow", () => {
        props = {verbd:verbdExamples.a, verbdPanelLevel:VerbdPanelLevel.BASE, strings: StringStore.getInitialState()}
        renderExpression = <VerbdRow {...props} />
        verbdRow = TestUtils.createRenderer().render(renderExpression)
        expect(verbdRow.type).toBe('tr')
        expect(verbdRow.props.children.length).toBe(2)  // base, edit

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("renders a VerbdPanelLevel.PAST_FORM VerbdRow", () => {
        props = {verbd:verbdExamples.a, verbdPanelLevel:VerbdPanelLevel.PAST_FORM, strings: StringStore.getInitialState()}
        renderExpression = <VerbdRow {...props} />
        verbdRow = TestUtils.createRenderer().render(renderExpression)
        expect(verbdRow.type).toBe('tr')
        expect(verbdRow.props.children.length).toBe(3)  // base, past tense, edit

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("renders a VerbdPanelLevel.MAX VerbdRow", () => {
        props = {verbd:verbdExamples.a, verbdPanelLevel:VerbdPanelLevel.MAX, strings: StringStore.getInitialState()}
        renderExpression = <VerbdRow {...props} />
        verbdRow = TestUtils.createRenderer().render(renderExpression)
        expect(verbdRow.type).toBe('tr')
        expect(verbdRow.props.children.length).toBe(3)  // base, past tense, edit

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
