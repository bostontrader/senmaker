import React     from "react"
import ReactTestUtils from "react-dom/test-utils"

import ClauseRow        from './ClauseRow'
import {clauseExamples} from '../../data/TestData'
import StringStore  from '../../data/strings/StringStore'

describe("ClauseRow", () => {

    let tuRenderer
    let clauseRow

    it("Renders a ClauseRow", () => {
        tuRenderer = ReactTestUtils.createRenderer()
        const props = {
            clause:clauseExamples.a, 
            strings: StringStore.getInitialState()
        }
        clauseRow = tuRenderer.render(<ClauseRow {...props} />)
        expect(clauseRow.type).toBe('tr')
        expect(clauseRow.props.children.length).toBe(2)  // clause, edit
    })

})
