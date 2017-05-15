import React from 'react'

import ReactTestUtils    from 'react-dom/test-utils'
import rtRenderer        from 'react-test-renderer'
import {findWithType}    from 'react-shallow-testutils'
import {findAllWithType} from 'react-shallow-testutils'

import NPAEForm     from './addedit/NPAEForm'
import NPPanel      from './NPPanel'
import NPTable      from './NPTable'
import initialState from '../../data/StateGetter'

describe("NPPanel", function() {

    let state

    beforeEach(function() {
        state = {}
        state.adjectivd = initialState.adjectivd
        state.nound     = initialState.nound
        state.np        = initialState.np
        state.strings   = initialState.strings
    })

    it("Renders a NPPanel w/o add/edit", function() {
        const renderExpression = <NPPanel {...state} />
        const npPanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(npPanel.type).toBe('div')

        expect(findWithType(npPanel,'button'))
        expect(findWithType(npPanel,NPTable))

        // No NPAEForm
        const npAEForm = findAllWithType(npPanel, NPAEForm)
        expect(npAEForm.length).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a NPPanel with a NPAEForm in add mode", function() {
        state.np = state.np.setIn(['addedit','addNP'],true)

        const renderExpression = <NPPanel {...state} />
        const npPanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(npPanel.type).toBe('div')

        expect(findWithType(npPanel,'button'))
        expect(findWithType(npPanel,NPAEForm))
        expect(findWithType(npPanel,NPTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a NPPanel with a NPAEForm in edit mode", function() {
        state.np = state.np.setIn(['addedit','np','id'],"1")

        const renderExpression = <NPPanel {...state} />
        const npPanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(npPanel.type).toBe('div')

        expect(findWithType(npPanel,'button'))
        expect(findWithType(npPanel,NPAEForm))
        expect(findWithType(npPanel,NPTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
