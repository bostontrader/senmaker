import React from 'react'

import ReactTestUtils    from 'react-dom/test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import VerbdRow   from './VerbdRow'
import VerbdTable from './VerbdTable'

import initialState      from '../../../data/StateGetter'
import {verbdExamples}   from '../../../data/TestData'
import AppStore          from '../../../data/app/AppStore'
import VerbdActionTypes  from '../../../data/dictionary/verbd/VerbdActionTypes'
import {VerbdPanelLevel} from '../../../data/dictionary/verbd/VerbdConstants'
import VerbdStore        from '../../../data/dictionary/verbd/VerbdStore'
import StringStore       from '../../../data/strings/StringStore'

describe("VerbdTable", function() {

    let state

    let dispatch = action => {
        const n = VerbdStore.reduce(state.verbd.get('dict'), action)
        state.verbd = state.verbd.set('dict',n)
    }

    beforeEach(() => {
        state = {}
        state.strings = initialState.strings
        state.verbd   = initialState.verbd
    })
    
    /*beforeEach(function() {
        state = {}
        state.app     = AppStore.getInitialState()
        state.strings = StringStore.getInitialState()
        state.verbd = Map({
            dict:VerbdStore.getInitialState()
        })

        dispatch = action => {
            state.app   = AppStore .reduce(state.app, action)
            const n = VerbdStore.reduce(state.verbd.get('dict'), action)
            state.verbd = state.verbd.set('dict',n)
        }
    })*/

    describe("An Empty VerbdTable", function() {
        it("Renders no VerbdPanelLevel.BASE VerbdTable", function() {
            const renderExpression = <VerbdTable verbdPanelLevel = {VerbdPanelLevel.BASE} {...state} />
            const verbdTable = ReactTestUtils.createRenderer().render(renderExpression)

            // Zero VerbdTable
            const verbdRows = findAllWithType(verbdTable, VerbdTable)
            expect(verbdRows.length).toBe(0)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it("Renders no VerbdPanelLevel.PAST_FORM VerbdTable", function() {
            const renderExpression = <VerbdTable verbdPanelLevel = {VerbdPanelLevel.PAST_FORM} {...state} />
            const verbdTable = ReactTestUtils.createRenderer().render(renderExpression)

            // Zero VerbdTable
            const verbdRows = findAllWithType(verbdTable, VerbdTable)
            expect(verbdRows.length).toBe(0)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

        /*it("Renders no VerbdPanelLevel.MAX VerbdTable", function() {
            const renderExpression = <VerbdTable verbdPanelLevel = {VerbdPanelLevel.MAX} {...state} />
            const verbdTable = ReactTestUtils.createRenderer().render(renderExpression)

            // Zero VerbdTable
            const verbdRows = findAllWithType(verbdTable, VerbdTable)
            expect(verbdRows.length).toBe(0)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })*/
    })


    describe("A VerbdTable with one item", function() {
        it("Renders a VerbdPanelLevel.BASE VerbdTable", function() {
            dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.a})

            const renderExpression = <VerbdTable verbdPanelLevel = {VerbdPanelLevel.BASE} {...state} />
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
            dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.a})

            const renderExpression = <VerbdTable verbdPanelLevel = {VerbdPanelLevel.PAST_FORM} {...state} />
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

        /*it("Renders a VerbdPanelLevel.MAX VerbdTable", function() {
            dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.a})

            const renderExpression = <VerbdTable verbdPanelLevel = {VerbdPanelLevel.MAX} {...state} />
            const verbdTable = ReactTestUtils.createRenderer().render(renderExpression)
            expect(verbdTable.type).toBe('table')

            // Three columns in the thead
            expect(verbdTable.props.children[0].props.children.props.children.length).toBe(3) // base verb, past form, edit

            // One VerbdRow
            const verbdRows = findAllWithType(verbdTable, VerbdRow)
            expect(verbdRows.length).toBe(1)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })*/
    })


    describe("A VerbdTable with more than one item", function() {
        it("Renders a VerbdPanelLevel.BASE VerbdTable", function() {
            dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.a})
            dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.b})

            const renderExpression = <VerbdTable verbdPanelLevel = {VerbdPanelLevel.BASE} {...state} />
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
            dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.a})
            dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.b})

            const renderExpression = <VerbdTable verbdPanelLevel = {VerbdPanelLevel.PAST_FORM} {...state} />
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

        /*it("Renders a VerbdPanelLevel.MAX VerbdTable", function() {
            dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.a})
            dispatch({type: VerbdActionTypes.INSERT_VERBD, verbd: verbdExamples.b})

            const renderExpression = <VerbdTable verbdPanelLevel = {VerbdPanelLevel.MAX} {...state} />
            const verbdTable = ReactTestUtils.createRenderer().render(renderExpression)
            expect(verbdTable.type).toBe('table')

            // Three columns in the thead
            expect(verbdTable.props.children[0].props.children.props.children.length).toBe(3) // base verb, past form, edit

            // Two VerbdRow
            const verbdRows = findAllWithType(verbdTable, VerbdRow)
            expect(verbdRows.length).toBe(2)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })*/
    })

})
