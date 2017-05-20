import React from 'react'

import ReactTestUtils    from 'react-dom/test-utils'
import {findWithType}    from 'react-shallow-testutils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import VerbdPanel   from './VerbdPanel'
import VerbdTable   from './VerbdTable'
import VerbdAEForm  from './addedit/VerbdAEForm'
import initialState from '../../../data/StateGetter'

describe("VerbdPanel", function() {

    let state

    beforeEach(function() {
        state = {}
        state.verbd   = initialState.verbd
        state.strings = initialState.strings
    })

    it("Renders a VerbdPanel w/o add/edit", function() {
        const renderExpression = <VerbdPanel {...state} />
        const verbdPanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(verbdPanel.type).toBe('div')

        expect(findWithType(verbdPanel,'button'))
        expect(findWithType(verbdPanel,VerbdTable))

        // No VerbdAEForm
        const verbdAEForm = findAllWithType(verbdPanel, VerbdAEForm)
        expect(verbdAEForm.length).toBe(0)
        
        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a VerbdPanel with a VerbdAEForm in add mode", function() {
        state.verbd = state.verbd.setIn(['addedit','addVerbd'],true)

        const renderExpression = <VerbdPanel {...state} />
        const verbdPanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(verbdPanel.type).toBe('div')

        expect(findWithType(verbdPanel,'button'))
        expect(findWithType(verbdPanel,VerbdAEForm))
        expect(findWithType(verbdPanel,VerbdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a VerbdPanel with a VerbdAEForm in edit mode", function() {
        state.verbd = state.verbd.setIn(['addedit','verbd','id'],"1")

        const renderExpression = <VerbdPanel {...state} />
        const verbdPanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(verbdPanel.type).toBe('div')

        expect(findWithType(verbdPanel,'button'))
        expect(findWithType(verbdPanel,VerbdAEForm))
        expect(findWithType(verbdPanel,VerbdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
