import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import AppActionTypes from '../../data/AppActionTypes'
import AppStore from '../../data/AppStore'
import {PluralizationRule} from '../../data/nouns/NounConstants'
import Noun from '../../data/nouns/Noun'
import NounItem from './NounItem'
import NounTable from './NounTable'

describe("NounTable", () => {

    it("Renders a NounPanelLevel.BASE NounTable", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const props = {level:newState, nouns: OrderedMap()}
        const renderExpression = <NounTable {...props} />
        const nounTable = TestUtils.createRenderer().render(renderExpression)
        expect(nounTable.type).toBe('table')

        // Two columns in the thead
        expect(nounTable.props.children[0].props.children.props.children.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a NounPanelLevel.PLURALIZATION NounTable", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const props = {level:newState, nouns: OrderedMap()}
        const renderExpression = <NounTable {...props} />
        const nounTable = TestUtils.createRenderer().render(renderExpression)
        expect(nounTable.type).toBe('table')

        // Three columns in the thead
        expect(nounTable.props.children[0].props.children.props.children.length).toBe(3)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Will render zero NounItem", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const props = {level:newState, nouns: OrderedMap()}
        const renderExpression = <NounTable {...props} />
        const nounTable = TestUtils.createRenderer().render(renderExpression)
        const nounItems = findAllWithType(nounTable, NounItem)
        expect(nounItems.length).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Will render one NounItem", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})

        const nouns = OrderedMap().set(1, new Noun({
            id: 1,
            base: 'cat',
            plural: 'cats',
            pluralization_rule: PluralizationRule.Append_s
        }))

        const props = {level:newState, nouns: nouns}
        const renderExpression = <NounTable {...props} />
        const nounTable = TestUtils.createRenderer().render(renderExpression)
        const nounItems = findAllWithType(nounTable, NounItem)
        expect(nounItems.length).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Will render two NounItem", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})

        const nouns = OrderedMap().set(1, new Noun({
            id: 1,
            base: 'cat',
            plural: 'cats',
            pluralization_rule: PluralizationRule.Append_s
        })).set(2, new Noun({
            id: 2,
            base: 'box',
            plural: 'boxes',
            pluralization_rule: PluralizationRule.Append_es
        }))

        const props = {level:newState, nouns: nouns}
        const renderExpression = <NounTable {...props} />
        const nounTable = TestUtils.createRenderer().render(renderExpression)
        const nounItems = findAllWithType(nounTable, NounItem)
        expect(nounItems.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
