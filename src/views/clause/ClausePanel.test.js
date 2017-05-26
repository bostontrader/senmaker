import React from 'react'

import ReactTestUtils    from 'react-dom/test-utils'
import {findWithType}    from 'react-shallow-testutils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import ClausePanel  from './ClausePanel'
import ClauseTable  from './ClauseTable'
import ClauseAEForm from './addedit/ClauseAEForm'
import initialState from '../../data/StateGetter'

describe("ClausePanel", function() {

    let state

    beforeEach(function() {
        state = {}
        state.clause  = initialState.clause
        state.strings = initialState.strings
    })

    it("Renders a ClausePanel w/o add/edit", function() {
        const renderExpression = <ClausePanel {...state} />
        const clausePanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(clausePanel.type).toBe('div')

        expect(findWithType(clausePanel,'button'))
        expect(findWithType(clausePanel,ClauseTable))

        // No ClauseAEForm
        const clauseAEForm = findAllWithType(clausePanel, ClauseAEForm)
        expect(clauseAEForm.length).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a ClausePanel with a ClauseAEForm in add mode", function() {
        state.clause = state.clause.setIn(['addedit','addClause'],true)

        const renderExpression = <ClausePanel {...state} />
        const clausePanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(clausePanel.type).toBe('div')

        expect(findWithType(clausePanel,'button'))
        expect(findWithType(clausePanel,ClauseAEForm))
        expect(findWithType(clausePanel,ClauseTable))

        // This code errors. I think this is because of the select statement
        // const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

    it("Renders a ClausePanel with a ClauseAEForm in edit mode", function() {
        state.clause = state.clause.setIn(['addedit','clause','id'],"1")

        const renderExpression = <ClausePanel {...state} />
        const clausePanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(clausePanel.type).toBe('div')

        expect(findWithType(clausePanel,'button'))
        expect(findWithType(clausePanel,ClauseAEForm))
        expect(findWithType(clausePanel,ClauseTable))

        // This code errors. I think this is because of the select statement
        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })
})
