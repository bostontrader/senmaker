import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'
import {findWithType} from 'react-shallow-testutils'

import AppStore from '../../../data/AppStore'
import StringStore from '../../../data/StringStore'
import VerbAddEditStore from '../../../data/dictionary/verbs/VerbDictionaryItemAddEditStore'
import VerbPanel from './VerbPanel'
import VerbTable from './VerbTable'

describe("VerbPanel", () => {

    it("Renders a VerbPanel", () => {
        const props = {
            addEditVerb: VerbAddEditStore.getInitialState(),
            level:AppStore.getInitialState(),
            verbs: OrderedMap(),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <VerbPanel {...props} />
        const verbPanel = TestUtils.createRenderer().render(renderExpression)
        expect(verbPanel.type).toBe('div')

        expect(findWithType(verbPanel,'button'))
        expect(findWithType(verbPanel,VerbTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
