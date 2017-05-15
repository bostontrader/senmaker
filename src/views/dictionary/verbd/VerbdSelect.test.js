import React     from "react"
import ReactTestUtils from "react-dom/test-utils"

import VerbdSelect    from './VerbdSelect'

describe("VerbdSelect", () => {

    it("renders a VerbdSelect", () => {
        const tuRenderer = ReactTestUtils.createRenderer()
        const props = {}
        const noundSelect = tuRenderer.render(<VerbdSelect {...props} />)
    })

})
