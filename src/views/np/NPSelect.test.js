import React     from "react"
import TestUtils from "react-addons-test-utils"

import NPSelect    from './NPSelect'

describe("NPSelect", () => {

    it("renders a NPSelect", () => {
        const tuRenderer = TestUtils.createRenderer()
        const props = {}
        const noundSelect = tuRenderer.render(<NPSelect {...props} />)
        expect(true)
    })

})
