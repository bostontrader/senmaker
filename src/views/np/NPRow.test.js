import React     from "react"
import TestUtils from "react-addons-test-utils"

import NPRow        from './NPRow'
import {npExamples} from '../../data/TestData'
import NP           from '../../data/np/NP'
import StringStore  from '../../data/strings/StringStore'

describe("NPRow", () => {

    let tuRenderer
    let npRow

    it("Renders a NPRow", () => {
        tuRenderer = TestUtils.createRenderer()
        const props = {
            np:npExamples.a,
            strings: StringStore.getInitialState()
        }
        npRow = tuRenderer.render(<NPRow {...props} />)
        expect(npRow.type).toBe('tr')
        expect(npRow.props.children.length).toBe(2)  // vp, edit
    })

})
