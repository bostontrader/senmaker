import {Map, OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'
import {findWithType} from 'react-shallow-testutils'

import AppStore from '../../../data/AppStore'
import VerbdAEStore from '../../../data/dictionary/verbd/addedit/VerbdAEStore'
import VerbdPanel from './VerbdPanel'
import VerbdTable from './VerbdTable'
import VerbdAddForm  from './addedit/VerbdAddForm'
import VerbdEditForm from './addedit/VerbdEditForm'

import StringStore from '../../../data/StringStore'

describe("VerbdPanel", () => {

    it("Renders a VerbdPanel", () => {
        const props = {
            level:AppStore.getInitialState(),
            verbd: Map({
                addEditVerbd: VerbdAEStore.getInitialState(),
                verbs: OrderedMap()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <VerbdPanel {...props} />
        const verbPanel = TestUtils.createRenderer().render(renderExpression)
        expect(verbPanel.type).toBe('div')

        expect(findWithType(verbPanel,'button'))
        expect(findWithType(verbPanel,VerbdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a VerbdPanel with a VerbdAddForm", () => {
        let props = {
            level:AppStore.getInitialState(),
            verbd: Map({
                addEditVerbd: VerbdAEStore.getInitialState(),
                verbs: OrderedMap()
            }),
            strings:StringStore.getInitialState()
        }
        props.verbd = props.verbd.setIn(['addEditVerbd','addVerbd'],true)

        const renderExpression = <VerbdPanel {...props} />
        const verbPanel = TestUtils.createRenderer().render(renderExpression)
        expect(verbPanel.type).toBe('div')

        expect(findWithType(verbPanel,'button'))
        expect(findWithType(verbPanel,VerbdAddForm))
        expect(findWithType(verbPanel,VerbdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })


    it("Renders a VerbdPanel with a VerbdEditForm", () => {
        const props = {
            level:AppStore.getInitialState(),
            verbd: Map({
                addEditVerbd: VerbdAEStore.getInitialState(),
                verbs: OrderedMap()
            }),
            strings:StringStore.getInitialState()
        }
        props.verbd = props.verbd.setIn(['addEditVerbd','verbd','id'],"0") // don't let this string become falsey

        const renderExpression = <VerbdPanel {...props} />
        const verbPanel = TestUtils.createRenderer().render(renderExpression)
        expect(verbPanel.type).toBe('div')

        expect(findWithType(verbPanel,'button'))
        expect(findWithType(verbPanel,VerbdEditForm))
        expect(findWithType(verbPanel,VerbdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
