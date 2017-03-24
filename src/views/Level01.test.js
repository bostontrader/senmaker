import {Map, OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'
import {findAllWithClass, findWithClass, findWithType} from 'react-shallow-testutils'

import AppActionTypes from '../data/AppActionTypes'
import AppStore from '../data/AppStore'
import Level01 from './Level01'
import LevelControl from './LevelControl'
//import NoundActionTypes from '../data/dictionary/nound/NoundActionTypes'
import NoundAEStore from '../data/dictionary/nound/addedit/NoundAEStore'
import NoundAEActionTypes from '../data/dictionary/nound/addedit/NoundAEActionTypes'
import NoundPanel from './dictionary/nound/NoundPanel'
import StringStore from '../data/StringStore'

describe("Level01", () => {

    it("Renders Level01, no quiz checkmarks.", () => {
        const props = {
            level:AppStore.getInitialState().get('level'),
            nound: Map({
                addEditNound: NoundAEStore.getInitialState(),
                nouns: OrderedMap()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <Level01 {...props} />
        const level01Renderer = TestUtils.createRenderer().render(renderExpression)
        expect(level01Renderer.type).toBe('div')

        expect(findWithClass(level01Renderer,'help'))
        expect(findWithType(level01Renderer,NoundPanel))
        expect(findWithClass(level01Renderer,'quiz'))
        expect(findWithType(level01Renderer,LevelControl))

        // None of the quiz items should be checked.
        expect(findAllWithClass(level01Renderer,'checkmark').length).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders Level01, one quiz checkmarks.", () => {

        let level = AppStore.getInitialState()
        level = AppStore.reduce(level, {type: AppActionTypes.LEVEL_NEXT})
        level = AppStore.reduce(level, {type: NoundAEActionTypes.CLICK_SAVE_NOUND, nound:{}})

        const props = {
            level:level.get('level'),
            nound: Map({
                addEditNound: NoundAEStore.getInitialState(),
                nouns: OrderedMap()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <Level01 {...props} />
        const level01Renderer = TestUtils.createRenderer().render(renderExpression)

        expect(findAllWithClass(level01Renderer,'checkmark').length).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders Level01, two quiz checkmarks.", () => {

        let level = AppStore.getInitialState()
        level = AppStore.reduce(level, {type: AppActionTypes.LEVEL_NEXT})
        level = AppStore.reduce(level, {type: NoundAEActionTypes.CLICK_SAVE_NOUND, nound:{}})
        level = AppStore.reduce(level, {type: NoundAEActionTypes.CLICK_SAVE_NOUND, nound:{id:'1'}})

        const props = {
            nound: Map({
                addEditNound: NoundAEStore.getInitialState(),
                nouns: OrderedMap()
            }),
            level:level.get('level'),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <Level01 {...props} />
        const level01Renderer = TestUtils.createRenderer().render(renderExpression)

        expect(findAllWithClass(level01Renderer,'checkmark').length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders Level01, three quiz checkmarks.", () => {

        let level = AppStore.getInitialState()
        level = AppStore.reduce(level, {type: AppActionTypes.LEVEL_NEXT})
        level = AppStore.reduce(level, {type: NoundAEActionTypes.CLICK_SAVE_NOUND, nound:{}})
        level = AppStore.reduce(level, {type: NoundAEActionTypes.CLICK_SAVE_NOUND, nound:{id:'1'}})
        level = AppStore.reduce(level, {type: NoundAEActionTypes.CLICK_DELETE_NOUND})

        const props = {
            level:level.get('level'),
            nound: Map({
                addEditNound: NoundAEStore.getInitialState(),
                nouns: OrderedMap()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <Level01 {...props} />
        const level01Renderer = TestUtils.createRenderer().render(renderExpression)

        expect(findAllWithClass(level01Renderer,'checkmark').length).toBe(3)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
