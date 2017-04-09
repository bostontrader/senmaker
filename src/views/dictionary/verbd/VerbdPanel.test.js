import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'
import {findWithType} from 'react-shallow-testutils'

//import AppStore from '../../../data/app/AppStore'
import VerbdAddForm  from './addedit/VerbdAddForm'
import VerbdEditForm from './addedit/VerbdEditForm'
import VerbdPanel    from './VerbdPanel'
import VerbdTable    from './VerbdTable'
import VerbdAEStore  from '../../../data/dictionary/verbd/addedit/VerbdAEStore'
import StringStore   from '../../../data/strings/StringStore'

describe("VerbdPanel", () => {

    it("Renders a VerbdPanel", () => {
        const props = {
            verbd: Map({
                addEditVerbd: VerbdAEStore.getInitialState(),
                verbs: Map()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <VerbdPanel {...props} />
        const verbdPanel = TestUtils.createRenderer().render(renderExpression)
        expect(verbdPanel.type).toBe('div')

        expect(findWithType(verbdPanel,'button'))
        expect(findWithType(verbdPanel,VerbdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a VerbdPanel with a VerbdAddForm", () => {
        let props = {
            verbd: Map({
                addEditVerbd: VerbdAEStore.getInitialState(),
                verbs: Map()
            }),
            strings:StringStore.getInitialState()
        }
        props.verbd = props.verbd.setIn(['addEditVerbd','addVerbd'],true)

        const renderExpression = <VerbdPanel {...props} />
        const verbdPanel = TestUtils.createRenderer().render(renderExpression)
        expect(verbdPanel.type).toBe('div')

        expect(findWithType(verbdPanel,'button'))
        expect(findWithType(verbdPanel,VerbdAddForm))
        expect(findWithType(verbdPanel,VerbdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a VerbdPanel with a VerbdEditForm", () => {
        const props = {
            verbd: Map({
                addEditVerbd: VerbdAEStore.getInitialState(),
                verbs: Map()
            }),
            strings:StringStore.getInitialState()
        }
        props.verbd = props.verbd.setIn(['addEditVerbd','verbd','id'],"0") // don't let this string become falsey

        const renderExpression = <VerbdPanel {...props} />
        const verbdPanel = TestUtils.createRenderer().render(renderExpression)
        expect(verbdPanel.type).toBe('div')

        expect(findWithType(verbdPanel,'button'))
        expect(findWithType(verbdPanel,VerbdEditForm))
        expect(findWithType(verbdPanel,VerbdTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
