import {Map} from 'immutable'
import React from 'react'

import ReactTestUtils from 'react-dom/test-utils'
import rtRenderer     from 'react-test-renderer'

import AdverbdAEForm  from './AdverbdAEForm'
import initialState   from '../../../../data/StateGetter'
import AdverbdAEStore from '../../../../data/dictionary/adverbd/addedit/AdverbdAEStore'
import StringStore    from '../../../../data/strings/StringStore'

describe("AdverbdEditForm", () => {

    let state

    beforeEach( () => {state = initialState})

    it("Renders an AdverbdAEForm, add mode", () => {
        state.adverbd = state.adverbd.setIn(['addedit','addAdverbd'],true)
        const renderExpression = <AdverbdAEForm {...state} />
        const adverbdAEForm = ReactTestUtils.createRenderer().render(renderExpression)
        expect(adverbdAEForm.type).toBe('div')
        expect(adverbdAEForm.props.children.length).toBe(2) // base controls, buttons
        expect(adverbdAEForm.props.children[1].props.children.length).toBe(2) // save, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders an AdverbdAEForm, edit mode", () => {
        state.adverbd = state.adverbd.setIn(['addedit','addAdverbd'],false)
        state.adverbd = state.adverbd.setIn(['addedit','adverbd','id'],'1')
        const renderExpression = <AdverbdAEForm {...state}/>
        const adverbdAEForm = ReactTestUtils.createRenderer().render(renderExpression)
        expect(adverbdAEForm.type).toBe('div')
        expect(adverbdAEForm.props.children.length).toBe(2) // base controls, buttons
        expect(adverbdAEForm.props.children[1].props.children.length).toBe(3) // save, delete, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
