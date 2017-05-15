import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-dom/test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import VerbdRow   from './VerbdRow'
import VerbdTable from './VerbdTable'

import {verbdExamples}     from '../../../data/TestData'
import AppStore            from '../../../data/app/AppStore'
import VerbdActionTypes    from '../../../data/dictionary/verbd/VerbdActionTypes'
import {VerbdPanelLevel}   from '../../../data/dictionary/verbd/VerbdConstants'
import VerbdStore          from '../../../data/dictionary/verbd/VerbdStore'
import StringStore         from '../../../data/strings/StringStore'

describe("VerbdTable", function() {

    /*beforeEach(function() {
        this.state = {}
        this.state.app     = AppStore.getInitialState()
        this.state.strings = StringStore.getInitialState()
        this.state.verbd = Map({
            dict:VerbdStore.getInitialState()
        })

        this.dispatch = action => {
            this.state.app   = AppStore .reduce(this.state.app, action)
            const n = VerbdStore.reduce(this.state.verbd.get('dict'), action)
            this.state.verbd = this.state.verbd.set('dict',n)
        }
    })*/

    describe("An Empty VerbdTable", function() {
        it("Renders no VerbdPanelLevel.BASE VerbdTable", function() {
            /*const renderExpression = <VerbdTable verbdPanelLevel = {VerbdPanelLevel.BASE} {...this.state} />
            const verbdTable = ReactTestUtils.createRenderer().render(renderExpression)

            // Zero VerbdTable
            const verbdRows = findAllWithType(verbdTable, VerbdTable)
            expect(verbdRows.length).toBe(0)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()*/
        })

        /*it("Renders no VerbdPanelLevel.PAST_FORM VerbdTable", function() {
            const renderExpression = <VerbdTable verbdPanelLevel = {VerbdPanelLevel.PAST_FORM} {...this.state} />
            const verbdTable = ReactTestUtils.createRenderer().render(renderExpression)

            // Zero VerbdTable
            const verbdRows = findAllWithType(verbdTable, VerbdTable)
            expect(verbdRows.length).toBe(0)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it("Renders no VerbdPanelLevel.MAX VerbdTable", function() {
            const renderExpression = <VerbdTable verbdPanelLevel = {VerbdPanelLevel.MAX} {...this.state} />
            const verbdTable = ReactTestUtils.createRenderer().render(renderExpression)

            // Zero VerbdTable
            const verbdRows = findAllWithType(verbdTable, VerbdTable)
            expect(verbdRows.length).toBe(0)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })*/
    })


    /*describe("A VerbdTable with one item", function() {
        it("Renders a VerbdPanelLevel.BASE VerbdTable", function() {
            this.dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.a})

            const renderExpression = <VerbdTable verbdPanelLevel = {VerbdPanelLevel.BASE} {...this.state} />
            const verbdTable = ReactTestUtils.createRenderer().render(renderExpression)
            expect(verbdTable.type).toBe('table')

            // Two columns in the thead
            expect(verbdTable.props.children[0].props.children.props.children.length).toBe(2) // base verb, edit

            // One VerbdRow
            const verbdRows = findAllWithType(verbdTable, VerbdRow)
            expect(verbdRows.length).toBe(1)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it("Renders a VerbdPanelLevel.PAST_FORM VerbdTable", function() {
            this.dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.a})

            const renderExpression = <VerbdTable verbdPanelLevel = {VerbdPanelLevel.PAST_FORM} {...this.state} />
            const verbdTable = ReactTestUtils.createRenderer().render(renderExpression)
            expect(verbdTable.type).toBe('table')

            // Three columns in the thead
            expect(verbdTable.props.children[0].props.children.props.children.length).toBe(3) // base verb, past form, edit

            // One VerbdRow
            const verbdRows = findAllWithType(verbdTable, VerbdRow)
            expect(verbdRows.length).toBe(1)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it("Renders a VerbdPanelLevel.MAX VerbdTable", function() {
            this.dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.a})

            const renderExpression = <VerbdTable verbdPanelLevel = {VerbdPanelLevel.MAX} {...this.state} />
            const verbdTable = ReactTestUtils.createRenderer().render(renderExpression)
            expect(verbdTable.type).toBe('table')

            // Three columns in the thead
            expect(verbdTable.props.children[0].props.children.props.children.length).toBe(3) // base verb, past form, edit

            // One VerbdRow
            const verbdRows = findAllWithType(verbdTable, VerbdRow)
            expect(verbdRows.length).toBe(1)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })
    })


    describe("A VerbdTable with more than one item", function() {
        it("Renders a VerbdPanelLevel.BASE VerbdTable", function() {
            this.dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.a})
            this.dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.b})

            const renderExpression = <VerbdTable verbdPanelLevel = {VerbdPanelLevel.BASE} {...this.state} />
            const verbdTable = ReactTestUtils.createRenderer().render(renderExpression)
            expect(verbdTable.type).toBe('table')

            // Two columns in the thead
            expect(verbdTable.props.children[0].props.children.props.children.length).toBe(2) // base verb, edit

            // Two VerbdRow
            const verbdRows = findAllWithType(verbdTable, VerbdRow)
            expect(verbdRows.length).toBe(2)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it("Renders a VerbdPanelLevel.PAST_FORM VerbdTable", function() {
            this.dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.a})
            this.dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.b})

            const renderExpression = <VerbdTable verbdPanelLevel = {VerbdPanelLevel.PAST_FORM} {...this.state} />
            const verbdTable = ReactTestUtils.createRenderer().render(renderExpression)
            expect(verbdTable.type).toBe('table')

            // Three columns in the thead
            expect(verbdTable.props.children[0].props.children.props.children.length).toBe(3) // base verb, past form, edit

            // Two VerbdRow
            const verbdRows = findAllWithType(verbdTable, VerbdRow)
            expect(verbdRows.length).toBe(2)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it("Renders a VerbdPanelLevel.MAX VerbdTable", function() {
            this.dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.a})
            this.dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.b})

            const renderExpression = <VerbdTable verbdPanelLevel = {VerbdPanelLevel.MAX} {...this.state} />
            const verbdTable = ReactTestUtils.createRenderer().render(renderExpression)
            expect(verbdTable.type).toBe('table')

            // Three columns in the thead
            expect(verbdTable.props.children[0].props.children.props.children.length).toBe(3) // base verb, past form, edit

            // Two VerbdRow
            const verbdRows = findAllWithType(verbdTable, VerbdRow)
            expect(verbdRows.length).toBe(2)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })
    })*/

})
