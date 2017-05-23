import React from 'react'

import ReactTestUtils from 'react-dom/test-utils'
import rtRenderer     from 'react-test-renderer'

import VerbdAEForm       from './VerbdAEForm'
import initialState      from '../../../../data/StateGetter'
import {VerbdPanelLevel} from '../../../../data/dictionary/verbd/VerbdConstants'
import VerbdAEStore      from '../../../../data/dictionary/verbd/addedit/VerbdAEStore'
import StringStore       from '../../../../data/strings/StringStore'

describe("VerbdAEForm", function() {

    let state

    beforeEach( () => {state = initialState})

    describe("VerbdPanelLevel.BASE", function() {

        it("add mode", function() {
            state.verbd = state.verbd.setIn(['addedit','addVerbd'],true)
            const renderExpression = <VerbdAEForm verbdPanelLevel = {VerbdPanelLevel.BASE} {...state} />
            const verbdAEForm = ReactTestUtils.createRenderer().render(renderExpression)
            expect(verbdAEForm.type).toBe('div')
            expect(verbdAEForm.props.children.length).toBe(2) // base controls, buttons
            expect(verbdAEForm.props.children[1].props.children.length).toBe(2) // save, cancel

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it("edit mode", function() {
            state.verbd = state.verbd.setIn(['addedit','addVerbd'],false)
            state.verbd = state.verbd.setIn(['addedit','verbd','id'],'1')
            const renderExpression = <VerbdAEForm verbdPanelLevel = {VerbdPanelLevel.BASE} {...state}/>
            const verbdAEForm = ReactTestUtils.createRenderer().render(renderExpression)
            expect(verbdAEForm.type).toBe('div')
            expect(verbdAEForm.props.children.length).toBe(2) // base controls, buttons
            expect(verbdAEForm.props.children[1].props.children.length).toBe(3) // save, delete, cancel

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

    })

    describe("VerbdPanelLevel.PAST_FORM", function() {

        it("add mode", function() {
            state.verbd = state.verbd.setIn(['addedit','addVerbd'],true)
            const renderExpression = <VerbdAEForm verbdPanelLevel = {VerbdPanelLevel.PAST_FORM} {...state} />
            const verbdAEForm = ReactTestUtils.createRenderer().render(renderExpression)
            expect(verbdAEForm.type).toBe('div')
            expect(verbdAEForm.props.children.length).toBe(4) // base controls, past form, input, buttons
            expect(verbdAEForm.props.children[3].props.children.length).toBe(2) // save, cancel

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it("edit mode", function() {
            state.verbd = state.verbd.setIn(['addedit','addVerbd'],false)
            state.verbd = state.verbd.setIn(['addedit','verbd','id'],'1')
            const renderExpression = <VerbdAEForm verbdPanelLevel = {VerbdPanelLevel.PAST_FORM} {...state}/>
            const verbdAEForm = ReactTestUtils.createRenderer().render(renderExpression)
            expect(verbdAEForm.type).toBe('div')
            expect(verbdAEForm.props.children.length).toBe(4) // base controls, past form, input, buttons
            expect(verbdAEForm.props.children[3].props.children.length).toBe(3) // save, delete, cancel

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })
    })

    /*describe("VerbdPanelLevel.MAX", function() {

        it("add mode", function() {
            state.verbd = state.verbd.setIn(['addedit','addVerbd'],true)
            const renderExpression = <VerbdAEForm verbdPanelLevel = {VerbdPanelLevel.MAX} {...state} />
            const verbdAEForm = ReactTestUtils.createRenderer().render(renderExpression)
            expect(verbdAEForm.type).toBe('div')
            expect(verbdAEForm.props.children.length).toBe(5) // base controls, past form rule select, past form, input, buttons
            expect(verbdAEForm.props.children[4].props.children.length).toBe(2) // save, cancel

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it("edit mode", function() {
            state.verbd = state.verbd.setIn(['addedit','verbd','id'],'1')
            const renderExpression = <VerbdAEForm verbdPanelLevel = {VerbdPanelLevel.MAX} {...state}/>
            const verbdAEForm = ReactTestUtils.createRenderer().render(renderExpression)
            expect(verbdAEForm.type).toBe('div')
            expect(verbdAEForm.props.children.length).toBe(5) // base controls, past form rule select, past form, input, buttons
            expect(verbdAEForm.props.children[4].props.children.length).toBe(3) // save, delete, cancel

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })
    })*/

})
