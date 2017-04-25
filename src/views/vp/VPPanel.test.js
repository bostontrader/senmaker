import {Map} from 'immutable'
import React from 'react'

import TestUtils      from 'react-addons-test-utils'
import rtRenderer     from 'react-test-renderer'
import {findWithType} from 'react-shallow-testutils'

import VPPanel      from './VPPanel'
import VPTable      from './VPTable'
import VPAddForm    from './addedit/VPAddForm'
import VPEditForm   from './addedit/VPEditForm'
import AppStore     from '../../data/app/AppStore'
import VerbdStore   from '../../data/dictionary/verbd/VerbdStore'
import VerbdAEStore from '../../data/dictionary/verbd/addedit/VerbdAEStore'
import StringStore  from '../../data/strings/StringStore'
import VPStore      from '../../data/vp/VPStore'
import VPAEStore    from '../../data/vp/addedit/VPAEStore'

describe("VPPanel", () => {

    it("Renders a VPPanel w/o add/edit", () => {
        const props = {
            vp: Map({
                addedit: VPAEStore.getInitialState(),
                dict: Map()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <VPPanel {...props} />
        const vpPanel = TestUtils.createRenderer().render(renderExpression)
        expect(vpPanel.type).toBe('div')

        expect(findWithType(vpPanel,'button'))
        expect(findWithType(vpPanel,VPTable))

        // This code errors with "Cannot read property 'style' of null"
        // I think this is because of the select statement
        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

    it("Renders a VPPanel with a VPAddForm", () => {
        const props = {
            app: AppStore.getState(),
            verbd: Map({
                addedit: VerbdAEStore.getInitialState(),
                dict: VerbdStore.getInitialState()
            }),
            vp: Map({
                addedit: VPAEStore.getInitialState(),
                dict: VPStore.getInitialState()
            }),
            strings:StringStore.getInitialState()
        }
        props.vp = props.vp.setIn(['addedit','addVP'],true)

        const renderExpression = <VPPanel {...props} />
        const vpPanel = TestUtils.createRenderer().render(renderExpression)
        expect(vpPanel.type).toBe('div')

        expect(findWithType(vpPanel,'button'))
        expect(findWithType(vpPanel,VPAddForm))
        expect(findWithType(vpPanel,VPTable))

        // This code errors with "Cannot read property 'style' of null"
        // I think this is because of the select statement
        // const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

    it("Renders a VPPanel with a VPEditForm", () => {
        const props = {
            app: AppStore.getState(),
            verbd: Map({
                addedit: VerbdAEStore.getInitialState(),
                dict: VerbdStore.getInitialState()
            }),
            vp: Map({
                addedit: VPAEStore.getInitialState(),
                dict: VPStore.getInitialState()
            }),
            strings:StringStore.getInitialState()
        }
        props.vp = props.vp.setIn(['addedit','vp','id'],"1")

        const renderExpression = <VPPanel {...props} />
        const vpPanel = TestUtils.createRenderer().render(renderExpression)
        expect(vpPanel.type).toBe('div')

        expect(findWithType(vpPanel,'button'))
        expect(findWithType(vpPanel,VPEditForm))
        expect(findWithType(vpPanel,VPTable))

        // This code errors with "Cannot read property 'style' of null"
        // I think this is because of the select statement
        // const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })
})
