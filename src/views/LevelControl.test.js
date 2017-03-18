import React from 'react'

import {findAll} from 'react-shallow-testutils'
import rtRenderer from 'react-test-renderer'
import TestUtils from 'react-addons-test-utils'

import AppActionTypes from '../data/AppActionTypes'
import AppStore from '../data/AppStore'
import LevelControl from './LevelControl'
import StringStore from '../data/StringStore'

describe("LevelControl", () => {

    // Return the count of buttons that pass the test
    function look4Button(levelControl, css_id) {
        const n = findAll(levelControl, (element) => {
            return (element.props && element.props.id===css_id)
        })
        return n.length
    }

    it("Renders the LevelControl at level 0 before Quiz 0", () => {
        const props = {level:AppStore.getInitialState().get('level'), strings:StringStore.getInitialState()}
        const renderExpression = <LevelControl {...props} />
        const levelControl = TestUtils.createRenderer().render(renderExpression)
        expect(levelControl.props.className).toBe("level-control")

        expect( look4Button(levelControl, 'level-previous')).toBe(0)
        expect( look4Button(levelControl, 'level-next')).toBe(0)
        expect( look4Button(levelControl, 'level-reset')).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders the LevelControl at level 0 after Quiz 0", () => {
        let appState = AppStore.getInitialState()
        appState = AppStore.reduce(appState, {type: AppActionTypes.QUIZ_SETSCORE, score: true})
        const props = {level:appState.get('level'), strings:StringStore.getInitialState()}
        const renderExpression = <LevelControl {...props} />
        const levelControl = TestUtils.createRenderer().render(renderExpression)
        expect(levelControl.props.className).toBe("level-control");

        expect( look4Button(levelControl, 'level-previous')).toBe(0)
        expect( look4Button(levelControl, 'level-next')).toBe(1)
        expect( look4Button(levelControl, 'level-reset')).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders the LevelControl at 0 < level < maxLevel before the quiz", () => {
        let appState = AppStore.getInitialState()
        appState = AppStore.reduce(appState, {type: AppActionTypes.LEVEL_NEXT})
        const props = {level:appState.get('level'), strings:StringStore.getInitialState()}

        const renderExpression = <LevelControl {...props} />
        const levelControl = TestUtils.createRenderer().render(renderExpression)
        expect(levelControl.props.className).toBe("level-control");

        expect( look4Button(levelControl, 'level-previous')).toBe(1)
        expect( look4Button(levelControl, 'level-next')).toBe(0)
        expect( look4Button(levelControl, 'level-reset')).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders the LevelControl at 0 < level < maxLevel after the quiz", () => {
        let appState = AppStore.getInitialState()
        appState = AppStore.reduce(appState, {type: AppActionTypes.LEVEL_NEXT})
        appState = AppStore.reduce(appState, {type: AppActionTypes.QUIZ_SETSCORE, score: true})
        const props = {level:appState.get('level'), strings:StringStore.getInitialState()}
        const renderExpression = <LevelControl {...props} />
        const levelControl = TestUtils.createRenderer().render(renderExpression)
        expect(levelControl.props.className).toBe("level-control");

        expect( look4Button(levelControl, 'level-previous')).toBe(1)
        expect( look4Button(levelControl, 'level-next')).toBe(1)
        expect( look4Button(levelControl, 'level-reset')).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders the LevelControl === MaxLevel before the quiz", () => {
        let appState = AppStore.getInitialState()
        while(!appState.getIn(['level','maxLevel']))
            appState = AppStore.reduce(appState, {type: AppActionTypes.LEVEL_NEXT})
        const props = {level:appState.get('level'), strings:StringStore.getInitialState()}

        const renderExpression = <LevelControl {...props} />
        const levelControl = TestUtils.createRenderer().render(renderExpression)
        expect(levelControl.props.className).toBe("level-control");

        expect( look4Button(levelControl, 'level-previous')).toBe(1)
        expect( look4Button(levelControl, 'level-next')).toBe(0)
        expect( look4Button(levelControl, 'level-reset')).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders the LevelControl === MaxLevel after the quiz", () => {
        let appState = AppStore.getInitialState()
        while(!appState.getIn(['level','maxLevel']))
            appState = AppStore.reduce(appState, {type: AppActionTypes.LEVEL_NEXT})
        appState = AppStore.reduce(appState, {type: AppActionTypes.QUIZ_SETSCORE, score: true})
        const props = {level:appState.get('level'), strings:StringStore.getInitialState()}

        const renderExpression = <LevelControl {...props} />
        const levelControl = TestUtils.createRenderer().render(renderExpression)
        expect(levelControl.props.className).toBe("level-control");

        expect( look4Button(levelControl, 'level-previous')).toBe(1)
        expect( look4Button(levelControl, 'level-next')).toBe(0)
        expect( look4Button(levelControl, 'level-reset')).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
