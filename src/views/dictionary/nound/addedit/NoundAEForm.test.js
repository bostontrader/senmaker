import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import {NoundPanelLevel} from '../../../../data/dictionary/nound/NoundConstants'
import NoundAEForm       from './NoundAEForm'
import NoundAEStore      from '../../../../data/dictionary/nound/addedit/NoundAEStore'
import StringStore       from '../../../../data/strings/StringStore'

describe("NoundEditForm", () => {

    it("Renders a NoundAEForm, add mode, NoundPanelLevel.BASE", () => {
        const props = {
            nound: Map({
                addedit: NoundAEStore.getInitialState().setIn(['addNound'],true),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <NoundAEForm noundPanelLevel = {NoundPanelLevel.BASE} {...props} />
        const noundAEForm = TestUtils.createRenderer().render(renderExpression)
        expect(noundAEForm.type).toBe('div')
        expect(noundAEForm.props.children.length).toBe(2) // base controls, buttons
        expect(noundAEForm.props.children[1].props.children.length).toBe(2) // save, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a NoundAEForm, add mode, NoundPanelLevel.PLURALIZATION", () => {
        const props = {
            nound: Map({
                addedit: NoundAEStore.getInitialState().setIn(['addNound'],true),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <NoundAEForm noundPanelLevel = {NoundPanelLevel.PLURALIZATION} {...props} />
        const noundAEForm = TestUtils.createRenderer().render(renderExpression)
        expect(noundAEForm.type).toBe('div')
        expect(noundAEForm.props.children.length).toBe(5) // base controls, plural, input, pluraliation_rule_select, buttons
        expect(noundAEForm.props.children[4].props.children.length).toBe(2) // save, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })


    it("Renders a NoundAEForm, edit mode, NoundPanelLevel.BASE", () => {
        const props = {
            nound: Map({
                addedit: NoundAEStore.getInitialState().setIn(['nound','id'],'1'),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }
        const renderExpression = <NoundAEForm noundPanelLevel = {NoundPanelLevel.BASE} {...props}/>
        const noundAEForm = TestUtils.createRenderer().render(renderExpression)
        expect(noundAEForm.type).toBe('div')
        expect(noundAEForm.props.children.length).toBe(2) // base controls, buttons
        expect(noundAEForm.props.children[1].props.children.length).toBe(3) // save, delete, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a NoundAEForm, edit mode, NoundPanelLevel.PLURALIZATION", () => {
        const props = {
            nound: Map({
                addedit: NoundAEStore.getInitialState().setIn(['nound','id'],'1'),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }
        const renderExpression = <NoundAEForm noundPanelLevel = {NoundPanelLevel.PLURALIZATION} {...props}/>
        const noundAEForm = TestUtils.createRenderer().render(renderExpression)
        expect(noundAEForm.type).toBe('div')
        expect(noundAEForm.props.children.length).toBe(5) // base controls, plural, input, pluraliation_rule_select, buttons
        expect(noundAEForm.props.children[4].props.children.length).toBe(3) // save, delete, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
