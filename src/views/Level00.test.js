import React from 'react'

import TestUtils  from 'react-addons-test-utils'
import rtRenderer from 'react-test-renderer'
import {findWithClass, findWithType} from 'react-shallow-testutils'

import Level00 from './Level00'
import LevelControl from './LevelControl'

describe("Level00", () => {

    it("correctly renders the Level00", () => {
        const props = {level:{app:0}}
        const renderExpression = <Level00 {...props} />
        const levelControl = TestUtils.createRenderer().render(renderExpression)
        expect(levelControl.type).toBe('div')

        expect(findWithClass(levelControl,'help'))
        expect(findWithClass(levelControl,'quiz'))
        expect(findWithType(levelControl,LevelControl))

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
