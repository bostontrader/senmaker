import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import NouniRow   from './NouniRow'
import NouniTable from './NouniTable'

//import AppActionTypes from '../../../data/app/AppActionTypes'
import AppStore       from '../../data/app/AppStore'
import StringStore    from '../../data/strings/StringStore'

//import Nouni               from '../../../data/dictionary/nouni/Nouni'
import NouniActionTypes    from '../../data/nouni/NouniActionTypes'
import {PluralizationRule} from '../../data/nouni/NouniConstants'
import NouniStore          from '../../data/nouni/NouniStore'

describe("NouniTable", function() {

    beforeEach(function() {
        this.state = {}
        this.state.app     = AppStore.getInitialState()
        this.state.strings = StringStore.getInitialState()
        this.state.nouni = Map({
            nouns:NouniStore.getInitialState()
        })

        this.dispatch = action => {
            this.state.app   = AppStore .reduce(this.state.app, action)
            const n = NouniStore.reduce(this.state.nouni.get('nouns'), action)
            this.state.nouni = this.state.nouni.set('nouns',n)
        }
    })

    it("Renders a NouniPanelLevel.BASE NouniTable", function() {
        const renderExpression = <NouniTable {...this.state} />
        const nounTable = TestUtils.createRenderer().render(renderExpression)
        expect(nounTable.type).toBe('table')

        // Two columns in the thead
        expect(nounTable.props.children[0].props.children.props.children.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    /*it("Renders a NouniPanelLevel.PLURALIZATION NouniTable", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        const props = {level:newState.get('level'), nouns: OrderedMap()}
        const renderExpression = <NouniTable {...props} />
        const nounTable = TestUtils.createRenderer().render(renderExpression)
        expect(nounTable.type).toBe('table')

        // Three columns in the thead
        expect(nounTable.props.children[0].props.children.props.children.length).toBe(3)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })*/

    /*it("Will render zero NouniRow", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        //newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        //newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        const props = {level:newState.get('level'), nouns: OrderedMap()}
        const renderExpression = <NouniTable {...props} />
        const nounTable = TestUtils.createRenderer().render(renderExpression)
        const nounItems = findAllWithType(nounTable, NouniRow)
        expect(nounItems.length).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })*/





    /*it("Will render one NouniRow", function() {
        this.dispatch({
            type: NouniActionTypes.INSERT_NOUNI,
            nouni: {
                base: 'cat',
                plural: 'cats',
                pluralization_rule: PluralizationRule.Append_s
            }
        })
        
        const renderExpression = <NouniTable {...this.state} />
        const nounTable = TestUtils.createRenderer().render(renderExpression)
        const nounItems = findAllWithType(nounTable, NouniRow)
        expect(nounItems.length).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Will render two NouniRow", function() {
        this.dispatch({
            type: NouniActionTypes.INSERT_NOUNI,
            nouni: {
                base: 'cat',
                plural: 'cats',
                pluralization_rule: PluralizationRule.Append_s
            }
        })

        this.dispatch({
            type: NouniActionTypes.INSERT_NOUNI,
            nouni: {
                base: 'box',
                plural: 'boxes',
                pluralization_rule: PluralizationRule.Append_es
            }
        })

        const renderExpression = <NouniTable {...this.state} />
        const nounTable = TestUtils.createRenderer().render(renderExpression)
        const nounItems = findAllWithType(nounTable, NouniRow)
        expect(nounItems.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })*/

})
