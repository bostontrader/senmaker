import React from 'react'

import ReactTestUtils    from 'react-dom/test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import NPRow   from './NPRow'
import NPTable from './NPTable'

import initialState         from '../../data/StateGetter'
import {npExamples}         from '../../data/TestData'
import NPActionTypes        from '../../data/np/NPActionTypes'
import NPStore              from '../../data/np/NPStore'

describe("NPTable", () => {

    let state

    let dispatch = action => {
        const n = NPStore.reduce(state.np.get('dict'), action)
        state.np = state.np.set('dict',n)
    }

    beforeEach(() => {
        state = {}
        state.strings = initialState.strings
        state.np      = initialState.np
    })

    describe("An Empty NPTable", () => {
        it("Renders no NPTable", () => {
            const renderExpression = <NPTable {...state} />
            const npTable = ReactTestUtils.createRenderer().render(renderExpression)

            // Zero NPTable
            const npRows = findAllWithType(npTable, NPTable)
            expect(npRows.length).toBe(0)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })
    })

    describe("An NPTable with one item", () => {
        it("Renders an NPTable", () => {
            dispatch({type: NPActionTypes.INSERT_NP, np: npExamples.a})

            const renderExpression = <NPTable {...state} />
            const npTable = ReactTestUtils.createRenderer().render(renderExpression)
            expect(npTable.type).toBe('table')

            // Two columns in the thead
            expect(npTable.props.children[0].props.children.props.children.length).toBe(2) // np, edit

            // One NPRow
            const npRows = findAllWithType(npTable, NPRow)
            expect(npRows.length).toBe(1)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

    })


    describe("An NPTable with more than one item", () => {
        it("Renders an NPTable", () => {
            dispatch({type: NPActionTypes.INSERT_NP, np: npExamples.a})
            dispatch({type: NPActionTypes.INSERT_NP, np: npExamples.b})

            const renderExpression = <NPTable {...state} />
            const npTable = ReactTestUtils.createRenderer().render(renderExpression)
            expect(npTable.type).toBe('table')

            // Two columns in the thead
            expect(npTable.props.children[0].props.children.props.children.length).toBe(2) // np, edit

            // Two NPRow
            const npRows = findAllWithType(npTable, NPRow)
            expect(npRows.length).toBe(2)

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

    })

})
