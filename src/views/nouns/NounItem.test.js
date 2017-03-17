import React from "react"
import TestUtils from "react-addons-test-utils"

import Noun from '../../data/nouns/Noun'
import NounItem from './NounItem'
import {NounPanelLevel} from '../../data/nouns/NounConstants'
import StringStore from '../../data/StringStore'

describe("NounItem", () => {

    let tuRenderer, nounItem

    const noun = new Noun({
        id: 1,
        base: 'cat',
        plural: 'cats',
        pluralization_rule: 1
    })

    it("renders a NounPanelLevel.BASE NounItem", () => {
        tuRenderer = TestUtils.createRenderer()
        const strings = StringStore.getInitialState()
        const props = {level:NounPanelLevel.BASE, noun:noun, strings: strings}
        nounItem = tuRenderer.render(<NounItem {...props} />)
        expect(nounItem.type).toBe('tr')
        expect(nounItem.props.children.length).toBe(2)
    })

    it("renders a NounPanelLevel.PLURALIZATION NounItem", () => {
        tuRenderer = TestUtils.createRenderer()
        const strings = StringStore.getInitialState()
        const props = {level:NounPanelLevel.PLURALIZATION, noun:noun, strings: strings}
        nounItem = tuRenderer.render(<NounItem {...props} />)
        expect(nounItem.type).toBe('tr')
        expect(nounItem.props.children.length).toBe(3)
    })

})
