import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import ClauseRow   from './ClauseRow'
import ClauseTable from './ClauseTable'

import {clauseExamples}  from '../../data/TestData'
import AppStore          from '../../data/app/AppStore'
import ClauseActionTypes from '../../data/clause/ClauseActionTypes'
import ClauseStore       from '../../data/clause/ClauseStore'
import StringStore       from '../../data/strings/StringStore'

describe("ClauseTable", function() {

    beforeEach(function() {
        this.state = {}
        this.state.app     = AppStore.getInitialState()
        this.state.strings = StringStore.getInitialState()

        // ClauseStore.getInitialState w/o any pre-loaded examples.
        this.state.clause = Map({
            dict: Map({nextid:1, coll:Map()})
        })

        this.dispatch = action => {
            this.state.app   = AppStore .reduce(this.state.app, action)
            const n = ClauseStore.reduce(this.state.clause.get('dict'), action)
            this.state.clause = this.state.clause.set('dict',n)
        }

    })

    it("Renders a ClauseTable", function() {
        const renderExpression = <ClauseTable {...this.state} />
        const clauseTable = TestUtils.createRenderer().render(renderExpression)
        expect(clauseTable.type).toBe('table')

        // Two columns in the thead
        expect(clauseTable.props.children[0].props.children.props.children.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Will render one ClauseRow", function() {
        this.dispatch({type: ClauseActionTypes.INSERT_CLAUSE, clause: clauseExamples.a})
        const renderExpression = <ClauseTable {...this.state} />
        const clauseTable = TestUtils.createRenderer().render(renderExpression)
        const clauseItems = findAllWithType(clauseTable, ClauseRow)
        expect(clauseItems.length).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Will render two ClauseRow", function() {
        this.dispatch({type: ClauseActionTypes.INSERT_CLAUSE, clause: clauseExamples.a})
        this.dispatch({type: ClauseActionTypes.INSERT_CLAUSE, clause: clauseExamples.b})

        const renderExpression = <ClauseTable {...this.state} />
        const clauseTable = TestUtils.createRenderer().render(renderExpression)
        const clauseItems = findAllWithType(clauseTable, ClauseRow)
        expect(clauseItems.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
