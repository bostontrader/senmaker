import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import {PastTenseRule, VerbPanelLevel} from '../../data/verbs/VerbConstants'
import Verb from '../../data/verbs/Verb'
import VerbItem from './VerbItem'
import VerbTable from './VerbTable'

describe("VerbTable", () => {

    it("correctly renders a VerbPanelLevel.BASE VerbTable", () => {
        const verbs = OrderedMap() // An empty list of verbs
        const renderExpression = <VerbTable level={VerbPanelLevel.BASE} verbs={verbs} />
        const tuRenderer = TestUtils.createRenderer()
        const verbTable = tuRenderer.render(renderExpression)
        expect(verbTable.type).toBe('table')

        // Two columns in the thead
        expect(verbTable.props.children[0].props.children.props.children.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("renders a VerbPanelLevel.PAST_TENSE VerbTable", () => {
        const verbs = OrderedMap() // An empty list of verbs
        const renderExpression = <VerbTable level={VerbPanelLevel.PAST_TENSE} verbs={verbs} />
        const tuRenderer = TestUtils.createRenderer()
        const verbTable = tuRenderer.render(renderExpression)
        expect(verbTable.type).toBe('table')

        // Three columns in the thead
        expect(verbTable.props.children[0].props.children.props.children.length).toBe(3)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("will render zero VerbItem", () => {
        const verbs = OrderedMap() // An empty list of verbs
        const renderExpression = <VerbTable level={VerbPanelLevel.PAST_TENSE} verbs={verbs} />
        const tuRenderer = TestUtils.createRenderer()
        const verbTable = tuRenderer.render(renderExpression)
        const verbItems = findAllWithType(verbTable, VerbItem)
        expect(verbItems.length).toBe(0)
    })

    it("will render one VerbItem", () => {
        let verbs = OrderedMap() // An empty list of verbs
        verbs = verbs.set(1, new Verb({
            id: 1,
            base: 'talk',
            pastTense: 'talked',
            pastTense_rule: PastTenseRule.Append_ed
        }))
        const renderExpression = <VerbTable level={VerbPanelLevel.PAST_TENSE} verbs={verbs} />
        const tuRenderer = TestUtils.createRenderer()
        const verbTable = tuRenderer.render(renderExpression)
        const verbItems = findAllWithType(verbTable, VerbItem)
        expect(verbItems.length).toBe(1)
    })

    it("will render two VerbItem", () => {
        let verbs = OrderedMap() // An empty list of verbs
        verbs = verbs.set(1, new Verb({
            id: 1,
            base: 'talk',
            pastTense: 'talked',
            pastTense_rule: PastTenseRule.Append_ed
        }))
        verbs = verbs.set(2, new Verb({
            id: 2,
            base: 'eat',
            pastTense: 'ate',
            pastTense_rule: PastTenseRule.Irregular
        }))
        const renderExpression = <VerbTable level={VerbPanelLevel.PAST_TENSE} verbs={verbs} />
        const tuRenderer = TestUtils.createRenderer()
        const verbTable = tuRenderer.render(renderExpression)
        const verbItems = findAllWithType(verbTable, VerbItem)
        expect(verbItems.length).toBe(2)
    })

})
