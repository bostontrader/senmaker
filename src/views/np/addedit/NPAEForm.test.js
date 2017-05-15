import {Map} from 'immutable'
import React from 'react'

import ReactTestUtils  from 'react-dom/test-utils'
import rtRenderer from 'react-test-renderer'

import NPAEForm         from './NPAEForm'
import initialState     from '../../../data/StateGetter'
import {NPPanelLevel}   from '../../../data/np/NPConstants'
import AdjectivdStore   from '../../../data/dictionary/adjectivd/AdjectivdStore'
import AdjectivdAEStore from '../../../data/dictionary/adjectivd/addedit/AdjectivdAEStore'
import NoundStore       from '../../../data/dictionary/nound/NoundStore'
import NoundAEStore     from '../../../data/dictionary/nound/addedit/NoundAEStore'
import NPAEStore        from '../../../data/np/addedit/NPAEStore'
import StringStore      from '../../../data/strings/StringStore'

describe("NPAEForm", () => {

    let state

    beforeEach( () => {state = initialState})

    describe("NPPanelLevel.L1", () => {

        it("add mode", () => {
            state.np = state.np.setIn(['addedit','addNP'],true)
            const renderExpression = <NPAEForm npPanelLevel = {NPPanelLevel.L1} {...state} />
            const npAEForm = ReactTestUtils.createRenderer().render(renderExpression)
            expect(npAEForm.type).toBe('div')
            expect(npAEForm.props.children.length).toBe(3) // nound select, radio group, generatedText
            // No buttons on this level
            //expect(npAEForm.props.children[1].props.children.length).toBe(2) // save, cancel

            // The Select control fubars this
            //const tree = rtRenderer.create(renderExpression).toJSON()
            //expect(tree).toMatchSnapshot()
        })

        // We don't presently use NPAEForm at level L1 in edit mode, so don't bother testing it.
    })

    describe("NPPanelLevel.L2", () => {

        it("add mode", () => {
            state.np = state.np.setIn(['addedit','addNP'],true)
            const renderExpression = <NPAEForm npPanelLevel = {NPPanelLevel.L2} {...state} />
            const npAEForm = ReactTestUtils.createRenderer().render(renderExpression)
            expect(npAEForm.type).toBe('div')
            expect(npAEForm.props.children.length).toBe(4) // nound select, radio group, generatedText, theButtons
            expect(npAEForm.props.children[3].props.children.length).toBe(2) // save, cancel

            // The Select control fubars this
            //const tree = rtRenderer.create(renderExpression).toJSON()
            //expect(tree).toMatchSnapshot()
        })

        it("edit mode", () => {
            state.np = state.np.setIn(['addedit','addNP'],false)
            state.np = state.np.setIn(['addedit','np','id'],'1')
            const renderExpression = <NPAEForm npPanelLevel = {NPPanelLevel.L2} {...state} />
            const npAEForm = ReactTestUtils.createRenderer().render(renderExpression)
            expect(npAEForm.type).toBe('div')
            expect(npAEForm.props.children.length).toBe(4) // nound select, radio group, generatedText, theButtons
            expect(npAEForm.props.children[3].props.children.length).toBe(3) // save, delete, cancel

            // The Select control fubars this
            //const tree = rtRenderer.create(renderExpression).toJSON()
            //expect(tree).toMatchSnapshot()
        })

    })

    describe("NPPanelLevel.ADJECTIVES", () => {

        it("add mode", () => {
            state.np = state.np.setIn(['addedit','addNP'],true)
            const renderExpression = <NPAEForm npPanelLevel = {NPPanelLevel.ADJECTIVES} {...state} />
            const npAEForm = ReactTestUtils.createRenderer().render(renderExpression)
            expect(npAEForm.type).toBe('div')
            expect(npAEForm.props.children.length).toBe(5) // nound select, radio group, adjectivd select, generatedText, theButtons
            expect(npAEForm.props.children[4].props.children.length).toBe(2) // save, cancel

            // The Select control fubars this
            //const tree = rtRenderer.create(renderExpression).toJSON()
            //expect(tree).toMatchSnapshot()
        })

        it("edit mode", () => {
            state.np = state.np.setIn(['addedit','addNP'],false)
            state.np = state.np.setIn(['addedit','np','id'],'1')
            const renderExpression = <NPAEForm npPanelLevel = {NPPanelLevel.ADJECTIVES} {...state} />
            const npAEForm = ReactTestUtils.createRenderer().render(renderExpression)
            expect(npAEForm.type).toBe('div')
            expect(npAEForm.props.children.length).toBe(5) // nound select, radio group, adjectivd select, generatedText, theButtons
            expect(npAEForm.props.children[4].props.children.length).toBe(3) // save, delete, cancel

            // The Select control fubars this
            //const tree = rtRenderer.create(renderExpression).toJSON()
            //expect(tree).toMatchSnapshot()
        })

    })
})
