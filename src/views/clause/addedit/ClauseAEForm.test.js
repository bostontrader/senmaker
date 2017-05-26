import React from 'react'

import ReactTestUtils from 'react-dom/test-utils'
import rtRenderer     from 'react-test-renderer'

import ClauseAEForm       from './ClauseAEForm'
import initialState      from '../../../data/StateGetter'
import ClauseAEStore      from '../../../data/clause/addedit/ClauseAEStore'

describe("ClauseAEForm", () => {

    let state

    beforeEach( () => {state = initialState})

    it("add mode", () => {
        state.clause = state.clause.setIn(['addedit','addClause'],true)
        const renderExpression = <ClauseAEForm {...state} />
        const clauseAEForm = ReactTestUtils.createRenderer().render(renderExpression)
        expect(clauseAEForm.type).toBe('div')
        expect(clauseAEForm.props.children.length).toBe(4) // npselect, vpselect, generated text, buttons
        expect(clauseAEForm.props.children[3].props.children.length).toBe(2) // save, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("edit mode", () => {
        state.clause = state.clause.setIn(['addedit','addClause'],false)
        state.clause = state.clause.setIn(['addedit','clause','id'],'1')
        const renderExpression = <ClauseAEForm {...state}/>
        const clauseAEForm = ReactTestUtils.createRenderer().render(renderExpression)
        expect(clauseAEForm.type).toBe('div')
        expect(clauseAEForm.props.children.length).toBe(4) // npselect, vpselect, generated text, buttons
        expect(clauseAEForm.props.children[3].props.children.length).toBe(3) // save, delete, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
