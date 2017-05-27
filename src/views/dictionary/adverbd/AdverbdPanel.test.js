import React from 'react'

import ReactTestUtils    from 'react-dom/test-utils'
import rtRenderer        from 'react-test-renderer'
import {findWithType}    from 'react-shallow-testutils'
import {findAllWithType} from 'react-shallow-testutils'

import AdverbdAEForm from './addedit/AdverbdAEForm'
import AdverbdPanel  from './AdverbdPanel'
import AdverbdTable  from './AdverbdTable'
import initialState  from '../../../data/StateGetter'

describe("AdverbdPanel", function() {

    let state

    beforeEach(function() {
        state = {}
        state.adverbd   = initialState.adverbd
        state.strings = initialState.strings
    })

    it("Renders a AdverbdPanel w/o add/edit", function() {
        const renderExpression = <AdverbdPanel {...state} />
        const adverbdPanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(adverbdPanel.type).toBe('div')

        expect(findWithType(adverbdPanel,'button'))
        expect(findWithType(adverbdPanel,AdverbdTable))

        // No AdverbdAEForm
        const adverbdAEForm = findAllWithType(adverbdPanel, AdverbdAEForm)
        expect(adverbdAEForm.length).toBe(0)
        
        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a AdverbdPanel with an AdverbdAEForm in add mode", function() {
        state.adverbd = state.adverbd.setIn(['addedit','addAdverbd'],true)

        const renderExpression = <AdverbdPanel {...state} />
        const adverbdPanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(adverbdPanel.type).toBe('div')

        expect(findWithType(adverbdPanel,'button'))
        expect(findWithType(adverbdPanel,AdverbdAEForm))
        expect(findWithType(adverbdPanel,AdverbdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a AdverbdPanel with an AdverbdAEForm in edit mode", function() {
        state.adverbd = state.adverbd.setIn(['addedit','adverbd','id'],"1")

        const renderExpression = <AdverbdPanel {...state} />
        const adverbdPanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(adverbdPanel.type).toBe('div')

        expect(findWithType(adverbdPanel,'button'))
        expect(findWithType(adverbdPanel,AdverbdAEForm))
        expect(findWithType(adverbdPanel,AdverbdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
