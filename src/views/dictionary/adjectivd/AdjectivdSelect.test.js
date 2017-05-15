import React     from "react"
import ReactTestUtils from "react-dom/test-utils"

import AdjectivdSelect    from './AdjectivdSelect'

describe("AdjectivdSelect", () => {

    it("renders a AdjectivdSelect", () => {
        const tuRenderer = ReactTestUtils.createRenderer()
        const props = {}
        const noundSelect = tuRenderer.render(<AdjectivdSelect {...props} />)
    })

})
