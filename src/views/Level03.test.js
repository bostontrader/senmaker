import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'
import {findWithClass, findWithType} from 'react-shallow-testutils'

import AppActionTypes from '../data/AppActionTypes'
import AppStore from '../data/AppStore'
import Level03 from './Level03'
import LevelControl from './LevelControl'
import NounPanel from './nouns/NounPanel'

describe("Level03", () => {

    it("Renders Level03", () => {
        let newState = AppStore.getInitialState()
        //newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const props = {editingNoun:{id:'', add:''}, level:newState, nouns: OrderedMap()}

        const renderExpression = <Level03 {...props} />
        const levelControl = TestUtils.createRenderer().render(renderExpression)
        expect(levelControl.type).toBe('div')

        expect(findWithClass(levelControl,'help'))
        expect(findWithType(levelControl,NounPanel))
        expect(findWithClass(levelControl,'quiz'))
        expect(findWithType(levelControl,LevelControl))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
