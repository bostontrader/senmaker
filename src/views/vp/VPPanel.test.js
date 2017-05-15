import {Map} from 'immutable'
import React from 'react'

import ReactTestUtils      from 'react-dom/test-utils'
import rtRenderer     from 'react-test-renderer'
import {findWithType} from 'react-shallow-testutils'
import {findAllWithType} from 'react-shallow-testutils'

import VPPanel      from './VPPanel'
import VPTable      from './VPTable'
import VPAEForm    from './addedit/VPAEForm'
import VerbdStore   from '../../data/dictionary/verbd/VerbdStore'
import StringStore  from '../../data/strings/StringStore'
import VPStore      from '../../data/vp/VPStore'

describe("VPPanel", function() {

    /*beforeEach(function() {
        this.props = {
            verbd: Map({
                dict: VerbdStore.getInitialState()
            }),
            vp: Map({
                dict: VPStore.getInitialState()
            }),
            strings:StringStore.getInitialState()
        }
    })*/

    it("Renders a VPPanel w/o add/edit", function() {
        //const renderExpression = <VPPanel {...this.props} />
        //const vpPanel = ReactTestUtils.createRenderer().render(renderExpression)
        //expect(vpPanel.type).toBe('div')

        //expect(findWithType(vpPanel,'button'))
        //expect(findWithType(vpPanel,VPTable))

        // No VPAEForm
        //const vpAEForm = findAllWithType(vpPanel, VPAEForm)
        //expect(vpAEForm.length).toBe(0)

        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

    /*it("Renders a VPPanel with a VPAEForm in add mode", function() {
        this.props.vp = this.props.vp.setIn(['addedit','addVP'],true)

        const renderExpression = <VPPanel {...this.props} />
        const vpPanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(vpPanel.type).toBe('div')

        expect(findWithType(vpPanel,'button'))
        expect(findWithType(vpPanel,VPAEForm))
        expect(findWithType(vpPanel,VPTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a VPPanel with a VPAEForm in edit mode", function() {
        this.props.vp = this.props.vp.setIn(['addedit','vp','id'],"1")

        const renderExpression = <VPPanel {...this.props} />
        const vpPanel = ReactTestUtils.createRenderer().render(renderExpression)
        expect(vpPanel.type).toBe('div')

        expect(findWithType(vpPanel,'button'))
        expect(findWithType(vpPanel,VPAEForm))
        expect(findWithType(vpPanel,VPTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })*/

})
