import {Map, OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'
import {findAllWithClass, findWithClass, findWithType} from 'react-shallow-testutils'

import AppActionTypes from '../data/AppActionTypes'
import AppStore from '../data/AppStore'
import Level02 from './Level02'
import LevelControl from './LevelControl'
import StringStore from '../data/StringStore'
//import VerbActionTypes from '../data/dictionary/verbd/VerbdActionTypes'
import VerbdAEActionTypes from '../data/dictionary/verbd/addedit/VerbdAEActionTypes'
import VerbdAEStore from '../data/dictionary/verbd/addedit/VerbdAEStore'
import VerbdPanel from './dictionary/verbd/VerbdPanel'

describe("Level02", () => {

    it("Renders Level02, no quiz checkmarks.", () => {
        const props = {
            level:AppStore.getInitialState().get('level'),
            verbd: Map({
                addEditVerbd: VerbdAEStore.getInitialState(),
                verbs: OrderedMap()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <Level02 {...props} />
        const level01Renderer = TestUtils.createRenderer().render(renderExpression)
        expect(level01Renderer.type).toBe('div')

        expect(findWithClass(level01Renderer,'help'))
        expect(findWithType(level01Renderer,VerbdPanel))
        expect(findWithClass(level01Renderer,'quiz'))
        expect(findWithType(level01Renderer,LevelControl))

        // None of the quiz items should be checked.
        expect(findAllWithClass(level01Renderer,'checkmark').length).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders Level02, one quiz checkmarks.", () => {

        let level = AppStore.getInitialState()
        level = AppStore.reduce(level, {type: AppActionTypes.LEVEL_NEXT})
        level = AppStore.reduce(level, {type: AppActionTypes.LEVEL_NEXT})
        level = AppStore.reduce(level, {type: VerbdAEActionTypes.CLICK_SAVE_VERBD, verbd:{}})

        const props = {
            level:level.get('level'),
            verbd: Map({
                addEditVerbd: VerbdAEStore.getInitialState(),
                verbs: OrderedMap()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <Level02 {...props} />
        const level01Renderer = TestUtils.createRenderer().render(renderExpression)

        expect(findAllWithClass(level01Renderer,'checkmark').length).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders Level02, two quiz checkmarks.", () => {

        let level = AppStore.getInitialState()
        level = AppStore.reduce(level, {type: AppActionTypes.LEVEL_NEXT})
        level = AppStore.reduce(level, {type: AppActionTypes.LEVEL_NEXT})
        level = AppStore.reduce(level, {type: VerbdAEActionTypes.CLICK_SAVE_VERBD, verbd:{}})
        level = AppStore.reduce(level, {type: VerbdAEActionTypes.CLICK_SAVE_VERBD, verbd:{id:'1'}})

        const props = {
            verbd: Map({
                addEditVerbd: VerbdAEStore.getInitialState(),
                verbs: OrderedMap()
            }),
            level:level.get('level'),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <Level02 {...props} />
        const level01Renderer = TestUtils.createRenderer().render(renderExpression)

        expect(findAllWithClass(level01Renderer,'checkmark').length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders Level02, three quiz checkmarks.", () => {

        let level = AppStore.getInitialState()
        level = AppStore.reduce(level, {type: AppActionTypes.LEVEL_NEXT})
        level = AppStore.reduce(level, {type: AppActionTypes.LEVEL_NEXT})
        level = AppStore.reduce(level, {type: VerbdAEActionTypes.CLICK_SAVE_VERBD, verbd:{}})
        level = AppStore.reduce(level, {type: VerbdAEActionTypes.CLICK_SAVE_VERBD, verbd:{id:'1'}})
        level = AppStore.reduce(level, {type: VerbdAEActionTypes.CLICK_DELETE_VERBD})

        const props = {
            level:level.get('level'),
            verbd: Map({
                addEditVerbd: VerbdAEStore.getInitialState(),
                verbs: OrderedMap()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <Level02 {...props} />
        const level01Renderer = TestUtils.createRenderer().render(renderExpression)

        expect(findAllWithClass(level01Renderer,'checkmark').length).toBe(3)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
