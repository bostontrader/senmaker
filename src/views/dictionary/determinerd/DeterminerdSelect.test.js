import React          from "react"
import ReactTestUtils from "react-dom/test-utils"

import DeterminerdSelect from './DeterminerdSelect'

describe("DeterminerdSelect", () => {

    it("renders a DeterminerdSelect", () => {
        const tuRenderer = ReactTestUtils.createRenderer()
        const props = {}
        const determinerdSelect = tuRenderer.render(<DeterminerdSelect {...props} />)
    })

})
