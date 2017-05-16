import React from 'react'

import ReactTestUtils    from 'react-dom/test-utils'
import rtRenderer        from 'react-test-renderer'
import {findWithType}    from 'react-shallow-testutils'
import {findAllWithType} from 'react-shallow-testutils'

import AdjectivdAEForm  from './addedit/AdjectivdAEForm'
import AdjectivdPanel    from './AdjectivdPanel'
import AdjectivdTable    from './AdjectivdTable'
import initialState from '../../../data/StateGetter'

describe("AdjectivdPanel", function() {

    let state

    beforeEach(function() {
        state = {}
        state.adjectivd   = initialState.adjectivd
        state.strings = initialState.strings
    })

    it("Renders a AdjectivdPanel w/o add/edit", function() {
        const renderExpression = <AdjectivdPanel {...state} />
        const adjectivdPanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(adjectivdPanel.type).toBe('div')

        expect(findWithType(adjectivdPanel,'button'))
        expect(findWithType(adjectivdPanel,AdjectivdTable))

        // No AdjectivdAEForm
        const adjectivdAEForm = findAllWithType(adjectivdPanel, AdjectivdAEForm)
        expect(adjectivdAEForm.length).toBe(0)
        
        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a AdjectivdPanel with an AdjectivdAEForm in add mode", function() {
        state.adjectivd = state.adjectivd.setIn(['addedit','addAdjectivd'],true)

        const renderExpression = <AdjectivdPanel {...state} />
        const adjectivdPanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(adjectivdPanel.type).toBe('div')

        expect(findWithType(adjectivdPanel,'button'))
        expect(findWithType(adjectivdPanel,AdjectivdAEForm))
        expect(findWithType(adjectivdPanel,AdjectivdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a AdjectivdPanel with an AdjectivdAEForm in edit mode", function() {
        state.adjectivd = state.adjectivd.setIn(['addedit','adjectivd','id'],"1")

        const renderExpression = <AdjectivdPanel {...state} />
        const adjectivdPanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(adjectivdPanel.type).toBe('div')

        expect(findWithType(adjectivdPanel,'button'))
        expect(findWithType(adjectivdPanel,AdjectivdAEForm))
        expect(findWithType(adjectivdPanel,AdjectivdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
