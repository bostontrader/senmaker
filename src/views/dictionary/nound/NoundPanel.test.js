import React from 'react'

import ReactTestUtils    from 'react-dom/test-utils'
import {findWithType}    from 'react-shallow-testutils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import NoundPanel   from './NoundPanel'
import NoundTable   from './NoundTable'
import NoundAEForm  from './addedit/NoundAEForm'
import initialState from '../../../data/StateGetter'

describe("NoundPanel", function() {

    let state

    beforeEach(function() {
        state = {}
        state.nound   = initialState.nound
        state.strings = initialState.strings
    })

    it("Renders a NoundPanel w/o add/edit", function() {
        const renderExpression = <NoundPanel {...state} />
        const noundPanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(noundPanel.type).toBe('div')

        expect(findWithType(noundPanel,'button'))
        expect(findWithType(noundPanel,NoundTable))

        // No NoundAEForm
        const noundAEForm = findAllWithType(noundPanel, NoundAEForm)
        expect(noundAEForm.length).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a NoundPanel with a NoundAEForm in add mode", function() {
        state.nound = state.nound.setIn(['addedit','addNound'],true)

        const renderExpression = <NoundPanel {...state} />
        const noundPanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(noundPanel.type).toBe('div')

        expect(findWithType(noundPanel,'button'))
        expect(findWithType(noundPanel,NoundAEForm))
        expect(findWithType(noundPanel,NoundTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a NoundPanel with a NoundAEForm in edit mode", function() {
        state.nound = state.nound.setIn(['addedit','nound','id'],"1")

        const renderExpression = <NoundPanel {...state} />
        const noundPanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(noundPanel.type).toBe('div')

        expect(findWithType(noundPanel,'button'))
        expect(findWithType(noundPanel,NoundAEForm))
        expect(findWithType(noundPanel,NoundTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
