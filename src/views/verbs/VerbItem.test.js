import React from "react"
import TestUtils from "react-addons-test-utils"
import Verb from '../../data/verbs/Verb'
import VerbItem from './VerbItem'

describe("VerbItem", () => {

    let tuRenderer, verbItem

    const verb = new Verb({
        id: 1,
        base: 'cat',
        plural: 'cats',
        pluralization_rule: 1
    })

    it("renders a level 1 VerbItem", () => {
        tuRenderer = TestUtils.createRenderer()
        verbItem = tuRenderer.render(<VerbItem level={1} verb={verb} />)
        expect(verbItem.type).toBe('tr')
        expect(verbItem.props.children.length).toBe(2)
    })

    it("renders a level 2 VerbItem", () => {
        tuRenderer = TestUtils.createRenderer()
        verbItem = tuRenderer.render(<VerbItem level={2} verb={verb} />)
        expect(verbItem.type).toBe('tr')
        expect(verbItem.props.children.length).toBe(3)
    })

})
