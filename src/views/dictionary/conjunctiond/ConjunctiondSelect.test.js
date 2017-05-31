import React          from "react"
import ReactTestUtils from "react-dom/test-utils"

import ConjunctiondSelect from './ConjunctiondSelect'

describe("ConjunctiondSelect", () => {

    it("renders a ConjunctiondSelect", () => {
        const tuRenderer = ReactTestUtils.createRenderer()
        const props = {}
        const conjunctiondSelect = tuRenderer.render(<ConjunctiondSelect {...props} />)
    })

})
