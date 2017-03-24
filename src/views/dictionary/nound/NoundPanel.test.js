import {Map, OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'
import {findWithType} from 'react-shallow-testutils'

import AppStore from '../../../data/AppStore'
import NoundAEStore from '../../../data/dictionary/nound/addedit/NoundAEStore'
import NoundPanel from './NoundPanel'
import NoundTable from './NoundTable'
import NoundAddForm  from './addedit/NoundAddForm'
import NoundEditForm from './addedit/NoundEditForm'

import StringStore from '../../../data/StringStore'

describe("NoundPanel", () => {

    it("Renders a NoundPanel w/o add/edit", () => {
        const props = {
            level:AppStore.getInitialState(),
            nound: Map({
                addEditNound: NoundAEStore.getInitialState(),
                nouns: OrderedMap()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <NoundPanel {...props} />
        const nounPanel = TestUtils.createRenderer().render(renderExpression)
        expect(nounPanel.type).toBe('div')

        expect(findWithType(nounPanel,'button'))
        expect(findWithType(nounPanel,NoundTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })


    it("Renders a NoundPanel with a NoundAddForm", () => {
        let props = {
            level:AppStore.getInitialState(),
            nound: Map({
                addEditNound: NoundAEStore.getInitialState(),
                nouns: OrderedMap()
            }),
            strings:StringStore.getInitialState()
        }
        props.nound = props.nound.setIn(['addEditNound','addNound'],true)

        const renderExpression = <NoundPanel {...props} />
        const nounPanel = TestUtils.createRenderer().render(renderExpression)
        expect(nounPanel.type).toBe('div')

        expect(findWithType(nounPanel,'button'))
        expect(findWithType(nounPanel,NoundAddForm))
        expect(findWithType(nounPanel,NoundTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })


    it("Renders a NoundPanel with a NoundEditForm", () => {
        const props = {
            level:AppStore.getInitialState(),
            nound: Map({
                addEditNound: NoundAEStore.getInitialState(),
                nouns: OrderedMap()
            }),
            strings:StringStore.getInitialState()
        }
        props.nound = props.nound.setIn(['addEditNound','nound','id'],"0") // don't let this string become falsey

        const renderExpression = <NoundPanel {...props} />
        const nounPanel = TestUtils.createRenderer().render(renderExpression)
        expect(nounPanel.type).toBe('div')

        expect(findWithType(nounPanel,'button'))
        expect(findWithType(nounPanel,NoundEditForm))
        expect(findWithType(nounPanel,NoundTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
