import React from 'react'

import ReactTestUtils    from 'react-dom/test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'
import initialState      from '../../../data/StateGetter'

const testFunction = (Table, Row, Store, wordType, insertType, examples) => {

    const ucWordType = wordType.charAt(0).toUpperCase() + wordType.slice(1)
    const tableName  = ucWordType + 'Table'
    const article = ('aeiou'.indexOf(wordType.charAt(0))) ? 'a' : 'an'
    
    let state

    let dispatch = action => {
        const n = Store.reduce(state[wordType].get('dict'), action)
        state[wordType] = state[wordType].set('dict',n)
    }

    beforeEach(() => {
        state = {}
        state[wordType] = initialState[wordType]
        state.strings   = initialState.strings
    })

    it('Renders no ' + tableName, function() {
        const renderExpression = <Table {...state} />
        const wordTable = ReactTestUtils.createRenderer().render(renderExpression)
    
        // Zero Table
        const wordRows = findAllWithType(wordTable, Table)
        expect(wordRows.length).toBe(0)
    
        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('Renders ' + article + ' ' + tableName + ' with one item.', function() {
        dispatch({type: insertType, [wordType]: examples.a})

        const renderExpression = <Table {...state} />
        const wordTable = ReactTestUtils.createRenderer().render(renderExpression)
        expect(wordTable.type).toBe('table')

        // Two columns in the thead
        expect(wordTable.props.children[0].props.children.props.children.length).toBe(2) // base, edit
    
        // One Row
        const wordRows = findAllWithType(wordTable, Row)
        expect(wordRows.length).toBe(1)
    
        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('Renders ' + article + ' ' + tableName + ' with more than one item.', function() {
        dispatch({type: insertType, [wordType]: examples.a})
        dispatch({type: insertType, [wordType]: examples.b})

        const renderExpression = <Table {...state} />
        const wordTable = ReactTestUtils.createRenderer().render(renderExpression)
        expect(wordTable.type).toBe('table')
        
        // Two columns in the thead
        expect(wordTable.props.children[0].props.children.props.children.length).toBe(2) // base noun, edit
        
        // Two Row
        const wordRows = findAllWithType(wordTable, Row)
        expect(wordRows.length).toBe(2)
        
        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

}

export {testFunction}
