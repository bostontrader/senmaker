import React          from "react"
import ReactTestUtils from "react-dom/test-utils"
import rtRenderer     from 'react-test-renderer'

import ConjunctiondRow        from './ConjunctiondRow'
import {conjunctiondExamples} from '../../../data/TestData'
import Conjunctiond           from '../../../data/dictionary/conjunctiond/Conjunctiond'
import StringStore            from '../../../data/strings/StringStore'

describe("ConjunctiondRow", () => {

    let conjunctiondRow
    let props
    let renderExpression

    it("Renders a ConjunctiondRow", () => {
        props = {conjunctiond:conjunctiondExamples.a, strings: StringStore.getInitialState()}
        renderExpression = <ConjunctiondRow {...props} />
        conjunctiondRow = ReactTestUtils.createRenderer().render(renderExpression)
        expect(conjunctiondRow.type).toBe('tr')
        expect(conjunctiondRow.props.children.length).toBe(2)  // base, edit

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
