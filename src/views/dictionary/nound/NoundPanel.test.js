import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'
import {findWithType}    from 'react-shallow-testutils'
import {findAllWithType} from 'react-shallow-testutils'

import NoundAEForm  from './addedit/NoundAEForm'
import NoundPanel   from './NoundPanel'
import NoundTable   from './NoundTable'
import NoundStore   from '../../../data/dictionary/nound/NoundStore'
import NoundAEStore from '../../../data/dictionary/nound/addedit/NoundAEStore'
import StringStore  from '../../../data/strings/StringStore'

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

        // No NoundAEForm
        const noundAEForm = findAllWithType(noundPanel, NoundAEForm)
        expect(noundAEForm.length).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a NoundPanel with a NoundAEForm in add mode", function() {
        this.props.nound = this.props.nound.setIn(['addedit','addNound'],true)

        const renderExpression = <NoundPanel {...this.props} />
        const noundPanel = TestUtils.createRenderer().render(renderExpression)
        expect(noundPanel.type).toBe('div')

        expect(findWithType(noundPanel,'button'))
        expect(findWithType(noundPanel,NoundAEForm))
        expect(findWithType(noundPanel,NoundTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a NoundPanel with a NoundAEForm in edit mode", function() {
        this.props.nound = this.props.nound.setIn(['addedit','nound','id'],"1")

        const renderExpression = <NoundPanel {...this.props} />
        const noundPanel = TestUtils.createRenderer().render(renderExpression)
        expect(noundPanel.type).toBe('div')

        expect(findWithType(noundPanel,'button'))
        expect(findWithType(noundPanel,NoundAEForm))
        expect(findWithType(noundPanel,NoundTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
