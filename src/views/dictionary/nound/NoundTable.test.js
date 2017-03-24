import {Map, OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import AppActionTypes from '../../../data/AppActionTypes'
import AppStore from '../../../data/AppStore'
import StringStore from '../../../data/StringStore'
import {PluralizationRule} from '../../../data/dictionary/nound/NoundConstants'
import Nound from '../../../data/dictionary/nound/Nound'
import NoundRow from './NoundRow'
import NoundTable from './NoundTable'

describe("NoundTable", () => {

    it("Renders a NoundPanelLevel.BASE NoundTable", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const props = {
            level:newState.get('level'),
            nound: Map({
                nouns: OrderedMap()
            })
        }
        const renderExpression = <NoundTable {...props} />
        const nounTable = TestUtils.createRenderer().render(renderExpression)
        expect(nounTable.type).toBe('table')

        // Two columns in the thead
        expect(nounTable.props.children[0].props.children.props.children.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a NoundPanelLevel.PLURALIZATION NoundTable", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const props = {level:newState.get('level'), nouns: OrderedMap()}
        const renderExpression = <NoundTable {...props} />
        const nounTable = TestUtils.createRenderer().render(renderExpression)
        expect(nounTable.type).toBe('table')

        // Three columns in the thead
        expect(nounTable.props.children[0].props.children.props.children.length).toBe(3)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Will render zero NoundRow", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const props = {level:newState.get('level'), nouns: OrderedMap()}
        const renderExpression = <NoundTable {...props} />
        const nounTable = TestUtils.createRenderer().render(renderExpression)
        const nounItems = findAllWithType(nounTable, NoundRow)
        expect(nounItems.length).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Will render one NoundRow", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})

        const nouns = OrderedMap().set(1, new Nound({
            id: 1,
            base: 'cat',
            plural: 'cats',
            pluralization_rule: PluralizationRule.Append_s
        }))

        const strings = StringStore.getInitialState()
        const props = {level:newState.get('level'), nouns: nouns, strings:strings}
        const renderExpression = <NoundTable {...props} />
        const nounTable = TestUtils.createRenderer().render(renderExpression)
        const nounItems = findAllWithType(nounTable, NoundRow)
        expect(nounItems.length).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Will render two NoundRow", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})

        const nouns = OrderedMap().set(1, new Nound({
            id: 1,
            base: 'cat',
            plural: 'cats',
            pluralization_rule: PluralizationRule.Append_s
        })).set(2, new Nound({
            id: 2,
            base: 'box',
            plural: 'boxes',
            pluralization_rule: PluralizationRule.Append_es
        }))

        const strings = StringStore.getInitialState()
        const props = {level:newState.get('level'), nouns: nouns, strings: strings}
        const renderExpression = <NoundTable {...props} />
        const nounTable = TestUtils.createRenderer().render(renderExpression)
        const nounItems = findAllWithType(nounTable, NoundRow)
        expect(nounItems.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
