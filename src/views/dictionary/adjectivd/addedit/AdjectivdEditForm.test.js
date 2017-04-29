import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import AdjectivdEditForm from './AdjectivdEditForm'
import AdjectivdAEStore  from '../../../../data/dictionary/adjectivd/addedit/AdjectivdAEStore'
import StringStore   from '../../../../data/strings/StringStore'

describe("AdjectivdEditForm", () => {

    it("Renders an AdjectivdEditForm", () => {
        const props = {
            adjectivd: Map({
                addedit: AdjectivdAEStore.getInitialState(),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }
        const renderExpression = <AdjectivdEditForm {...props}/>
        const nounEditForm = TestUtils.createRenderer().render(renderExpression)
        expect(nounEditForm.type).toBe('div')
        expect(nounEditForm.props.children.length).toBe(5) // adjective, input, save, delete, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
