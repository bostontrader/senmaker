import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import NoundRow   from './NoundRow'
import NoundTable from './NoundTable'

import AppStore            from '../../../data/app/AppStore'
import NoundActionTypes    from '../../../data/dictionary/nound/NoundActionTypes'
import {PluralizationRule} from '../../../data/dictionary/nound/NoundConstants'
import NoundStore          from '../../../data/dictionary/nound/NoundStore'
import StringStore         from '../../../data/strings/StringStore'

describe("NoundTable", function() {

    beforeEach(function() {
        this.state = {}
        this.state.app     = AppStore.getInitialState()
        this.state.strings = StringStore.getInitialState()
        this.state.nound = Map({
            dict:NoundStore.getInitialState()
        })

        this.dispatch = action => {
            this.state.app   = AppStore .reduce(this.state.app, action)
            const n = NoundStore.reduce(this.state.nound.get('dict'), action)
            this.state.nound = this.state.nound.set('dict',n)
        }
    })

    it("Renders a NoundPanelLevel.BASE NoundTable", function() {
        const renderExpression = <NoundTable {...this.state} />
        const noundTable = TestUtils.createRenderer().render(renderExpression)
        expect(noundTable.type).toBe('table')

        // Two columns in the thead
        expect(noundTable.props.children[0].props.children.props.children.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    /*it("Renders a NoundPanelLevel.PLURALIZATION NoundTable", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        const props = {level:newState.get('level'), nouns: OrderedMap()}
        const renderExpression = <NoundTable {...props} />
        const noundTable = TestUtils.createRenderer().render(renderExpression)
        expect(noundTable.type).toBe('table')

        // Three columns in the thead
        expect(noundTable.props.children[0].props.children.props.children.length).toBe(3)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })*/




    it("Will render one NoundRow", function() {
        this.dispatch({
            type: NoundActionTypes.INSERT_NOUND,
            nound: {
                base: 'cat',
                plural: 'cats',
                pluralization_rule: PluralizationRule.Append_s
            }
        })

        const renderExpression = <NoundTable {...this.state} />
        const noundTable = TestUtils.createRenderer().render(renderExpression)
        const nounItems = findAllWithType(noundTable, NoundRow)
        expect(nounItems.length).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Will render two NoundRow", function() {
        this.dispatch({
            type: NoundActionTypes.INSERT_NOUND,
            nound: {
                base: 'cat',
                plural: 'cats',
                pluralization_rule: PluralizationRule.Append_s
            }
        })

        this.dispatch({
            type: NoundActionTypes.INSERT_NOUND,
            nound: {
                base: 'box',
                plural: 'boxes',
                pluralization_rule: PluralizationRule.Append_es
            }
        })

        const renderExpression = <NoundTable {...this.state} />
        const noundTable = TestUtils.createRenderer().render(renderExpression)
        const nounItems = findAllWithType(noundTable, NoundRow)
        expect(nounItems.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
