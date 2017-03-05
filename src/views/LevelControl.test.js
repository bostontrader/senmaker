import React from 'react'

import {findAll} from 'react-shallow-testutils'
import rtRenderer from 'react-test-renderer'
import TestUtils from 'react-addons-test-utils'

import LevelControl from './LevelControl'

describe("LevelControl", () => {

    it("Renders the LevelControl at level 0 before Quiz 0", () => {
        const props = {level:{app:0}}
        const renderExpression = <LevelControl {...props} />
        const levelControl = TestUtils.createRenderer().render(renderExpression)
        expect(levelControl.props.className).toBe("level-control");

        // at level 0 before Quiz 0, there sb no buttons at all
        expect( look4Button(levelControl, 'level-previous')).toBe(0)
        expect( look4Button(levelControl, 'level-next')).toBe(0)
        expect( look4Button(levelControl, 'level-reset')).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders the LevelControl at level 0 after Quiz 0", () => {
        const props = {level:{app:0}}
        const renderExpression = <LevelControl {...props} />
        const levelControl = TestUtils.createRenderer().render(renderExpression)
        expect(levelControl.props.className).toBe("level-control");

        // at level 0 after quiz 0, there sb no level-previous button
        expect( look4Button(levelControl, 'level-previous')).toBe(0)
        expect( look4Button(levelControl, 'level-next')).toBe(1)
        expect( look4Button(levelControl, 'level-reset')).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    // Return the count of buttons that pass the test
    function look4Button(levelControl, css_id) {
        const n = findAll(levelControl, (element) => {
            return (element.props && element.props.id===css_id)
        })
        return n.length
    }

    it("Renders the LevelControl at level < maxLevel", () => {
        const props = {level:{app:1, maxLevel:2}}
        const renderExpression = <LevelControl {...props} />
        const levelControl = TestUtils.createRenderer().render(renderExpression)
        expect(levelControl.props.className).toBe("level-control");

        // at level < maxLevel, all buttons should be present
        expect( look4Button(levelControl, 'level-previous')).toBe(1)
        expect( look4Button(levelControl, 'level-next')).toBe(1)
        expect( look4Button(levelControl, 'level-reset')).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders the LevelControl === MaxLevel", () => {
        const props = {level:{app:2, maxLevel:2}}
        const renderExpression = <LevelControl {...props} />
        const levelControl = TestUtils.createRenderer().render(renderExpression)
        expect(levelControl.props.className).toBe("level-control");

        // at level === maxLevel, all buttons should be present, except for level-next
        expect( look4Button(levelControl, 'level-previous')).toBe(1)
        expect( look4Button(levelControl, 'level-next')).toBe(0)
        expect( look4Button(levelControl, 'level-reset')).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
