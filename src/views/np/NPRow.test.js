import React          from "react"
import ReactTestUtils from "react-dom/test-utils"
import rtRenderer     from 'react-test-renderer'

import NPRow        from './NPRow'
import {npExamples} from '../../data/TestData'
import NP           from '../../data/np/NP'
import StringStore  from '../../data/strings/StringStore'

describe("NPRow", () => {

    it("Renders a NPRow", () => {
        const props = {np:npExamples.a, strings: StringStore.getInitialState()}
        const renderExpression = <NPRow {...props} />
        const npRow = ReactTestUtils.createRenderer().render(renderExpression)
        expect(npRow.type).toBe('tr')
        expect(npRow.props.children.length).toBe(2)  // np, edit

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
