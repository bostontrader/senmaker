import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'
import {findWithClass, findWithType} from 'react-shallow-testutils'

import AppActionTypes from '../../data/AppActionTypes'
import AppStore from '../../data/AppStore'
import VerbPanel from './VerbPanel'
import VerbTable from './VerbTable'
import LevelControl from '../LevelControl'

describe("VerbPanel", () => {

    it("Renders a VerbPanel", () => {
        let newState = AppStore.getInitialState()
        //newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        //newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const props = {editingVerb:{id:'', add:''}, level:newState, verbs: OrderedMap()}

        const renderExpression = <VerbPanel {...props} />
        const verbPanel = TestUtils.createRenderer().render(renderExpression)
        expect(verbPanel.type).toBe('div')

        expect(findWithType(verbPanel,'button'))
        expect(findWithType(verbPanel,VerbTable))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
