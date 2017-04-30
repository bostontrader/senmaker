import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import NoundAddForm      from './NoundAddForm'
import {NoundPanelLevel} from '../../../../data/dictionary/nound/NoundConstants'
import NoundAEStore      from '../../../../data/dictionary/nound/addedit/NoundAEStore'
import StringStore       from '../../../../data/strings/StringStore'

describe("NoundAddForm", () => {

    it("Renders a NoundPanelLevel.BASE NoundAddForm", () => {
        const props = {
            nound: Map({
                addedit: NoundAEStore.getInitialState(),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <NoundAddForm noundPanelLevel = {NoundPanelLevel.BASE} {...props} />
        const noundAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(noundAddForm.type).toBe('div')
        expect(noundAddForm.props.children.length).toBe(4) // noun, input, save, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a NoundPanelLevel.PLURALIZATION NoundAddForm", () => {
        const props = {
            nound: Map({
                addedit: NoundAEStore.getInitialState(),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <NoundAddForm noundPanelLevel = {NoundPanelLevel.PLURALIZATION} {...props} />
        const noundAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(noundAddForm.type).toBe('div')
        expect(noundAddForm.props.children.length).toBe(4) // noun, input, save, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
