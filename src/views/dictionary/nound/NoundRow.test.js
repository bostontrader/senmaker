import React from "react"
import TestUtils from "react-addons-test-utils"

import NoundRow    from './NoundRow'
import Nound       from '../../../data/dictionary/nound/Nound'
import StringStore from '../../../data/strings/StringStore'
//import {NoundPanelLevel} from '../../../data/dictionary/nound/NoundConstants'

describe("NoundRow", () => {

    let tuRenderer, noundRow

    const noun = new Nound({
        id: 1,
        base: 'cat',
        plural: 'cats',
        pluralization_rule: 1
    })

    it("renders a NoundPanelLevel.BASE NoundRow", () => {
        tuRenderer = TestUtils.createRenderer()
        const strings = StringStore.getInitialState()
        const props = {noun:noun, strings: strings}
        noundRow = tuRenderer.render(<NoundRow {...props} />)
        expect(noundRow.type).toBe('tr')
        expect(noundRow.props.children.length).toBe(2)  // noun, edit
    })

    //it("renders a NoundPanelLevel.PLURALIZATION NoundRow", () => {
        //tuRenderer = TestUtils.createRenderer()
        //const strings = StringStore.getInitialState()
        //const props = {level:NoundPanelLevel.PLURALIZATION, noun:noun, strings: strings}
        //noundRow = tuRenderer.render(<NoundRow {...props} />)
        //expect(noundRow.type).toBe('tr')
        //expect(noundRow.props.children.length).toBe(3)
    //})

})
