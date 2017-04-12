import React from "react"
import TestUtils from "react-addons-test-utils"

import NouniRow    from './NouniRow'
import Nouni       from '../../data/nouni/Nouni'
import StringStore from '../../data/strings/StringStore'
//import {NouniPanelLevel} from '../../../data/dictionary/nouni/NouniConstants'

describe("NouniRow", () => {

    let tuRenderer, nouniRow

    const noun = new Nouni({
        id: 1,
        base: 'cat',
        plural: 'cats',
        pluralization_rule: 1
    })

    it("renders a NouniPanelLevel.BASE NouniRow", () => {
        tuRenderer = TestUtils.createRenderer()
        const strings = StringStore.getInitialState()
        const props = {noun:noun, strings: strings}
        nouniRow = tuRenderer.render(<NouniRow {...props} />)
        expect(nouniRow.type).toBe('tr')
        expect(nouniRow.props.children.length).toBe(2)  // noun, edit
    })

    //it("renders a NouniPanelLevel.PLURALIZATION NouniRow", () => {
        //tuRenderer = TestUtils.createRenderer()
        //const strings = StringStore.getInitialState()
        //const props = {level:NouniPanelLevel.PLURALIZATION, noun:noun, strings: strings}
        //nouniRow = tuRenderer.render(<NouniRow {...props} />)
        //expect(nouniRow.type).toBe('tr')
        //expect(nouniRow.props.children.length).toBe(3)
    //})

})
