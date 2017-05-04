import React     from "react"
import TestUtils from "react-addons-test-utils"

import VPSelect    from './VPSelect'

describe("VPSelect", () => {

    it("renders a VPSelect", () => {
        const tuRenderer = TestUtils.createRenderer()
        const props = {}
        const noundSelect = tuRenderer.render(<VPSelect {...props} />)
        expect(true)
    })

})
