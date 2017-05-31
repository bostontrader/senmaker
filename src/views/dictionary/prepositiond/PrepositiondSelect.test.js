import React          from "react"
import ReactTestUtils from "react-dom/test-utils"

import PrepositiondSelect from './PrepositiondSelect'

describe("PrepositiondSelect", () => {

    it("renders a PrepositiondSelect", () => {
        const tuRenderer = ReactTestUtils.createRenderer()
        const props = {}
        const noundSelect = tuRenderer.render(<PrepositiondSelect {...props} />)
    })

})
