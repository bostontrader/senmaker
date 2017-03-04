import React from 'react'

import TestUtils  from 'react-addons-test-utils'
import rtRenderer from 'react-test-renderer'

import Level00 from './Level00'

describe("Level00", () => {

    it("correctly renders the Level00", () => {
        const props = {level:{app:0}}
        const renderExpression = <Level00 {...props} />
        const levelControl = TestUtils.createRenderer().render(renderExpression)
        expect(levelControl.type).toBe('div')

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
