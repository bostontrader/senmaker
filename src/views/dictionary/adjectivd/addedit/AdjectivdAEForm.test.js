import {Map} from 'immutable'
import React from 'react'

import ReactTestUtils from 'react-dom/test-utils'
import rtRenderer     from 'react-test-renderer'

import AdjectivdAEForm  from './AdjectivdAEForm'
import initialState     from '../../../../data/StateGetter'
import AdjectivdAEStore from '../../../../data/dictionary/adjectivd/addedit/AdjectivdAEStore'
import StringStore      from '../../../../data/strings/StringStore'

describe("AdjectivdEditForm", () => {

    let state

    beforeEach( () => {state = initialState})

    it("Renders an AdjectivdAEForm, add mode", () => {
        state.adjectivd = state.adjectivd.setIn(['addedit','addAdjectivd'],true)
        const renderExpression = <AdjectivdAEForm {...state} />
        const adjectivdAEForm = ReactTestUtils.createRenderer().render(renderExpression)
        expect(adjectivdAEForm.type).toBe('div')
        expect(adjectivdAEForm.props.children.length).toBe(2) // base controls, buttons
        expect(adjectivdAEForm.props.children[1].props.children.length).toBe(2) // save, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders an AdjectivdAEForm, edit mode", () => {
        state.adjectivd = state.adjectivd.setIn(['addedit','addAdjectivd'],false)
        state.adjectivd = state.adjectivd.setIn(['addedit','adjectivd','id'],'1')
        const renderExpression = <AdjectivdAEForm {...state}/>
        const adjectivdAEForm = ReactTestUtils.createRenderer().render(renderExpression)
        expect(adjectivdAEForm.type).toBe('div')
        expect(adjectivdAEForm.props.children.length).toBe(2) // base controls, buttons
        expect(adjectivdAEForm.props.children[1].props.children.length).toBe(3) // save, delete, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
