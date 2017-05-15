import React     from "react"
import ReactTestUtils from "react-dom/test-utils"

import NPSelect    from './NPSelect'

describe("NPSelect", () => {

    it("renders a NPSelect", () => {
        const tuRenderer = ReactTestUtils.createRenderer()
        const props = {}
        const noundSelect = tuRenderer.render(<NPSelect {...props} />)
        expect(true)
    })

})
