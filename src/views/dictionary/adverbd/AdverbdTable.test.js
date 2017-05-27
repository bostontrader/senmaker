import React from 'react'

import ReactTestUtils    from 'react-dom/test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import AdverbdRow   from './AdverbdRow'
import AdverbdTable from './AdverbdTable'

import initialState       from '../../../data/StateGetter'
import {adverbdExamples}  from '../../../data/TestData'
import AdverbdActionTypes from '../../../data/dictionary/adverbd/AdverbdActionTypes'
import AdverbdStore       from '../../../data/dictionary/adverbd/AdverbdStore'

describe("AdverbdTable", function() {

    let state

    let dispatch = action => {
        const n = AdverbdStore.reduce(state.adverbd.get('dict'), action)
        state.adverbd = state.adverbd.set('dict',n)
    }

    beforeEach(() => {
        state = {}
        state.strings   = initialState.strings
        state.adverbd = initialState.adverbd
    })

    it("Renders no AdverbdTable", function() {
        const renderExpression = <AdverbdTable {...state} />
        const adverbdTable = ReactTestUtils.createRenderer().render(renderExpression)

        // Zero AdverbdTable
        const adverbdRows = findAllWithType(adverbdTable, AdverbdTable)
        expect(adverbdRows.length).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders an AdverbdPanelLevel with one item.", function() {
        dispatch({type: AdverbdActionTypes.INSERT_ADVERBD, adverbd: adverbdExamples.a})

        const renderExpression = <AdverbdTable {...state} />
        const adverbdTable = ReactTestUtils.createRenderer().render(renderExpression)
        expect(adverbdTable.type).toBe('table')

        // Two columns in the thead
        expect(adverbdTable.props.children[0].props.children.props.children.length).toBe(2) // base noun, edit

        // One AdverbdRow
        const adverbdRows = findAllWithType(adverbdTable, AdverbdRow)
        expect(adverbdRows.length).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders an AdverbdTable with more than one item.", function() {
        dispatch({type: AdverbdActionTypes.INSERT_ADVERBD, adverbd: adverbdExamples.a})
        dispatch({type: AdverbdActionTypes.INSERT_ADVERBD, adverbd: adverbdExamples.b})

        const renderExpression = <AdverbdTable {...state} />
        const adverbdTable = ReactTestUtils.createRenderer().render(renderExpression)
        expect(adverbdTable.type).toBe('table')

        // Two columns in the thead
        expect(adverbdTable.props.children[0].props.children.props.children.length).toBe(2) // base noun, edit

        // Two AdverbdRow
        const adverbdRows = findAllWithType(adverbdTable, AdverbdRow)
        expect(adverbdRows.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
