import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'
import {findWithType}    from 'react-shallow-testutils'
import {findAllWithType} from 'react-shallow-testutils'

import NPAEForm     from './addedit/NPAEForm'
import NPPanel      from './NPPanel'
import NPTable      from './NPTable'
import NoundStore   from '../../data/dictionary/nound/NoundStore'
import NoundAEStore from '../../data/dictionary/nound/addedit/NoundAEStore'
import NPStore      from '../../data/np/NPStore'
import NPAEStore    from '../../data/np/addedit/NPAEStore'
import StringStore  from '../../data/strings/StringStore'

describe("NPPanel", function() {

    beforeEach(function() {
        this.props = {
            nound: Map({
                addedit: NoundAEStore.getInitialState(),
                dict: NoundStore.getInitialState()
            }),
            np: Map({
                addedit: NPAEStore.getInitialState(),
                dict: NPStore.getInitialState()
            }),
            strings:StringStore.getInitialState()
        }
    })

    it("Renders a NPPanel w/o add/edit", function() {
        const renderExpression = <NPPanel {...this.props} />
        const npPanel = TestUtils.createRenderer().render(renderExpression)
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
        this.props.np = this.props.np.setIn(['addedit','addNP'],true)

        const renderExpression = <NPPanel {...this.props} />
        const npPanel = TestUtils.createRenderer().render(renderExpression)
        expect(npPanel.type).toBe('div')

        expect(findWithType(npPanel,'button'))
        expect(findWithType(npPanel,NPAEForm))
        expect(findWithType(npPanel,NPTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a NPPanel with a NPAEForm in edit mode", function() {
        this.props.np = this.props.np.setIn(['addedit','np','id'],"1")

        const renderExpression = <NPPanel {...this.props} />
        const npPanel = TestUtils.createRenderer().render(renderExpression)
        expect(npPanel.type).toBe('div')

        expect(findWithType(npPanel,'button'))
        expect(findWithType(npPanel,NPAEForm))
        expect(findWithType(npPanel,NPTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
