import React from "react"
import TestUtils from "react-addons-test-utils"

import NPRow       from './NPRow'
import NP          from '../../data/np/NP'
import StringStore from '../../data/strings/StringStore'

describe("NPRow", () => {

    let tuRenderer, npRow

    const noun = new NP({
        id: 1,
        base: 'cat',
        plural: 'cats',
        pluralization_rule: 1
    })

    it("renders a NPPanelLevel.BASE NPRow", () => {
        tuRenderer = TestUtils.createRenderer()
        const strings = StringStore.getInitialState()
        const props = {noun:noun, strings: strings}
        npRow = tuRenderer.render(<NPRow {...props} />)
        expect(npRow.type).toBe('tr')
        expect(npRow.props.children.length).toBe(2)  // noun, edit
    })

    //it("renders a NPPanelLevel.PLURALIZATION NPRow", () => {
        //tuRenderer = TestUtils.createRenderer()
        //const strings = StringStore.getInitialState()
        //const props = {level:NPPanelLevel.PLURALIZATION, noun:noun, strings: strings}
        //npRow = tuRenderer.render(<NPRow {...props} />)
        //expect(npRow.type).toBe('tr')
        //expect(npRow.props.children.length).toBe(3)
    //})

})
