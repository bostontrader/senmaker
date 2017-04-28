import React     from "react"
import TestUtils from "react-addons-test-utils"

import VerbdSelect    from './VerbdSelect'

describe("VerbdSelect", () => {

    it("renders a VerbdSelect", () => {
        const tuRenderer = TestUtils.createRenderer()
        const props = {}
        const noundSelect = tuRenderer.render(<VerbdSelect {...props} />)
    })

})
