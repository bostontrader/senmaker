import React from "react"
import TestUtils from "react-addons-test-utils"

import Adjectivd from '../../../data/dictionary/adjectivd/Adjectivd'
import AdjectivdRow from './AdjectivdRow'
import StringStore from '../../../data/strings/StringStore'

describe("AdjectivdRow", () => {

    let tuRenderer, adjectivdRow

    const adjectiv = new Adjectivd({
        id: 1,
        base: 'fat'
    })

    it("renders a AdjectivdPanelLevel.BASE AdjectivdRow", () => {
        tuRenderer = TestUtils.createRenderer()
        const strings = StringStore.getInitialState()
        const props = {adjectiv:adjectiv, strings: strings}
        adjectivdRow = tuRenderer.render(<AdjectivdRow {...props} />)
        expect(adjectivdRow.type).toBe('tr')
        expect(adjectivdRow.props.children.length).toBe(2)
    })

    //it("renders a AdjectivdPanelLevel.PLURALIZATION AdjectivdRow", () => {
        //tuRenderer = TestUtils.createRenderer()
        //const strings = StringStore.getInitialState()
        //const props = {level:AdjectivdPanelLevel.PLURALIZATION, adjectiv:adjectiv, strings: strings}
        //adjectivdRow = tuRenderer.render(<AdjectivdRow {...props} />)
        //expect(adjectivdRow.type).toBe('tr')
        //expect(adjectivdRow.props.children.length).toBe(3)
    //})

})
