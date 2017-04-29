import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import AdjectivdAddForm from './AdjectivdAddForm'
import AdjectivdAEStore from '../../../../data/dictionary/adjectivd/addedit/AdjectivdAEStore'
import StringStore      from '../../../../data/strings/StringStore'

describe("AdjectivdAddForm", () => {

    it("Renders an AdjectivdAddForm", () => {
        const props = {
            adjectivd: Map({
                addedit: AdjectivdAEStore.getInitialState(),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <AdjectivdAddForm {...props} />
        const adjectivdAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(adjectivdAddForm.type).toBe('div')
        expect(adjectivdAddForm.props.children.length).toBe(4) // adjective, input, save, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
