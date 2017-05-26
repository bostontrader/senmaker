import React from 'react'

import ReactTestUtils    from 'react-dom/test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import ClauseRow   from './ClauseRow'
import ClauseTable from './ClauseTable'

import initialState      from '../../data/StateGetter'
import {clauseExamples}  from '../../data/TestData'
import ClauseActionTypes from '../../data/clause/ClauseActionTypes'
import ClauseStore       from '../../data/clause/ClauseStore'

describe("ClauseTable", () => {

    let state

    let dispatch = action => {
        const n = ClauseStore.reduce(state.clause.get('dict'), action)
        state.clause = state.clause.set('dict',n)
    }

    beforeEach(() => {
        state = {}
        state.strings = initialState.strings
        state.clause  = initialState.clause
    })

    it("Renders no ClauseTable", () => {
        const renderExpression = <ClauseTable {...state} />
        const clauseTable = ReactTestUtils.createRenderer().render(renderExpression)

        // Zero ClauseTable
        const clauseRows = findAllWithType(clauseTable, ClauseTable)
        expect(clauseRows.length).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a ClauseTable with one item", () => {
        dispatch({type: ClauseActionTypes.INSERT_CLAUSE, clause: clauseExamples.a})

        const renderExpression = <ClauseTable {...state} />
        const clauseTable = ReactTestUtils.createRenderer().render(renderExpression)
        expect(clauseTable.type).toBe('table')

        // Two columns in the thead
        expect(clauseTable.props.children[0].props.children.props.children.length).toBe(2) // base noun, edit

        // One ClauseRow
        const clauseRows = findAllWithType(clauseTable, ClauseRow)
        expect(clauseRows.length).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a ClauseTable with more than one item", () => {
        dispatch({type: ClauseActionTypes.INSERT_CLAUSE, clause: clauseExamples.a})
        dispatch({type: ClauseActionTypes.INSERT_CLAUSE, clause: clauseExamples.b})

        const renderExpression = <ClauseTable {...state} />
        const clauseTable = ReactTestUtils.createRenderer().render(renderExpression)
        expect(clauseTable.type).toBe('table')

        // Two columns in the thead
        expect(clauseTable.props.children[0].props.children.props.children.length).toBe(2) // base noun, edit

        // Two ClauseRow
        const clauseRows = findAllWithType(clauseTable, ClauseRow)
        expect(clauseRows.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
