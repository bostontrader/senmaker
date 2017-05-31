import React          from "react"
import ReactTestUtils from "react-dom/test-utils"

import PronoundSelect from './PronoundSelect'

describe("PronoundSelect", () => {

    it("renders a PronoundSelect", () => {
        const tuRenderer = ReactTestUtils.createRenderer()
        const props = {}
        const pronoundSelect = tuRenderer.render(<PronoundSelect {...props} />)
    })

})
