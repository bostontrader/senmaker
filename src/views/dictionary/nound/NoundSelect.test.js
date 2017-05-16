import React          from "react"
import ReactTestUtils from "react-dom/test-utils"

import NoundSelect from './NoundSelect'

describe("NoundSelect", () => {

    it("renders a NoundSelect", () => {
        const tuRenderer = ReactTestUtils.createRenderer()
        const props = {}
        const noundSelect = tuRenderer.render(<NoundSelect {...props} />)
    })

})
