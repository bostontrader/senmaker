import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'
import {findAllWithClass, findWithClass, findWithType} from 'react-shallow-testutils'

import AppActionTypes from '../data/AppActionTypes'
import AppStore from '../data/AppStore'
import Level02 from './Level02'
import LevelControl from './LevelControl'
import StringStore from '../data/StringStore'
import VerbActionTypes from '../data/dictionary/verbs/VerbDictionaryActionTypes'
import VerbAddEditStore from '../data/dictionary/verbs/VerbDictionaryItemAddEditStore'
import VerbPanel from './dictionary/verbs/VerbPanel'

describe("Level02", () => {

    it("Renders Level02, no quiz checkmarks.", () => {
        const props = {
            addEditVerb: VerbAddEditStore.getInitialState(),
            level:AppStore.getInitialState(),
            verbs: OrderedMap(),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <Level02 {...props} />
        const level02Renderer = TestUtils.createRenderer().render(renderExpression)
        expect(level02Renderer.type).toBe('div')

        expect(findWithClass(level02Renderer,'help'))
        expect(findWithType(level02Renderer,VerbPanel))
        expect(findWithClass(level02Renderer,'quiz'))
        expect(findWithType(level02Renderer,LevelControl))

        // None of the quiz items should be checked.
        expect(findAllWithClass(level02Renderer,'checkmark').length).toBe(0)
        
        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders Level02, one quiz checkmarks.", () => {

        let level = AppStore.getInitialState()
        level = AppStore.reduce(level, {type: AppActionTypes.LEVEL_NEXT})
        level = AppStore.reduce(level, {ui: true, type: VerbActionTypes.INSERT_VERB})

        const props = {
            addEditVerb: VerbAddEditStore.getInitialState(),
            level:level,
            verbs: OrderedMap(),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <Level02 {...props} />
        const level02Renderer = TestUtils.createRenderer().render(renderExpression)

        expect(findAllWithClass(level02Renderer,'checkmark').length).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders Level02, two quiz checkmarks.", () => {

        let level = AppStore.getInitialState()
        level = AppStore.reduce(level, {type: AppActionTypes.LEVEL_NEXT})
        level = AppStore.reduce(level, {ui: true, type: VerbActionTypes.INSERT_VERB})
        level = AppStore.reduce(level, {type: VerbActionTypes.UPDATE_VERB})

        const props = {
            addEditVerb: VerbAddEditStore.getInitialState(),
            level:level,
            verbs: OrderedMap(),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <Level02 {...props} />
        const level02Renderer = TestUtils.createRenderer().render(renderExpression)

        expect(findAllWithClass(level02Renderer,'checkmark').length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders Level02, three quiz checkmarks.", () => {

        let level = AppStore.getInitialState()
        level = AppStore.reduce(level, {type: AppActionTypes.LEVEL_NEXT})
        level = AppStore.reduce(level, {ui: true, type: VerbActionTypes.INSERT_VERB})
        level = AppStore.reduce(level, {type: VerbActionTypes.UPDATE_VERB})
        level = AppStore.reduce(level, {type: VerbActionTypes.DELETE_VERB})

        const props = {
            addEditVerb: VerbAddEditStore.getInitialState(),
            level:level,
            verbs: OrderedMap(),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <Level02 {...props} />
        const level02Renderer = TestUtils.createRenderer().render(renderExpression)

        expect(findAllWithClass(level02Renderer,'checkmark').length).toBe(3)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
