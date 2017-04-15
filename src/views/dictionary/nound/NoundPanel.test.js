import {Map} from 'immutable'
import React from 'react'

import TestUtils      from 'react-addons-test-utils'
import rtRenderer     from 'react-test-renderer'
import {findWithType} from 'react-shallow-testutils'

import NoundAddForm  from './addedit/NoundAddForm'
import NoundEditForm from './addedit/NoundEditForm'
import NoundPanel    from './NoundPanel'
import NoundTable    from './NoundTable'
import NoundStore    from '../../../data/dictionary/nound/NoundStore'
import NoundAEStore  from '../../../data/dictionary/nound/addedit/NoundAEStore'
import StringStore   from '../../../data/strings/StringStore'

describe("NoundPanel", function() {

    beforeEach(function() {
        this.props = {
            nound: Map({
                addedit: NoundAEStore.getInitialState(),
                dict: NoundStore.getInitialState()
            }),
            strings:StringStore.getInitialState()
        }
    })

    it("Renders a NoundPanel w/o add/edit", function() {
        const renderExpression = <NoundPanel {...this.props} />
        const noundPanel = TestUtils.createRenderer().render(renderExpression)
        expect(noundPanel.type).toBe('div')

        expect(findWithType(noundPanel,'button'))
        expect(findWithType(noundPanel,NoundTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a NoundPanel with a NoundAddForm", function() {
        this.props.nound = this.props.nound.setIn(['addedit','addNound'],true)

        const renderExpression = <NoundPanel {...this.props} />
        const noundPanel = TestUtils.createRenderer().render(renderExpression)
        expect(noundPanel.type).toBe('div')

        expect(findWithType(noundPanel,'button'))
        expect(findWithType(noundPanel,NoundAddForm))
        expect(findWithType(noundPanel,NoundTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a NoundPanel with a NoundEditForm", function() {
        this.props.nound = this.props.nound.setIn(['addedit','nound','id'],"0") // don't let this string become falsey

        const renderExpression = <NoundPanel {...this.props} />
        const noundPanel = TestUtils.createRenderer().render(renderExpression)
        expect(noundPanel.type).toBe('div')

        expect(findWithType(noundPanel,'button'))
        expect(findWithType(noundPanel,NoundEditForm))
        expect(findWithType(noundPanel,NoundTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
