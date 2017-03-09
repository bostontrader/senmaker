import React from 'react'

import {findAll} from 'react-shallow-testutils'
import rtRenderer from 'react-test-renderer'
import TestUtils from 'react-addons-test-utils'

import AppActionTypes from '../data/AppActionTypes'
import AppStore from '../data/AppStore'
import LevelControl from './LevelControl'

describe("LevelControl", () => {

    // Return the count of buttons that pass the test
    function look4Button(levelControl, css_id) {
        const n = findAll(levelControl, (element) => {
            return (element.props && element.props.id===css_id)
        })
        return n.length
    }

    it("Renders the LevelControl at level 0 before Quiz 0", () => {
        //const props = {level:{currentAppLevel:{app:0}, minLevel:true, maxLevel:false, quiz:false}}
        const props = {level:AppStore.getInitialState()}

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
        //const props = {level:{currentAppLevel:{app:0}, minLevel:true, maxLevel:false, quiz:true}}
        const state = AppStore.getState()
        const action = {type: AppActionTypes.QUIZ_TOGGLE}
        const newState = AppStore.reduce(state, action)
        const props = {level:newState}
        //console.log('LevelControl.test',props)
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

    it("Renders the LevelControl at 0 < level < maxLevel before the quiz", () => {
        //const props = {level:{currentAppLevel:{app:1}, minLevel:false, maxLevel:false, quiz:false}}
        const state = AppStore.getState()
        const action = {type: AppActionTypes.LEVEL_NEXT}
        const newState = AppStore.reduce(state, action)
        const props = {level:newState}

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
        const state = AppStore.getState()
        let action = {type: AppActionTypes.LEVEL_NEXT}
        let newState = AppStore.reduce(state, action)
        action = {type: AppActionTypes.QUIZ_TOGGLE}
        newState = AppStore.reduce(newState, action)
        const props = {level:newState}
        //console.log('LevelControl.test',props)

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
        let newState = AppStore.getState()
        //console.log('LevelControl.test',newState)

        //let cntr = 0
        while(!newState.get('maxLevel')) {
        //while(cntr++ < 5) {

                newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
            //console.log('LevelControl.test',newState)

        }

        const props = {level:newState}

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
        //const props = {level:{currentAppLevel:{app:1}, minLevel:false, maxLevel:true, quiz:true}}
        const props = {level:AppStore.getInitialState()}

        const renderExpression = <LevelControl {...props} />
        const levelControl = TestUtils.createRenderer().render(renderExpression)
        //expect(levelControl.props.className).toBe("level-control");

        // at level === maxLevel, all buttons should be present, except for level-next
        //expect( look4Button(levelControl, 'level-previous')).toBe(1)
        //expect( look4Button(levelControl, 'level-next')).toBe(0)
        //expect( look4Button(levelControl, 'level-reset')).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
