import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import VPRow   from './VPRow'
import VPTable from './VPTable'

import {vpExamples}         from '../../data/TestData'
import VPActionTypes        from '../../data/vp/VPActionTypes'
import VPStore              from '../../data/vp/VPStore'
import StringStore          from '../../data/strings/StringStore'

describe("VPTable", function() {

    beforeEach(function() {
        this.state = {}
        this.state.strings = StringStore.getInitialState()
        this.state.vp = Map({
            dict:VPStore.getInitialState()
        })

        this.dispatch = action => {
            const n = VPStore.reduce(this.state.vp.get('dict'), action)
            this.state.vp = this.state.vp.set('dict',n)
        }

    })

    it("An empty VPTable sb null", function() {
        const renderExpression = <VPTable {...this.state} />
        const vpTable = TestUtils.createRenderer().render(renderExpression)
        expect(vpTable).toBe(null)
    })

    it("A VPTable with one VPRow", function() {
        this.dispatch({type: VPActionTypes.INSERT_VP, vp: vpExamples.a})
        
        const renderExpression = <VPTable {...this.state} />
        const vpTable = TestUtils.createRenderer().render(renderExpression)
        expect(vpTable.type).toBe('table')

        // Two columns in the thead
        expect(vpTable.props.children[0].props.children.props.children.length).toBe(2) // verb phrase, edit

        // One VPRow
        const vpRows = findAllWithType(vpTable, VPRow)
        expect(vpRows.length).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("A VPTable with more than one VPRow", function() {
        console.log(this.state.vp)
        this.dispatch({type: VPActionTypes.INSERT_VP, vp: vpExamples.a})
        this.dispatch({type: VPActionTypes.INSERT_VP, vp: vpExamples.b})

        const renderExpression = <VPTable {...this.state} />
        const vpTable = TestUtils.createRenderer().render(renderExpression)
        expect(vpTable.type).toBe('table')

        // Two columns in the thead
        expect(vpTable.props.children[0].props.children.props.children.length).toBe(2) // verb phrase, edit

        // Two VPRow
        const vpRows = findAllWithType(vpTable, VPRow)
        expect(vpRows.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
