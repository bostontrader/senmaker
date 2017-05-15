import {Map} from 'immutable'
import React from 'react'

import ReactTestUtils from 'react-dom/test-utils'
import rtRenderer     from 'react-test-renderer'

import NoundAEForm       from './NoundAEForm'
import initialState      from '../../../../data/StateGetter'
import {NoundPanelLevel} from '../../../../data/dictionary/nound/NoundConstants'
import NoundAEStore      from '../../../../data/dictionary/nound/addedit/NoundAEStore'
import StringStore       from '../../../../data/strings/StringStore'

describe("NoundAEForm", () => {

    let state

    beforeEach( () => {state = initialState})

    /*beforeEach( () => {
        state = {
            nound: Map({
                addedit: NoundAEStore.getInitialState()
            }),
            strings:StringStore.getInitialState()
        }
    })*/

    describe("NoundPanelLevel.BASE", () => {

        it("add mode", () => {
            state.nound = state.nound.setIn(['addedit','addNound'],true)
            const renderExpression = <NoundAEForm noundPanelLevel = {NoundPanelLevel.BASE} {...state} />
            const noundAEForm = ReactTestUtils.createRenderer().render(renderExpression)
            expect(noundAEForm.type).toBe('div')
            expect(noundAEForm.props.children.length).toBe(2) // base controls, buttons
            expect(noundAEForm.props.children[1].props.children.length).toBe(2) // save, cancel

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it("edit mode", () => {
            state.nound = state.nound.setIn(['addedit','addNound'],false)
            state.nound = state.nound.setIn(['addedit','nound','id'],'1')
            const renderExpression = <NoundAEForm noundPanelLevel = {NoundPanelLevel.BASE} {...state}/>
            const noundAEForm = ReactTestUtils.createRenderer().render(renderExpression)
            expect(noundAEForm.type).toBe('div')
            expect(noundAEForm.props.children.length).toBe(2) // base controls, buttons
            expect(noundAEForm.props.children[1].props.children.length).toBe(3) // save, delete, cancel

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

    })

    describe("NoundPanelLevel.PLURALIZATION", () => {

        it("add mode", () => {
            state.nound = state.nound.setIn(['addedit','addNound'],true)
            const renderExpression = <NoundAEForm noundPanelLevel = {NoundPanelLevel.PLURALIZATION} {...state} />
            const noundAEForm = ReactTestUtils.createRenderer().render(renderExpression)
            expect(noundAEForm.type).toBe('div')
            expect(noundAEForm.props.children.length).toBe(5) // base controls, plural, input, pluraliation_rule_select, buttons
            expect(noundAEForm.props.children[4].props.children.length).toBe(2) // save, cancel

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })

        it("edit mode", () => {
            state.nound = state.nound.setIn(['addedit','addNound'],false)
            state.nound = state.nound.setIn(['addedit','nound','id'],'1')
            const renderExpression = <NoundAEForm noundPanelLevel = {NoundPanelLevel.PLURALIZATION} {...state}/>
            const noundAEForm = ReactTestUtils.createRenderer().render(renderExpression)
            expect(noundAEForm.type).toBe('div')
            expect(noundAEForm.props.children.length).toBe(5) // base controls, plural, input, pluraliation_rule_select, buttons
            expect(noundAEForm.props.children[4].props.children.length).toBe(3) // save, delete, cancel

            const tree = rtRenderer.create(renderExpression).toJSON()
            expect(tree).toMatchSnapshot()
        })
    })

})
