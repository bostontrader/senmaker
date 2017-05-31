import React from 'react'

import ReactTestUtils from 'react-dom/test-utils'
import rtRenderer     from 'react-test-renderer'

import initialState from '../../../../data/StateGetter'

const testFunction = (AEForm, wordType) => {

    const key = 'add' + wordType.charAt(0).toUpperCase() + wordType.slice(1)

    let state
        
    beforeEach( () => {state = initialState})

    it("add mode", () => {
        state[wordType] = state[wordType].setIn(['addedit',key],true)
        const renderExpression = <AEForm {...state} />

        const aeForm = ReactTestUtils.createRenderer().render(renderExpression)
        expect(aeForm.type).toBe('div')
        expect(aeForm.props.children.length).toBe(2) // base controls, buttons
        expect(aeForm.props.children[1].props.children.length).toBe(2) // save, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("edit mode", () => {
        state[wordType] = state[wordType].setIn(['addedit',key],false)
        state[wordType] = state[wordType].setIn(['addedit',wordType,'id'],'1')
        const renderExpression = <AEForm {...state}/>
        const aeForm = ReactTestUtils.createRenderer().render(renderExpression)
        expect(aeForm.type).toBe('div')
        expect(aeForm.props.children.length).toBe(2) // base controls, buttons
        expect(aeForm.props.children[1].props.children.length).toBe(3) // save, delete, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

}

export {testFunction}
