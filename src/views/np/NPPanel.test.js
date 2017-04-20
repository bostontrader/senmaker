import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'
import {findWithType} from 'react-shallow-testutils'

import AppStore from '../../data/app/AppStore'
import NPAddForm  from './addedit/NPAddForm'
//import NPEditForm from './addedit/NPEditForm'
import NPPanel    from './NPPanel'
import NPTable    from './NPTable'
import NoundAEStore  from '../../data/dictionary/nound/addedit/NoundAEStore'
import NPAEStore  from '../../data/np/addedit/NPAEStore'
import StringStore   from '../../data/strings/StringStore'

describe("NPPanel", () => {

    it("Renders a NPPanel w/o add/edit", () => {
        const props = {
            np: Map({
                addedit: NPAEStore.getInitialState(),
                np: Map()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <NPPanel {...props} />
        const npPanel = TestUtils.createRenderer().render(renderExpression)
        expect(npPanel.type).toBe('div')

        expect(findWithType(npPanel,'button'))
        expect(findWithType(npPanel,NPTable))

        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

    it("Renders a NPPanel with a NPAddForm", () => {
        let props = {
            app: AppStore.getState(),
            nound: Map({
                addedit: NoundAEStore.getInitialState(),
                nouns: Map()
            }),
            np: Map({
                addedit: NPAEStore.getInitialState(),
                nouns: Map()
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

    /*it("Renders a NPPanel with a NPEditForm", () => {
        const props = {
            np: Map({
                addedit: NPAEStore.getInitialState(),
                nouns: Map()
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

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })*/
})
