import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import VPRow   from './VPRow'
import VPTable from './VPTable'

import {vpExamples}         from '../../data/TestData'
import AppStore             from '../../data/app/AppStore'
import {PluralizationRule}  from '../../data/dictionary/nound/NoundConstants'
import VP                   from '../../data/vp/VP'
import VPActionTypes        from '../../data/vp/VPActionTypes'
import {DefinitenessSelect} from '../../data/vp/VPConstants'
import VPStore              from '../../data/vp/VPStore'
import StringStore          from '../../data/strings/StringStore'

describe("VPTable", function() {

    beforeEach(function() {
        this.state = {}
        this.state.app     = AppStore.getInitialState()
        this.state.strings = StringStore.getInitialState()
        this.state.vp = Map({
            dict:VPStore.getInitialState()
        })

        this.dispatch = action => {
            this.state.app   = AppStore .reduce(this.state.app, action)
            const n = VPStore.reduce(this.state.vp.get('dict'), action)
            this.state.vp = this.state.vp.set('dict',n)
        }

    })

    it("Renders a VPTable", function() {
        const renderExpression = <VPTable {...this.state} />
        const vpTable = TestUtils.createRenderer().render(renderExpression)
        expect(vpTable.type).toBe('table')

        // Two columns in the thead
        expect(vpTable.props.children[0].props.children.props.children.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Will render one VPRow", function() {
        this.dispatch({type: VPActionTypes.INSERT_VP, vp: vpExamples.a})
        
        const renderExpression = <VPTable {...this.state} />
        const vpTable = TestUtils.createRenderer().render(renderExpression)
        const nounItems = findAllWithType(vpTable, VPRow)
        expect(nounItems.length).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Will render two VPRow", function() {
        this.dispatch({type: VPActionTypes.INSERT_VP, vp: vpExamples.a})
        this.dispatch({type: VPActionTypes.INSERT_VP, vp: vpExamples.b})

        const renderExpression = <VPTable {...this.state} />
        const vpTable = TestUtils.createRenderer().render(renderExpression)
        const nounItems = findAllWithType(vpTable, VPRow)
        expect(nounItems.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
