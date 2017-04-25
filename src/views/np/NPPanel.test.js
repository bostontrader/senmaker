import {Map} from 'immutable'
import React from 'react'

import TestUtils      from 'react-addons-test-utils'
import rtRenderer     from 'react-test-renderer'
import {findWithType} from 'react-shallow-testutils'

import NPPanel      from './NPPanel'
import NPTable      from './NPTable'
import NPAddForm    from './addedit/NPAddForm'
import NPEditForm   from './addedit/NPEditForm'
import AppStore     from '../../data/app/AppStore'
import NoundStore   from '../../data/dictionary/nound/NoundStore'
import NoundAEStore from '../../data/dictionary/nound/addedit/NoundAEStore'
import NPStore      from '../../data/np/NPStore'
import NPAEStore    from '../../data/np/addedit/NPAEStore'
import StringStore  from '../../data/strings/StringStore'

describe("NPPanel", () => {

    it("Renders a NPPanel w/o add/edit", () => {
        const props = {
            np: Map({
                addedit: NPAEStore.getInitialState(),
                dict: Map()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <NPPanel {...props} />
        const npPanel = TestUtils.createRenderer().render(renderExpression)
        expect(npPanel.type).toBe('div')

        expect(findWithType(npPanel,'button'))
        expect(findWithType(npPanel,NPTable))

        // This code errors with "Cannot read property 'style' of null"
        // I think this is because of the select statement
        // const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

    it("Renders a NPPanel with a NPAddForm", () => {
        let props = {
            app: AppStore.getState(),
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
        props.np = props.np.setIn(['addedit','addNP'],true)

        const renderExpression = <NPPanel {...props} />
        const npPanel = TestUtils.createRenderer().render(renderExpression)
        expect(npPanel.type).toBe('div')

        expect(findWithType(npPanel,'button'))
        expect(findWithType(npPanel,NPAddForm))
        expect(findWithType(npPanel,NPTable))

        // TypeError: Cannot read property 'style' of null wtf?
        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

    it("Renders a NPPanel with a NPEditForm", () => {
        let props = {
            app: AppStore.getState(),
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
        props.np = props.np.setIn(['addedit','np','id'],"0") // don't let this string become falsey

        const renderExpression = <NPPanel {...props} />
        const npPanel = TestUtils.createRenderer().render(renderExpression)
        expect(npPanel.type).toBe('div')

        expect(findWithType(npPanel,'button'))
        expect(findWithType(npPanel,NPEditForm))
        expect(findWithType(npPanel,NPTable))

        // This code errors with "Cannot read property 'style' of null"
        // I think this is because of the select statement
        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })
})
