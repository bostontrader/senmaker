import {Map} from 'immutable'
import React from 'react'

import TestUtils      from 'react-addons-test-utils'
import rtRenderer     from 'react-test-renderer'
import {findWithType} from 'react-shallow-testutils'

import VerbdAEForm  from './addedit/VerbdAEForm'
import VerbdPanel   from './VerbdPanel'
import VerbdTable   from './VerbdTable'
import VerbdStore   from '../../../data/dictionary/verbd/VerbdStore'
import VerbdAEStore from '../../../data/dictionary/verbd/addedit/VerbdAEStore'
import StringStore  from '../../../data/strings/StringStore'

describe("VerbdPanel", function() {

    beforeEach(function() {
        this.props = {
            verbd: Map({
                addedit: VerbdAEStore.getInitialState(),
                dict: VerbdStore.getInitialState()
            }),
            strings:StringStore.getInitialState()
        }
    })

    it("Renders a VerbdPanel w/o add/edit", function() {
        const renderExpression = <VerbdPanel {...this.props} />
        const verbdPanel = TestUtils.createRenderer().render(renderExpression)
        expect(verbdPanel.type).toBe('div')

        expect(findWithType(verbdPanel,'button'))
        expect(findWithType(verbdPanel,VerbdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a VerbdPanel with a VerbdAEForm in add mode", function() {
        this.props.verbd = this.props.verbd.setIn(['addedit','addVerbd'],true)

        const renderExpression = <VerbdPanel {...this.props} />
        const verbdPanel = TestUtils.createRenderer().render(renderExpression)
        expect(verbdPanel.type).toBe('div')

        expect(findWithType(verbdPanel,'button'))
        expect(findWithType(verbdPanel,VerbdAEForm))
        expect(findWithType(verbdPanel,VerbdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a VerbdPanel with a VerbdAEForm in edit mode", function() {
        this.props.verbd = this.props.verbd.setIn(['addedit','verbd','id'],"1")

        const renderExpression = <VerbdPanel {...this.props} />
        const verbdPanel = TestUtils.createRenderer().render(renderExpression)
        expect(verbdPanel.type).toBe('div')

        expect(findWithType(verbdPanel,'button'))
        expect(findWithType(verbdPanel,VerbdAEForm))
        expect(findWithType(verbdPanel,VerbdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
