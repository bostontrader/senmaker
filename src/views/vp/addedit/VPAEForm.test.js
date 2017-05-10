import {Map} from 'immutable'
import React from 'react'

import TestUtils  from 'react-addons-test-utils'
//import rtRenderer from 'react-test-renderer'

import VPAEForm         from './VPAEForm'
import {VPPanelLevel}   from '../../../data/vp/VPConstants'
import VerbdStore       from '../../../data/dictionary/verbd/VerbdStore'
import VPAEStore        from '../../../data/vp/addedit/VPAEStore'
import StringStore      from '../../../data/strings/StringStore'

describe("VPAEForm", function() {

    beforeEach( function() {
        this.state = {
            verbd: Map({
                dict: VerbdStore.getInitialState()
            }),
            vp: Map({
                addedit: VPAEStore.getInitialState(),
            }),
            strings:StringStore.getInitialState()
        }
    })

    describe("VPPanelLevel.L1", function() {

        it("add mode", function() {
            this.state.vp = this.state.vp.setIn(['addedit','addVP'],true)
            const renderExpression = <VPAEForm vpPanelLevel = {VPPanelLevel.L1} {...this.state} />
            const vpAEForm = TestUtils.createRenderer().render(renderExpression)
            expect(vpAEForm.type).toBe('div')
            expect(vpAEForm.props.children.length).toBe(4) // verbd select, time radio group, generatedText, theButtons
            expect(vpAEForm.props.children[1].props.children.length).toBe(6) // past, present, future x 2
            expect(vpAEForm.props.children[3].props.children.length).toBe(2) // save, cancel

            // The Select control fubars this
            //const tree = rtRenderer.create(renderExpression).toJSON()
            //expect(tree).toMatchSnapshot()
        })


        it("edit mode", function() {
            this.state.vp = this.state.vp.setIn(['addedit','vp','id'],'1')
            const renderExpression = <VPAEForm vpPanelLevel = {VPPanelLevel.L1} {...this.state} />
            const vpAEForm = TestUtils.createRenderer().render(renderExpression)
            expect(vpAEForm.type).toBe('div')
            expect(vpAEForm.props.children.length).toBe(4) // verbd select, time radio group, generatedText, theButtons
            expect(vpAEForm.props.children[1].props.children.length).toBe(6) // past, present, future x 2
            expect(vpAEForm.props.children[3].props.children.length).toBe(3) // save, delete, cancel

            // The Select control fubars this
            //const tree = rtRenderer.create(renderExpression).toJSON()
            //expect(tree).toMatchSnapshot()
        })

    })

    describe("VPPanelLevel.L2", () => {

        it("add mode", function() {
            this.state.vp = this.state.vp.setIn(['addedit','addVP'],true)
            const renderExpression = <VPAEForm vpPanelLevel = {VPPanelLevel.L2} {...this.state} />
            const vpAEForm = TestUtils.createRenderer().render(renderExpression)
            expect(vpAEForm.type).toBe('div')

            expect(vpAEForm.props.children.length).toBe(7) // verbd select, time radio group, simple, perfect, progressive, generatedText, theButtons
            expect(vpAEForm.props.children[6].props.children.length).toBe(2) // save, cancel

            // The Select control fubars this
            //const tree = rtRenderer.create(renderExpression).toJSON()
            //expect(tree).toMatchSnapshot()
        })

        it("edit mode", function() {
            this.state.vp = this.state.vp.setIn(['addedit','vp','id'],'1')
            const renderExpression = <VPAEForm vpPanelLevel = {VPPanelLevel.L2} {...this.state} />
            const vpAEForm = TestUtils.createRenderer().render(renderExpression)
            expect(vpAEForm.type).toBe('div')
            expect(vpAEForm.props.children.length).toBe(7) // verbd select, time radio group, simple, perfect, progressive, generatedText, theButtons
            expect(vpAEForm.props.children[6].props.children.length).toBe(3) // save, delete, cancel

            // The Select control fubars this
            //const tree = rtRenderer.create(renderExpression).toJSON()
            //expect(tree).toMatchSnapshot()
        })

    })

})
