import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import VerbdAEForm       from './VerbdAEForm'
import {VerbdPanelLevel} from '../../../../data/dictionary/verbd/VerbdConstants'
import VerbdAEStore      from '../../../../data/dictionary/verbd/addedit/VerbdAEStore'
import StringStore       from '../../../../data/strings/StringStore'

describe("VerbdAEForm", function() {

    beforeEach( function() {
        this.state = {
            verbd: Map({
                addedit: VerbdAEStore.getInitialState()
            }),
            strings:StringStore.getInitialState()
        }
    })

    describe("VerbdPanelLevel.BASE", function() {

        it("add mode", function() {
            this.state.verbd = this.state.verbd.setIn(['addedit','addNound'],true)
            const renderExpression = <VerbdAEForm verbdPanelLevel = {VerbdPanelLevel.BASE} {...this.state} />
            const verbdAEForm = TestUtils.createRenderer().render(renderExpression)
            expect(verbdAEForm.type).toBe('div')
            expect(verbdAEForm.props.children.length).toBe(2) // base controls, buttons
            expect(verbdAEForm.props.children[1].props.children.length).toBe(2) // save, cancel

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it("edit mode", function() {
            this.state.verbd = this.state.verbd.setIn(['addedit','verbd','id'],'1')
            const renderExpression = <VerbdAEForm verbdPanelLevel = {VerbdPanelLevel.BASE} {...this.state}/>
            const verbdAEForm = TestUtils.createRenderer().render(renderExpression)
            expect(verbdAEForm.type).toBe('div')
            expect(verbdAEForm.props.children.length).toBe(2) // base controls, buttons
            expect(verbdAEForm.props.children[1].props.children.length).toBe(3) // save, delete, cancel

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

    })

    describe("VerbdPanelLevel.PAST_TENSE", function() {

        it("add mode", function() {
            this.state.verbd = this.state.verbd.setIn(['addedit','addNound'],true)
            const renderExpression = <VerbdAEForm verbdPanelLevel = {VerbdPanelLevel.PAST_TENSE} {...this.state} />
            const verbdAEForm = TestUtils.createRenderer().render(renderExpression)
            expect(verbdAEForm.type).toBe('div')
            expect(verbdAEForm.props.children.length).toBe(4) // base controls, past tense, input, buttons
            expect(verbdAEForm.props.children[3].props.children.length).toBe(2) // save, cancel

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it("edit mode", function() {
            this.state.verbd = this.state.verbd.setIn(['addedit','verbd','id'],'1')
            const renderExpression = <VerbdAEForm verbdPanelLevel = {VerbdPanelLevel.PAST_TENSE} {...this.state}/>
            const verbdAEForm = TestUtils.createRenderer().render(renderExpression)
            expect(verbdAEForm.type).toBe('div')
            expect(verbdAEForm.props.children.length).toBe(4) // base controls, past tense, input, buttons
            expect(verbdAEForm.props.children[3].props.children.length).toBe(3) // save, delete, cancel

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })
    })

    describe("VerbdPanelLevel.MAX", function() {

        it("add mode", function() {
            this.state.verbd = this.state.verbd.setIn(['addedit','addNound'],true)
            const renderExpression = <VerbdAEForm verbdPanelLevel = {VerbdPanelLevel.MAX} {...this.state} />
            const verbdAEForm = TestUtils.createRenderer().render(renderExpression)
            expect(verbdAEForm.type).toBe('div')
            expect(verbdAEForm.props.children.length).toBe(4) // base controls, past tense, input, buttons
            expect(verbdAEForm.props.children[3].props.children.length).toBe(2) // save, cancel

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it("edit mode", function() {
            this.state.verbd = this.state.verbd.setIn(['addedit','verbd','id'],'1')
            const renderExpression = <VerbdAEForm verbdPanelLevel = {VerbdPanelLevel.MAX} {...this.state}/>
            const verbdAEForm = TestUtils.createRenderer().render(renderExpression)
            expect(verbdAEForm.type).toBe('div')
            expect(verbdAEForm.props.children.length).toBe(4) // base controls, past tense, input, buttons
            expect(verbdAEForm.props.children[3].props.children.length).toBe(3) // save, delete, cancel

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })
    })

})
