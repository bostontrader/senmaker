import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'
import {findAllWithClass, findWithClass, findWithType} from 'react-shallow-testutils'

import AppActionTypes from '../data/AppActionTypes'
import AppStore from '../data/AppStore'
import Level01 from './Level01'
import LevelControl from './LevelControl'
import NounActionTypes from '../data/nouns/NounActionTypes'
import NounAddEditStore from '../data/nouns/NounAddEditStore'
import NounPanel from './nouns/NounPanel'
import StringStore from '../data/StringStore'

describe("Level01", () => {

    it("Renders Level01, no quiz checkmarks.", () => {
        const props = {
            addEditNoun: NounAddEditStore.getInitialState(),
            level:AppStore.getInitialState(),
            nouns: OrderedMap(),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <Level01 {...props} />
        const level01Renderer = TestUtils.createRenderer().render(renderExpression)
        expect(level01Renderer.type).toBe('div')

        expect(findWithClass(level01Renderer,'help'))
        expect(findWithType(level01Renderer,NounPanel))
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
        level = AppStore.reduce(level, {ui: true, type: NounActionTypes.INSERT_NOUN})

        const props = {
            addEditNoun: NounAddEditStore.getInitialState(),
            level:level,
            nouns: OrderedMap(),
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
        level = AppStore.reduce(level, {ui: true, type: NounActionTypes.INSERT_NOUN})
        level = AppStore.reduce(level, {type: NounActionTypes.UPDATE_NOUN})

        const props = {
            addEditNoun: NounAddEditStore.getInitialState(),
            level:level,
            nouns: OrderedMap(),
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
        level = AppStore.reduce(level, {ui: true, type: NounActionTypes.INSERT_NOUN})
        level = AppStore.reduce(level, {type: NounActionTypes.UPDATE_NOUN})
        level = AppStore.reduce(level, {type: NounActionTypes.DELETE_NOUN})

        const props = {
            addEditNoun: NounAddEditStore.getInitialState(),
            level:level,
            nouns: OrderedMap(),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <Level01 {...props} />
        const level01Renderer = TestUtils.createRenderer().render(renderExpression)

        expect(findAllWithClass(level01Renderer,'checkmark').length).toBe(3)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
