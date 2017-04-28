import React     from "react"
import TestUtils from "react-addons-test-utils"

import NoundSelect    from './NoundSelect'

describe("NoundSelect", () => {

    it("renders a NoundSelect", () => {
        const tuRenderer = TestUtils.createRenderer()
        const props = {}
        const noundSelect = tuRenderer.render(<NoundSelect {...props} />)
    })

})
