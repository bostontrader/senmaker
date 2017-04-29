import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import VerbdEditForm     from './VerbdEditForm'
import {VerbdPanelLevel} from '../../../../data/dictionary/verbd/VerbdConstants'
import VerbdAEStore      from '../../../../data/dictionary/verbd/addedit/VerbdAEStore'
import StringStore       from '../../../../data/strings/StringStore'

describe("VerbdEditForm", () => {

    it("Renders a VerbdPanelLevel.BASE VerbdEditForm", () => {
        const props = {
            verbd: Map({
                addedit: VerbdAEStore.getInitialState(),
                verbs: Map()
            }),
            strings:StringStore.getInitialState()
        }
        const renderExpression = <VerbdEditForm verbdPanelLevel = {VerbdPanelLevel.BASE} {...props} />
        const verbdEditForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbdEditForm.type).toBe('div')
        expect(verbdEditForm.props.children.length).toBe(5) // base, input, save, delete, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a VerbPanelLevel.PAST_TENSE VerbdEditForm", () => {
        const props = {
            verbd: Map({
                addedit: VerbdAEStore.getInitialState(),
                verbs: Map()
            }),
            strings:StringStore.getInitialState()
        }
        const renderExpression = <VerbdEditForm verbdPanelLevel = {VerbdPanelLevel.PAST_TENSE} {...props} />
        const verbdEditForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbdEditForm.type).toBe('div')
        expect(verbdEditForm.props.children.length).toBe(7) // base, input, pastTense, input, save, delete, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
