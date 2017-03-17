import React from 'react'

import TestUtils  from 'react-addons-test-utils'
import rtRenderer from 'react-test-renderer'
import {findWithClass, findWithType} from 'react-shallow-testutils'

import AppStore from '../data/AppStore'
import Level00 from './Level00'
import LevelControl from './LevelControl'
import StringStore from '../data/StringStore'

describe("Level00", () => {

    it("Renders Level00", () => {
        const props = {level:AppStore.getInitialState(), strings:StringStore.getInitialState()}
        const renderExpression = <Level00 {...props} />
        const level00Renderer = TestUtils.createRenderer().render(renderExpression)
        expect(level00Renderer.type).toBe('div')

        expect(findWithClass(level00Renderer,'help'))
        expect(findWithClass(level00Renderer,'quiz'))
        expect(findWithType(level00Renderer,LevelControl))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
