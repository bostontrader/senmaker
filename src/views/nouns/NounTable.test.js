import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import {PluralizationRule, NounPanelLevel} from '../../data/nouns/NounConstants'
import Noun from '../../data/nouns/Noun'
import NounItem from './NounItem'
import NounTable from './NounTable'

describe("NounTable", () => {

    let nouns

    beforeEach( () => {
        nouns = OrderedMap()
    })

    it("correctly renders a NounPanelLevel.BASE NounTable", () => {
        const props = {level:{nounPanel:NounPanelLevel.BASE}, nouns:nouns}
        const renderExpression = <NounTable {...props} />
        const nounTable = TestUtils.createRenderer().render(renderExpression)
        expect(nounTable.type).toBe('table')

        // Two columns in the thead
        expect(nounTable.props.children[0].props.children.props.children.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("renders a NounPanelLevel.PLURALIZATION NounTable", () => {
        const props = {level:{nounPanel:NounPanelLevel.PLURALIZATION}, nouns:nouns}
        const renderExpression = <NounTable {...props} />
        const nounTable = TestUtils.createRenderer().render(renderExpression)
        expect(nounTable.type).toBe('table')

        // Three columns in the thead
        expect(nounTable.props.children[0].props.children.props.children.length).toBe(3)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("will render zero NounItem", () => {
        const props = {level:{nounPanel:NounPanelLevel.PLURALIZATION}, nouns:nouns}
        const renderExpression = <NounTable {...props} />
        const nounTable = TestUtils.createRenderer().render(renderExpression)
        const nounItems = findAllWithType(nounTable, NounItem)
        expect(nounItems.length).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("will render one NounItem", () => {
        nouns = nouns.set(1, new Noun({
            id: 1,
            base: 'cat',
            plural: 'cats',
            pluralization_rule: PluralizationRule.Append_s
        }))
        const props = {level:{nounPanel:NounPanelLevel.PLURALIZATION}, nouns:nouns}
        const renderExpression = <NounTable {...props} />
        const nounTable = TestUtils.createRenderer().render(renderExpression)
        const nounItems = findAllWithType(nounTable, NounItem)
        expect(nounItems.length).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("will render two NounItem", () => {
        nouns = nouns.set(1, new Noun({
            id: 1,
            base: 'cat',
            plural: 'cats',
            pluralization_rule: PluralizationRule.Append_s
        }))
        nouns = nouns.set(2, new Noun({
            id: 2,
            base: 'box',
            plural: 'boxes',
            pluralization_rule: PluralizationRule.Append_es
        }))
        const props = {level:{nounPanel:NounPanelLevel.PLURALIZATION}, nouns:nouns}
        const renderExpression = <NounTable {...props} />
        const nounTable = TestUtils.createRenderer().render(renderExpression)
        const nounItems = findAllWithType(nounTable, NounItem)
        expect(nounItems.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
