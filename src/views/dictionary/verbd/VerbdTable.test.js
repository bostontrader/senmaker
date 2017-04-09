import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import VerbdRow   from './VerbdRow'
import VerbdTable from './VerbdTable'

//import AppActionTypes from '../../../data/app/AppActionTypes'
import AppStore       from '../../../data/app/AppStore'
import StringStore    from '../../../data/strings/StringStore'

//import Verbd            from '../../../data/dictionary/verbd/Verbd'
import {PastTenseRule}  from '../../../data/dictionary/verbd/VerbdConstants'
import VerbdActionTypes from '../../../data/dictionary/verbd/VerbdActionTypes'
import VerbdStore       from '../../../data/dictionary/verbd/VerbdStore'

describe("VerbdTable", function() {

    beforeEach(function() {
        this.state = {}
        this.state.app     = AppStore.getInitialState()
        this.state.strings = StringStore.getInitialState()
        this.state.verbd = Map({
            verbs:VerbdStore.getInitialState()
        })

        this.dispatch = action => {
            this.state.app   = AppStore .reduce(this.state.app, action)
            const n = VerbdStore.reduce(this.state.verbd.get('verbs'), action)
            this.state.verbd = this.state.verbd.set('verbs',n)
        }
    })

    it("Renders a VerbdPanelLevel.BASE VerbdTable", function() {
        const renderExpression = <VerbdTable {...this.state} />
        const verbTable = TestUtils.createRenderer().render(renderExpression)
        expect(verbTable.type).toBe('table')

        // Two columns in the thead
        expect(verbTable.props.children[0].props.children.props.children.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    /*it("Renders a VerbdPanelLevel.PAST_TENSE VerbdTable", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})

        const props = {level:newState.get('level'), verbs: OrderedMap()}
        const renderExpression = <VerbdTable {...props} />
        const verbTable = TestUtils.createRenderer().render(renderExpression)
        expect(verbTable.type).toBe('table')

        // Three columns in the thead
        expect(verbTable.props.children[0].props.children.props.children.length).toBe(3)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Will render zero VerbdRow", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})

        const props = {level:newState.get('level'), verbs: OrderedMap()}
        const renderExpression = <VerbdTable {...props} />
        const verbTable = TestUtils.createRenderer().render(renderExpression)
        const verbItems = findAllWithType(verbTable, VerbdRow)
        expect(verbItems.length).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })*/

    it("Will render one VerbdRow", function() {
        this.dispatch({
            type: VerbdActionTypes.INSERT_VERBD,
            verbd: {
                base: 'talk',
                pastTense: 'talked',
                pastTense_rule: PastTenseRule.Append_ed
            }
        })

        const renderExpression = <VerbdTable {...this.state} />
        const verbTable = TestUtils.createRenderer().render(renderExpression)
        const verbItems = findAllWithType(verbTable, VerbdRow)
        expect(verbItems.length).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Will render two VerbdRow", function() {
        this.dispatch({
            type: VerbdActionTypes.INSERT_VERBD,
            verbd: {
                base: 'talk',
                pastTense: 'talked',
                pastTense_rule: PastTenseRule.Append_ed
            }
        })

        this.dispatch({
            type: VerbdActionTypes.INSERT_VERBD,
            verbd: {
                base: 'talk',
                pastTense: 'talked',
                pastTense_rule: PastTenseRule.Append_ed
            }
        })

        const renderExpression = <VerbdTable {...this.state} />
        const verbTable = TestUtils.createRenderer().render(renderExpression)
        const verbItems = findAllWithType(verbTable, VerbdRow)
        expect(verbItems.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
