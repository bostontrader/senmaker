import React     from "react"
import TestUtils from "react-addons-test-utils"

import AdjectivdSelect    from './AdjectivdSelect'

describe("AdjectivdSelect", () => {

    it("renders a AdjectivdSelect", () => {
        const tuRenderer = TestUtils.createRenderer()
        const props = {}
        const noundSelect = tuRenderer.render(<AdjectivdSelect {...props} />)
    })

})
