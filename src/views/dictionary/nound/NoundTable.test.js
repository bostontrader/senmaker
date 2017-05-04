import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import NoundRow   from './NoundRow'
import NoundTable from './NoundTable'

import {noundExamples}     from '../../../data/TestData'
import AppStore            from '../../../data/app/AppStore'
import NoundActionTypes    from '../../../data/dictionary/nound/NoundActionTypes'
import {NoundPanelLevel}   from '../../../data/dictionary/nound/NoundConstants'
import NoundStore          from '../../../data/dictionary/nound/NoundStore'
import StringStore         from '../../../data/strings/StringStore'

describe("NoundTable", function() {

    beforeEach(function() {
        this.state = {}
        this.state.app     = AppStore.getInitialState()
        this.state.strings = StringStore.getInitialState()
        this.state.nound = Map({
            dict:NoundStore.getInitialState()
        })

        this.dispatch = action => {
            this.state.app   = AppStore .reduce(this.state.app, action)
            const n = NoundStore.reduce(this.state.nound.get('dict'), action)
            this.state.nound = this.state.nound.set('dict',n)
        }
    })

    describe("An Empty NoundTable", function() {
        it("Renders a NoundPanelLevel.BASE NoundTable", function() {
            const renderExpression = <NoundTable noundPanelLevel = {NoundPanelLevel.BASE} {...this.state} />
            const noundTable = TestUtils.createRenderer().render(renderExpression)

            // Zero NoundTable
            const nounItems = findAllWithType(noundTable, NoundTable)
            expect(nounItems.length).toBe(0)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it("Renders a NoundPanelLevel.PLURALIZATION NoundTable", function() {
            const renderExpression = <NoundTable noundPanelLevel = {NoundPanelLevel.PLURALIZATION} {...this.state} />
            const noundTable = TestUtils.createRenderer().render(renderExpression)

            // Zero NoundTable
            const nounItems = findAllWithType(noundTable, NoundTable)
            expect(nounItems.length).toBe(0)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })
    })


    describe("A NoundTable with one item", function() {
        it("Renders a NoundPanelLevel.BASE NoundTable", function() {
            this.dispatch({type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.a})

            const renderExpression = <NoundTable noundPanelLevel = {NoundPanelLevel.BASE} {...this.state} />
            const noundTable = TestUtils.createRenderer().render(renderExpression)
            expect(noundTable.type).toBe('table')

            // Two columns in the thead
            expect(noundTable.props.children[0].props.children.props.children.length).toBe(2) // base noun, edit

            // One NoundRow
            const nounItems = findAllWithType(noundTable, NoundRow)
            expect(nounItems.length).toBe(1)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it("Renders a NoundPanelLevel.PLURALIZATION NoundTable", function() {
            this.dispatch({type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.a})

            const renderExpression = <NoundTable noundPanelLevel = {NoundPanelLevel.PLURALIZATION} {...this.state} />
            const noundTable = TestUtils.createRenderer().render(renderExpression)
            expect(noundTable.type).toBe('table')

            // Three columns in the thead
            expect(noundTable.props.children[0].props.children.props.children.length).toBe(3) // base noun, plural, edit

            // One NoundRow
            const nounItems = findAllWithType(noundTable, NoundRow)
            expect(nounItems.length).toBe(1)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })
    })


    describe("A NoundTable with more than one item", function() {
        it("Renders a NoundPanelLevel.BASE NoundTable", function() {
            this.dispatch({type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.a})
            this.dispatch({type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.b})

            const renderExpression = <NoundTable noundPanelLevel = {NoundPanelLevel.BASE} {...this.state} />
            const noundTable = TestUtils.createRenderer().render(renderExpression)
            expect(noundTable.type).toBe('table')

            // Two columns in the thead
            expect(noundTable.props.children[0].props.children.props.children.length).toBe(2) // base noun, edit

            // Two NoundRow
            const nounItems = findAllWithType(noundTable, NoundRow)
            expect(nounItems.length).toBe(2)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it("Renders a NoundPanelLevel.PLURALIZATION NoundTable", function() {
            this.dispatch({type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.a})
            this.dispatch({type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.b})

            const renderExpression = <NoundTable noundPanelLevel = {NoundPanelLevel.PLURALIZATION} {...this.state} />
            const noundTable = TestUtils.createRenderer().render(renderExpression)
            expect(noundTable.type).toBe('table')

            // Three columns in the thead
            expect(noundTable.props.children[0].props.children.props.children.length).toBe(3) // base noun, plural, edit

            // Two NoundRow
            const nounItems = findAllWithType(noundTable, NoundRow)
            expect(nounItems.length).toBe(2)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })
    })

})
