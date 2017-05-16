import React from 'react'

import ReactTestUtils    from 'react-dom/test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import AdjectivdRow   from './AdjectivdRow'
import AdjectivdTable from './AdjectivdTable'

import initialState      from '../../../data/StateGetter'
import {adjectivdExamples}  from '../../../data/TestData'
import AdjectivdActionTypes from '../../../data/dictionary/adjectivd/AdjectivdActionTypes'
import AdjectivdStore       from '../../../data/dictionary/adjectivd/AdjectivdStore'

describe("AdjectivdTable", function() {

    let state

    let dispatch = action => {
        const n = AdjectivdStore.reduce(state.adjectivd.get('dict'), action)
        state.adjectivd = state.adjectivd.set('dict',n)
    }

    beforeEach(() => {
        state = {}
        state.strings   = initialState.strings
        state.adjectivd = initialState.adjectivd
    })

    it("Renders no AdjectivdTable", function() {
        const renderExpression = <AdjectivdTable {...state} />
        const adjectivdTable = ReactTestUtils.createRenderer().render(renderExpression)

        // Zero AdjectivdTable
        const adjectivdRows = findAllWithType(adjectivdTable, AdjectivdTable)
        expect(adjectivdRows.length).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders an AdjectivdPanelLevel with one item.", function() {
        dispatch({type: AdjectivdActionTypes.INSERT_ADJECTIVD, adjectivd: adjectivdExamples.a})

        const renderExpression = <AdjectivdTable {...state} />
        const adjectivdTable = ReactTestUtils.createRenderer().render(renderExpression)
        expect(adjectivdTable.type).toBe('table')

        // Two columns in the thead
        expect(adjectivdTable.props.children[0].props.children.props.children.length).toBe(2) // base noun, edit

        // One AdjectivdRow
        const adjectivdRows = findAllWithType(adjectivdTable, AdjectivdRow)
        expect(adjectivdRows.length).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders an AdjectivdTable with more than one item.", function() {
        dispatch({type: AdjectivdActionTypes.INSERT_ADJECTIVD, adjectivd: adjectivdExamples.a})
        dispatch({type: AdjectivdActionTypes.INSERT_ADJECTIVD, adjectivd: adjectivdExamples.b})

        const renderExpression = <AdjectivdTable {...state} />
        const adjectivdTable = ReactTestUtils.createRenderer().render(renderExpression)
        expect(adjectivdTable.type).toBe('table')

        // Two columns in the thead
        expect(adjectivdTable.props.children[0].props.children.props.children.length).toBe(2) // base noun, edit

        // Two AdjectivdRow
        const adjectivdRows = findAllWithType(adjectivdTable, AdjectivdRow)
        expect(adjectivdRows.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
