import React      from "react"
import ReactTestUtils  from "react-dom/test-utils"
import rtRenderer from 'react-test-renderer'

import AdjectivdRow        from './AdjectivdRow'
import {adjectivdExamples} from '../../../data/TestData'
import Adjectivd           from '../../../data/dictionary/adjectivd/Adjectivd'
import StringStore         from '../../../data/strings/StringStore'

describe("AdjectivdRow", () => {

    let adjectivdRow
    let props
    let renderExpression

    it("renders an AdjectivdRow", () => {
        props = {adjectivd:adjectivdExamples.a, strings: StringStore.getInitialState()}
        renderExpression = <AdjectivdRow {...props} />
        adjectivdRow = ReactTestUtils.createRenderer().render(renderExpression)
        expect(adjectivdRow.type).toBe('tr')
        expect(adjectivdRow.props.children.length).toBe(2)  // base, edit

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
