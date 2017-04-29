import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import VerbdAddForm      from './VerbdAddForm'
import {VerbdPanelLevel} from '../../../../data/dictionary/verbd/VerbdConstants'
import VerbdAEStore      from '../../../../data/dictionary/verbd/addedit/VerbdAEStore'
import StringStore       from '../../../../data/strings/StringStore'

describe("VerbdAddForm", () => {

    it("Renders a VerbPanelLevel.BASE VerbdAddForm", () => {
        const props = {
            verbd: Map({
                addedit: VerbdAEStore.getInitialState(),
                verbs: Map()
            }),
            strings:StringStore.getInitialState()
        }
        
        const renderExpression = <VerbdAddForm verbdPanelLevel = {VerbdPanelLevel.BASE} {...props} />
        const verbdAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbdAddForm.type).toBe('div')
        expect(verbdAddForm.props.children.length).toBe(4) // base, input, save, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a VerbPanelLevel.PAST_TENSE VerbdAddForm", () => {
        const props = {
            verbd: Map({
                addedit: VerbdAEStore.getInitialState(),
                verbs: Map()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <VerbdAddForm verbdPanelLevel = {VerbdPanelLevel.PAST_TENSE} {...props} />
        const verbdAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbdAddForm.type).toBe('div')
        expect(verbdAddForm.props.children.length).toBe(6) // base, input, pastTense, input, save, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
