import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import Verb from '../../data/verbs/Verb'
import VerbItem from './VerbItem'
import VerbPanel from './VerbPanel'

import {PastTenseRule, VerbPanelLevel} from '../../data/verbs/VerbConstants'

describe("VerbPanel", () => {

    let verbs

    beforeEach( () => {
        verbs = OrderedMap()
    })

    it("correctly renders a VerbPanelLevel.BASE VerbPanel", () => {
        const props = {level:{verbPanel:VerbPanelLevel.BASE}, editingVerb:{id:'', add:''}, verbs:OrderedMap()}
        const renderExpression = <VerbPanel {...props} />
        const verbPanel = TestUtils.createRenderer().render(renderExpression)
        expect(verbPanel.type).toBe('div')

        // Two columns in the thead
        //expect(verbPanel.props.children[0].props.children.props.children.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("renders a VerbPanelLevel.PAST_TENSE VerbPanel", () => {
        const props = {level:{verbPanel:VerbPanelLevel.BASE}, editingVerb:{id:'', add:''}, verbs:OrderedMap()}
        const renderExpression = <VerbPanel {...props} />
        const verbPanel = TestUtils.createRenderer().render(renderExpression)
        expect(verbPanel.type).toBe('div')

        // Three columns in the thead
        //expect(verbPanel.props.children[0].props.children.props.children.length).toBe(3)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
