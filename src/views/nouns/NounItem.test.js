import React from "react"
import TestUtils from "react-addons-test-utils"
import Noun from '../../data/nouns/Noun'
import NounItem from './NounItem'

describe("NounItem", () => {

    let tuRenderer, nounItem

    const noun = new Noun({
        id: 1,
        base: 'cat',
        plural: 'cats',
        pluralization_rule: 1
    })

    it("renders a level 1 NounItem", () => {
        tuRenderer = TestUtils.createRenderer()
        nounItem = tuRenderer.render(<NounItem level={1} noun={noun} />)
        expect(nounItem.type).toBe('tr')
        expect(nounItem.props.children.length).toBe(2)
    })

    it("renders a level 2 NounItem", () => {
        tuRenderer = TestUtils.createRenderer()
        nounItem = tuRenderer.render(<NounItem level={2} noun={noun} />)
        expect(nounItem.type).toBe('tr')
        expect(nounItem.props.children.length).toBe(3)
    })

})
