import {Map} from 'immutable'
import React from 'react'

import TestUtils  from 'react-addons-test-utils'
import rtRenderer from 'react-test-renderer'

import NoundAEForm       from './NoundAEForm'
import {NoundPanelLevel} from '../../../../data/dictionary/nound/NoundConstants'
import NoundAEStore      from '../../../../data/dictionary/nound/addedit/NoundAEStore'
import StringStore       from '../../../../data/strings/StringStore'

describe("NoundAEForm", function() {

    beforeEach( function() {
        this.state = {
            nound: Map({
                addedit: NoundAEStore.getInitialState()
            }),
            strings:StringStore.getInitialState()
        }
    })

    describe("NoundPanelLevel.BASE", function() {

        it("add mode", function() {
            this.state.nound = this.state.nound.setIn(['addedit','addNound'],true)
            const renderExpression = <NoundAEForm noundPanelLevel = {NoundPanelLevel.BASE} {...this.state} />
            const noundAEForm = TestUtils.createRenderer().render(renderExpression)
            expect(noundAEForm.type).toBe('div')
            expect(noundAEForm.props.children.length).toBe(2) // base controls, buttons
            expect(noundAEForm.props.children[1].props.children.length).toBe(2) // save, cancel

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it("edit mode", function() {
            this.state.nound = this.state.nound.setIn(['addedit','nound','id'],'1')
            const renderExpression = <NoundAEForm noundPanelLevel = {NoundPanelLevel.BASE} {...this.state}/>
            const noundAEForm = TestUtils.createRenderer().render(renderExpression)
            expect(noundAEForm.type).toBe('div')
            expect(noundAEForm.props.children.length).toBe(2) // base controls, buttons
            expect(noundAEForm.props.children[1].props.children.length).toBe(3) // save, delete, cancel

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

    })

    describe("NoundPanelLevel.PLURALIZATION", function() {

        it("add mode", function() {
            this.state.nound = this.state.nound.setIn(['addedit','addNound'],true)
            const renderExpression = <NoundAEForm noundPanelLevel = {NoundPanelLevel.PLURALIZATION} {...this.state} />
            const noundAEForm = TestUtils.createRenderer().render(renderExpression)
            expect(noundAEForm.type).toBe('div')
            expect(noundAEForm.props.children.length).toBe(5) // base controls, plural, input, pluraliation_rule_select, buttons
            expect(noundAEForm.props.children[4].props.children.length).toBe(2) // save, cancel

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it("edit mode", function() {
            this.state.nound = this.state.nound.setIn(['addedit','nound','id'],'1')
            const renderExpression = <NoundAEForm noundPanelLevel = {NoundPanelLevel.PLURALIZATION} {...this.state}/>
            const noundAEForm = TestUtils.createRenderer().render(renderExpression)
            expect(noundAEForm.type).toBe('div')
            expect(noundAEForm.props.children.length).toBe(5) // base controls, plural, input, pluraliation_rule_select, buttons
            expect(noundAEForm.props.children[4].props.children.length).toBe(3) // save, delete, cancel

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })
    })

})
