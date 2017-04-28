import React      from "react"
import TestUtils  from "react-addons-test-utils"
import rtRenderer from 'react-test-renderer'

import NoundRow          from './NoundRow'
import {noundExamples}   from '../../../data/TestData'
import Nound             from '../../../data/dictionary/nound/Nound'
import {NoundPanelLevel} from '../../../data/dictionary/nound/NoundConstants'
import StringStore       from '../../../data/strings/StringStore'

describe("NoundRow", () => {

    let noundRow
    let props
    let renderExpression

    it("renders a NoundPanelLevel.BASE NoundRow", () => {
        props = {nound:noundExamples.a, noundPanelLevel:NoundPanelLevel.BASE, strings: StringStore.getInitialState()}
        renderExpression = <NoundRow {...props} />
        noundRow = TestUtils.createRenderer().render(renderExpression)
        expect(noundRow.type).toBe('tr')
        expect(noundRow.props.children.length).toBe(2)  // base, edit

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("renders a NoundPanelLevel.PLURALIZATION NoundRow", () => {
        props = {nound:noundExamples.a, noundPanelLevel:NoundPanelLevel.PLURALIZATION, strings: StringStore.getInitialState()}
        renderExpression = <NoundRow {...props} />
        noundRow = TestUtils.createRenderer().render(renderExpression)
        expect(noundRow.type).toBe('tr')
        expect(noundRow.props.children.length).toBe(3)  // base, plural, edit

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
