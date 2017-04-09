import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'
import {findWithType} from 'react-shallow-testutils'

//import AppStore from '../../../data/app/AppStore'
import NoundAddForm  from './addedit/NoundAddForm'
import NoundEditForm from './addedit/NoundEditForm'
import NoundPanel    from './NoundPanel'
import NoundTable    from './NoundTable'
import NoundAEStore  from '../../../data/dictionary/nound/addedit/NoundAEStore'
import StringStore   from '../../../data/strings/StringStore'

describe("NoundPanel", () => {

    it("Renders a NoundPanel w/o add/edit", () => {
        const props = {
            nound: Map({
                addEditNound: NoundAEStore.getInitialState(),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <NoundPanel {...props} />
        const noundPanel = TestUtils.createRenderer().render(renderExpression)
        expect(noundPanel.type).toBe('div')

        expect(findWithType(noundPanel,'button'))
        expect(findWithType(noundPanel,NoundTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a NoundPanel with a NoundAddForm", () => {
        let props = {
            nound: Map({
                addEditNound: NoundAEStore.getInitialState(),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }
        props.nound = props.nound.setIn(['addEditNound','addNound'],true)

        const renderExpression = <NoundPanel {...props} />
        const noundPanel = TestUtils.createRenderer().render(renderExpression)
        expect(noundPanel.type).toBe('div')

        expect(findWithType(noundPanel,'button'))
        expect(findWithType(noundPanel,NoundAddForm))
        expect(findWithType(noundPanel,NoundTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a NoundPanel with a NoundEditForm", () => {
        const props = {
            nound: Map({
                addEditNound: NoundAEStore.getInitialState(),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }
        props.nound = props.nound.setIn(['addEditNound','nound','id'],"0") // don't let this string become falsey

        const renderExpression = <NoundPanel {...props} />
        const noundPanel = TestUtils.createRenderer().render(renderExpression)
        expect(noundPanel.type).toBe('div')

        expect(findWithType(noundPanel,'button'))
        expect(findWithType(noundPanel,NoundEditForm))
        expect(findWithType(noundPanel,NoundTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
