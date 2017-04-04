import React from "react"
import TestUtils from "react-addons-test-utils"

import StringStore from '../../../data/strings/StringStore'
import Verbd from '../../../data/dictionary/verbd/Verbd'
import VerbdRow from './VerbdRow'
import {PastTenseRule, VerbdPanelLevel} from '../../../data/dictionary/verbd/VerbdConstants'

describe("VerbdRow", () => {

    let tuRenderer, verbdRow

    const verb = new Verbd({
        id: 1,
        base: 'run',
        pastTense: 'ran',
        pastTense_rule: PastTenseRule.Irregular
    })

    it("renders a VerbdPanelLevel.BASE VerbdRow", () => {
        tuRenderer = TestUtils.createRenderer()
        const strings = StringStore.getInitialState()
        const props = {level:VerbdPanelLevel.BASE, verb:verb, strings: strings}
        verbdRow = tuRenderer.render(<VerbdRow {...props} />)
        expect(verbdRow.type).toBe('tr')
        expect(verbdRow.props.children.length).toBe(2)
    })

    //it("renders a VerbdPanelLevel.PAST_TENSE", () => {
        //tuRenderer = TestUtils.createRenderer()
        //const strings = StringStore.getInitialState()
        //const props = {level:VerbdPanelLevel.PAST_TENSE, verb:verb, strings: strings}
        //verbdRow = tuRenderer.render(<VerbdRow {...props} />)
        //expect(verbdRow.type).toBe('tr')
        //expect(verbdRow.props.children.length).toBe(3)
    //})

})
