import React     from "react"
import ReactTestUtils from "react-dom/test-utils"

import VPSelect    from './VPSelect'

describe("VPSelect", () => {

    it("renders a VPSelect", () => {
        const tuRenderer = ReactTestUtils.createRenderer()
        const props = {}
        const noundSelect = tuRenderer.render(<VPSelect {...props} />)
        expect(true)
    })

})
