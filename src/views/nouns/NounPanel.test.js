import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'
import {findWithClass, findWithType} from 'react-shallow-testutils'

import AppActionTypes from '../../data/AppActionTypes'
import AppStore from '../../data/AppStore'
import NounPanel from './NounPanel'
import NounTable from './NounTable'
import LevelControl from '../LevelControl'

describe("NounPanel", () => {

    it("Renders a NounPanel", () => {
        let newState = AppStore.getInitialState()
        //newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        //newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const props = {editingNoun:{id:'', add:''}, level:newState, nouns: OrderedMap()}

        const renderExpression = <NounPanel {...props} />
        const nounPanel = TestUtils.createRenderer().render(renderExpression)
        expect(nounPanel.type).toBe('div')

        expect(findWithType(nounPanel,'button'))
        expect(findWithType(nounPanel,NounTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
