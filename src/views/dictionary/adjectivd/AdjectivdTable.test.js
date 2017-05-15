import {Map} from 'immutable'
import React from 'react'

import ReactTestUtils         from 'react-dom/test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import AdjectivdRow   from './AdjectivdRow'
import AdjectivdTable from './AdjectivdTable'

import {adjectivdExamples}  from '../../../data/TestData'
import AppStore             from '../../../data/app/AppStore'
import AdjectivdActionTypes from '../../../data/dictionary/adjectivd/AdjectivdActionTypes'
import AdjectivdStore       from '../../../data/dictionary/adjectivd/AdjectivdStore'
import StringStore          from '../../../data/strings/StringStore'

describe("AdjectivdTable", function() {

    /*beforeEach(function() {
        this.state = {}
        this.state.app     = AppStore.getInitialState()
        this.state.strings = StringStore.getInitialState()
        this.state.adjectivd = Map({
            dict:AdjectivdStore.getInitialState()
        })

        this.dispatch = action => {
            this.state.app   = AppStore .reduce(this.state.app, action)
            const n = AdjectivdStore.reduce(this.state.adjectivd.get('dict'), action)
            this.state.adjectivd = this.state.adjectivd.set('dict',n)
        }
    })*/

    it("Renders no AdjectivdTable", function() {
        //const renderExpression = <AdjectivdTable {...this.state} />
        //const adjectivdTable = ReactTestUtils.createRenderer().render(renderExpression)

        // Zero AdjectivdTable
        //const adjectivdRows = findAllWithType(adjectivdTable, AdjectivdTable)
        //expect(adjectivdRows.length).toBe(0)

        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

    /*it("Renders an AdjectivdPanelLevel with one item.", function() {
        this.dispatch({type: AdjectivdActionTypes.INSERT_ADJECTIVD, adjectivd: adjectivdExamples.a})

        const renderExpression = <AdjectivdTable {...this.state} />
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
        this.dispatch({type: AdjectivdActionTypes.INSERT_ADJECTIVD, adjectivd: adjectivdExamples.a})
        this.dispatch({type: AdjectivdActionTypes.INSERT_ADJECTIVD, adjectivd: adjectivdExamples.b})

        const renderExpression = <AdjectivdTable {...this.state} />
        const adjectivdTable = ReactTestUtils.createRenderer().render(renderExpression)
        expect(adjectivdTable.type).toBe('table')

        // Two columns in the thead
        expect(adjectivdTable.props.children[0].props.children.props.children.length).toBe(2) // base noun, edit

        // Two AdjectivdRow
        const adjectivdRows = findAllWithType(adjectivdTable, AdjectivdRow)
        expect(adjectivdRows.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })*/


})
