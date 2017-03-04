import React from "react"
import TestUtils from "react-addons-test-utils"

import Verb from '../../data/verbs/Verb'
import VerbItem from './VerbItem'
import {PastTenseRule, VerbPanelLevel} from '../../data/verbs/VerbConstants'

describe("VerbItem", () => {

    let tuRenderer, verbItem

    const verb = new Verb({
        id: 1,
        base: 'run',
        pastTense: 'ran',
        pastTense_rule: PastTenseRule.Irregular
    })

    it("renders a VerbPanelLevel.BASE VerbItem", () => {
        tuRenderer = TestUtils.createRenderer()
        const props = {level:VerbPanelLevel.BASE, verb:verb}
        verbItem = tuRenderer.render(<VerbItem {...props} />)
        expect(verbItem.type).toBe('tr')
        expect(verbItem.props.children.length).toBe(2)
    })

    it("renders a VerbPanelLevel.PAST_TENSE", () => {
        tuRenderer = TestUtils.createRenderer()
        const props = {level:VerbPanelLevel.PAST_TENSE, verb:verb}
        verbItem = tuRenderer.render(<VerbItem {...props} />)
        expect(verbItem.type).toBe('tr')
        expect(verbItem.props.children.length).toBe(3)
    })

})
