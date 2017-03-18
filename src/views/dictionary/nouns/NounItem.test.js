import React from "react"
import TestUtils from "react-addons-test-utils"

import Noun from '../../../data/dictionary/nouns/NounDictionaryItem'
import NounItem from './NounItem'
import {NounDictionaryItemPanelLevel} from '../../../data/dictionary/nouns/NounDictionaryItemConstants'
import StringStore from '../../../data/StringStore'

describe("NounItem", () => {

    let tuRenderer, nounItem

    const noun = new Noun({
        id: 1,
        base: 'cat',
        plural: 'cats',
        pluralization_rule: 1
    })

    it("renders a NounDictionaryItemPanelLevel.BASE NounItem", () => {
        tuRenderer = TestUtils.createRenderer()
        const strings = StringStore.getInitialState()
        const props = {level:NounDictionaryItemPanelLevel.BASE, noun:noun, strings: strings}
        nounItem = tuRenderer.render(<NounItem {...props} />)
        expect(nounItem.type).toBe('tr')
        expect(nounItem.props.children.length).toBe(2)
    })

    it("renders a NounDictionaryItemPanelLevel.PLURALIZATION NounItem", () => {
        tuRenderer = TestUtils.createRenderer()
        const strings = StringStore.getInitialState()
        const props = {level:NounDictionaryItemPanelLevel.PLURALIZATION, noun:noun, strings: strings}
        nounItem = tuRenderer.render(<NounItem {...props} />)
        expect(nounItem.type).toBe('tr')
        expect(nounItem.props.children.length).toBe(3)
    })

})
