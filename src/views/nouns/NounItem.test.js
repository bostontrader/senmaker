import React from "react"
import TestUtils from "react-addons-test-utils"

import Noun from '../../data/nouns/Noun'
import NounItem from './NounItem'
import {NounPanelLevel} from '../../data/nouns/NounConstants'

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
        const props = {level:NounPanelLevel.BASE, noun:noun}
        nounItem = tuRenderer.render(<NounItem {...props} />)
        expect(nounItem.type).toBe('tr')
        expect(nounItem.props.children.length).toBe(2)
    })

    it("renders a NounPanelLevel.PLURALIZATION NounItem", () => {
        tuRenderer = TestUtils.createRenderer()
        const props = {level:NounPanelLevel.PLURALIZATION, noun:noun}
        nounItem = tuRenderer.render(<NounItem {...props} />)
        expect(nounItem.type).toBe('tr')
        expect(nounItem.props.children.length).toBe(3)
    })

})
