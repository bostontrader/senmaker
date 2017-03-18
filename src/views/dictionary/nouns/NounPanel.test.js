import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'
import {findWithType} from 'react-shallow-testutils'

import AppStore from '../../../data/AppStore'
import NounAddEditStore from '../../../data/dictionary/nouns/NounDictionaryItemAddEditStore'
import NounPanel from './NounPanel'
import NounTable from './NounTable'
import StringStore from '../../../data/StringStore'

describe("NounPanel", () => {

    it("Renders a NounPanel", () => {
        const props = {
            addEditNoun: NounAddEditStore.getInitialState(),
            level:AppStore.getInitialState(),
            nouns: OrderedMap(),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <NounPanel {...props} />
        const nounPanel = TestUtils.createRenderer().render(renderExpression)
        expect(nounPanel.type).toBe('div')

        expect(findWithType(nounPanel,'button'))
        expect(findWithType(nounPanel,NounTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
