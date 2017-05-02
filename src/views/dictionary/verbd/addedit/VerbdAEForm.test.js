import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import {VerbdPanelLevel} from '../../../../data/dictionary/verbd/VerbdConstants'
import VerbdAEForm       from './VerbdAEForm'
import VerbdAEStore      from '../../../../data/dictionary/verbd/addedit/VerbdAEStore'
import StringStore       from '../../../../data/strings/StringStore'

describe("VerbdEditForm", () => {

    it("Renders a VerbdAEForm, add mode, VerbdPanelLevel.BASE", () => {
        const props = {
            verbd: Map({
                addedit: VerbdAEStore.getInitialState().setIn(['addVerbd'],true),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <VerbdAEForm verbdPanelLevel = {VerbdPanelLevel.BASE} {...props} />
        const verbdAEForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbdAEForm.type).toBe('div')
        expect(verbdAEForm.props.children.length).toBe(2) // base controls, buttons
        expect(verbdAEForm.props.children[1].props.children.length).toBe(2) // save, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a VerbdAEForm, add mode, VerbdPanelLevel.PAST_TENSE", () => {
        const props = {
            verbd: Map({
                addedit: VerbdAEStore.getInitialState().setIn(['addVerbd'],true),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <VerbdAEForm verbdPanelLevel = {VerbdPanelLevel.PAST_TENSE} {...props} />
        const verbdAEForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbdAEForm.type).toBe('div')
        expect(verbdAEForm.props.children.length).toBe(4) // base controls, past tense, input, buttons
        expect(verbdAEForm.props.children[3].props.children.length).toBe(2) // save, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })


    it("Renders a VerbdAEForm, edit mode, VerbdPanelLevel.BASE", () => {
        const props = {
            verbd: Map({
                addedit: VerbdAEStore.getInitialState().setIn(['verbd','id'],'1'),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }
        const renderExpression = <VerbdAEForm verbdPanelLevel = {VerbdPanelLevel.BASE} {...props}/>
        const verbdAEForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbdAEForm.type).toBe('div')
        expect(verbdAEForm.props.children.length).toBe(2) // base controls, buttons
        expect(verbdAEForm.props.children[1].props.children.length).toBe(3) // save, delete, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a VerbdAEForm, edit mode, VerbdPanelLevel.PAST_TENSE", () => {
        const props = {
            verbd: Map({
                addedit: VerbdAEStore.getInitialState().setIn(['verbd','id'],'1'),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }
        const renderExpression = <VerbdAEForm verbdPanelLevel = {VerbdPanelLevel.PAST_TENSE} {...props}/>
        const verbdAEForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbdAEForm.type).toBe('div')
        expect(verbdAEForm.props.children.length).toBe(4) // base controls, past tense, input, buttons
        expect(verbdAEForm.props.children[3].props.children.length).toBe(3) // save, delete, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})


/*import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import {VerbdPanelLevel} from '../../../../data/dictionary/verbd/VerbdConstants'
import VerbdAEForm       from './VerbdAEForm'
import VerbdAEStore      from '../../../../data/dictionary/verbd/addedit/VerbdAEStore'
import StringStore       from '../../../../data/strings/StringStore'

describe("VerbdEditForm", () => {

    it("Renders a VerbdAEForm, add mode, VerbdPanelLevel.BASE", () => {
        const props = {
            verbd: Map({
                addedit: VerbdAEStore.getInitialState().setIn(['addVerbd'],true),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <VerbdAEForm verbdPanelLevel = {VerbdPanelLevel.BASE} {...props} />
        const verbdAEForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbdAEForm.type).toBe('div')
        expect(verbdAEForm.props.children.length).toBe(2) // base controls, buttons
        expect(verbdAEForm.props.children[1].props.children.length).toBe(2) // save, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a VerbdAEForm, add mode, VerbdPanelLevel.PLURALIZATION", () => {
        const props = {
            verbd: Map({
                addedit: VerbdAEStore.getInitialState().setIn(['addVerbd'],true),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <VerbdAEForm verbdPanelLevel = {VerbdPanelLevel.PLURALIZATION} {...props} />
        const verbdAEForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbdAEForm.type).toBe('div')
        expect(verbdAEForm.props.children.length).toBe(5) // base controls, plural, input, pluraliation_rule_select, buttons
        expect(verbdAEForm.props.children[4].props.children.length).toBe(2) // save, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })


    it("Renders a VerbdAEForm, edit mode, VerbdPanelLevel.BASE", () => {
        const props = {
            verbd: Map({
                addedit: VerbdAEStore.getInitialState().setIn(['verbd','id'],'1'),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }
        const renderExpression = <VerbdAEForm verbdPanelLevel = {VerbdPanelLevel.BASE} {...props}/>
        const verbdAEForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbdAEForm.type).toBe('div')
        expect(verbdAEForm.props.children.length).toBe(2) // base controls, buttons
        expect(verbdAEForm.props.children[1].props.children.length).toBe(3) // save, delete, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a VerbdAEForm, edit mode, VerbdPanelLevel.PLURALIZATION", () => {
        const props = {
            verbd: Map({
                addedit: VerbdAEStore.getInitialState().setIn(['verbd','id'],'1'),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }
        const renderExpression = <VerbdAEForm verbdPanelLevel = {VerbdPanelLevel.PLURALIZATION} {...props}/>
        const verbdAEForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbdAEForm.type).toBe('div')
        expect(verbdAEForm.props.children.length).toBe(5) // base controls, plural, input, pluraliation_rule_select, buttons
        expect(verbdAEForm.props.children[4].props.children.length).toBe(3) // save, delete, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
*/