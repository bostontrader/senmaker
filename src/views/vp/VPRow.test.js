import React     from "react"
import ReactTestUtils from "react-dom/test-utils"

import VPRow        from './VPRow'
import {vpExamples} from '../../data/TestData'
import StringStore  from '../../data/strings/StringStore'

describe("VPRow", () => {

    let tuRenderer
    let vpRow

    it("Renders a VPRow", () => {
        tuRenderer = ReactTestUtils.createRenderer()
        const props = {
            vp:vpExamples.a, 
            strings: StringStore.getInitialState()
        }
        vpRow = tuRenderer.render(<VPRow {...props} />)
        expect(vpRow.type).toBe('tr')
        expect(vpRow.props.children.length).toBe(2)  // vp, edit
    })

})
