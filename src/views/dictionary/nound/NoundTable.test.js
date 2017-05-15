import React from 'react'

import ReactTestUtils    from 'react-dom/test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import NoundRow   from './NoundRow'
import NoundTable from './NoundTable'

import initialState      from '../../../data/StateGetter'
import {noundExamples}   from '../../../data/TestData'
import NoundActionTypes  from '../../../data/dictionary/nound/NoundActionTypes'
import {NoundPanelLevel} from '../../../data/dictionary/nound/NoundConstants'
import NoundStore        from '../../../data/dictionary/nound/NoundStore'

describe("NoundTable", () => {

    let state
    
    let dispatch = action => {
        const n = NoundStore.reduce(state.nound.get('dict'), action)
        state.nound = state.nound.set('dict',n)
    }

    beforeEach(() => {
        state = {}
        state.strings = initialState.strings
        state.nound   = initialState.nound
    })

    describe("An Empty NoundTable", () => {
        it("Renders no NoundPanelLevel.BASE NoundTable", () => {
            const renderExpression = <NoundTable noundPanelLevel = {NoundPanelLevel.BASE} {...state} />
            const noundTable = ReactTestUtils.createRenderer().render(renderExpression)

            // Zero NoundTable
            const noundRows = findAllWithType(noundTable, NoundTable)
            expect(noundRows.length).toBe(0)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it("Renders no NoundPanelLevel.PLURALIZATION NoundTable", () => {
            const renderExpression = <NoundTable noundPanelLevel = {NoundPanelLevel.PLURALIZATION} {...state} />
            const noundTable = ReactTestUtils.createRenderer().render(renderExpression)

            // Zero NoundTable
            const noundRows = findAllWithType(noundTable, NoundTable)
            expect(noundRows.length).toBe(0)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })
    })


    describe("A NoundTable with one item", () => {
        it("Renders a NoundPanelLevel.BASE NoundTable", () => {
            dispatch({type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.a})

            const renderExpression = <NoundTable noundPanelLevel = {NoundPanelLevel.BASE} {...state} />
            const noundTable = ReactTestUtils.createRenderer().render(renderExpression)
            expect(noundTable.type).toBe('table')

            // Two columns in the thead
            expect(noundTable.props.children[0].props.children.props.children.length).toBe(2) // base noun, edit

            // One NoundRow
            const noundRows = findAllWithType(noundTable, NoundRow)
            expect(noundRows.length).toBe(1)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it("Renders a NoundPanelLevel.PLURALIZATION NoundTable", () => {
            dispatch({type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.a})

            const renderExpression = <NoundTable noundPanelLevel = {NoundPanelLevel.PLURALIZATION} {...state} />
            const noundTable = ReactTestUtils.createRenderer().render(renderExpression)
            expect(noundTable.type).toBe('table')

            // Three columns in the thead
            expect(noundTable.props.children[0].props.children.props.children.length).toBe(3) // base noun, plural, edit

            // One NoundRow
            const noundRows = findAllWithType(noundTable, NoundRow)
            expect(noundRows.length).toBe(1)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })
    })


    describe("A NoundTable with more than one item", () => {
        it("Renders a NoundPanelLevel.BASE NoundTable", () => {
            dispatch({type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.a})
            dispatch({type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.b})

            const renderExpression = <NoundTable noundPanelLevel = {NoundPanelLevel.BASE} {...state} />
            const noundTable = ReactTestUtils.createRenderer().render(renderExpression)
            expect(noundTable.type).toBe('table')

            // Two columns in the thead
            expect(noundTable.props.children[0].props.children.props.children.length).toBe(2) // base noun, edit

            // Two NoundRow
            const noundRows = findAllWithType(noundTable, NoundRow)
            expect(noundRows.length).toBe(2)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it("Renders a NoundPanelLevel.PLURALIZATION NoundTable", () => {
            dispatch({type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.a})
            dispatch({type: NoundActionTypes.INSERT_NOUND, nound: noundExamples.b})

            const renderExpression = <NoundTable noundPanelLevel = {NoundPanelLevel.PLURALIZATION} {...state} />
            const noundTable = ReactTestUtils.createRenderer().render(renderExpression)
            expect(noundTable.type).toBe('table')

            // Three columns in the thead
            expect(noundTable.props.children[0].props.children.props.children.length).toBe(3) // base noun, plural, edit

            // Two NoundRow
            const noundRows = findAllWithType(noundTable, NoundRow)
            expect(noundRows.length).toBe(2)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })
    })

})
