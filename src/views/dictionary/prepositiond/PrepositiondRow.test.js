import React          from "react"
import ReactTestUtils from "react-dom/test-utils"
import rtRenderer     from 'react-test-renderer'

import PrepositiondRow        from './PrepositiondRow'
import {prepositiondExamples} from '../../../data/TestData'
import Prepositiond           from '../../../data/dictionary/prepositiond/Prepositiond'
import StringStore         from '../../../data/strings/StringStore'

describe("PrepositiondRow", () => {

    let prepositiondRow
    let props
    let renderExpression

    it("renders an PrepositiondRow", () => {
        props = {prepositiond:prepositiondExamples.a, strings: StringStore.getInitialState()}
        renderExpression = <PrepositiondRow {...props} />
        prepositiondRow = ReactTestUtils.createRenderer().render(renderExpression)
        expect(prepositiondRow.type).toBe('tr')
        expect(prepositiondRow.props.children.length).toBe(2)  // base, edit

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
