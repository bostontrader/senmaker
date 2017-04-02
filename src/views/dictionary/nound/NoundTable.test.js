import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import AppActionTypes from '../../../data/AppActionTypes'
import AppStore       from '../../../data/AppStore'
import StringStore    from '../../../data/StringStore'

import Nound               from '../../../data/dictionary/nound/Nound'
import NoundActionTypes    from '../../../data/dictionary/nound/NoundActionTypes'
import NoundStore          from '../../../data/dictionary/nound/NoundStore'
import {PluralizationRule} from '../../../data/dictionary/nound/NoundConstants'

import NoundRow   from './NoundRow'
import NoundTable from './NoundTable'

describe("NoundTable", function() {

    beforeEach(function() {
        // Always start with the initial state.
        this.state = {}
        this.state.app     = AppStore.getInitialState()
        //this.state.quiz    = QuizStore.getInitialState()
        this.state.strings = StringStore.getInitialState()
        this.state.nound = Map({
            nouns:NoundStore.getInitialState()
        })

        // This "dispatches" an action to our stores. We can bypass the dispatcher
        // and just call the store's reduce function directly.
        this.dispatch = action => {
            this.state.app   = AppStore .reduce(this.state.app, action)
            //this.state.quiz  = QuizStore.reduce(this.state.quiz, action)
            const n = NoundStore.reduce(this.state.nound.get('nouns'), action)
            this.state.nound = this.state.nound.set('nouns',n)
        }
    })

    it("Renders a NoundPanelLevel.BASE NoundTable", function() {
        //let newState = {app: AppStore.getInitialState()}
        //newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        //const props = {
            //level:newState.get('level'),
            //nound: Map({
                //nouns: OrderedMap()
            //})
        //}
        //const renderExpression = <NoundTable {...props} />
        const renderExpression = <NoundTable {...this.state} />

        const nounTable = TestUtils.createRenderer().render(renderExpression)
        expect(nounTable.type).toBe('table')

        // Two columns in the thead
        expect(nounTable.props.children[0].props.children.props.children.length).toBe(2)

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
        const nounTable = TestUtils.createRenderer().render(renderExpression)
        expect(nounTable.type).toBe('table')

        // Three columns in the thead
        expect(nounTable.props.children[0].props.children.props.children.length).toBe(3)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })*/

    /*it("Will render zero NoundRow", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        //newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        //newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        const props = {level:newState.get('level'), nouns: OrderedMap()}
        const renderExpression = <NoundTable {...props} />
        const nounTable = TestUtils.createRenderer().render(renderExpression)
        const nounItems = findAllWithType(nounTable, NoundRow)
        expect(nounItems.length).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })*/

    it("Will render one NoundRow", function() {
        this.dispatch({
            type: AppActionTypes.ON_LESSON_NEXT
        })

        this.dispatch({
            type: NoundActionTypes.INSERT_NOUND,
            nound: {
                base: 'cat',
                plural: 'cats',
                pluralization_rule: PluralizationRule.Append_s
            }
        })
        
        const renderExpression = <NoundTable {...this.state} />
        const nounTable = TestUtils.createRenderer().render(renderExpression)
        const nounItems = findAllWithType(nounTable, NoundRow)
        expect(nounItems.length).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Will render two NoundRow", function() {
        /*let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})

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
        }))*/






        //const strings = StringStore.getInitialState()
        //const props = {level:newState.get('level'), nouns: nouns, strings: strings}


        this.dispatch({
            type: AppActionTypes.ON_LESSON_NEXT
        })

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
        const nounTable = TestUtils.createRenderer().render(renderExpression)
        const nounItems = findAllWithType(nounTable, NoundRow)
        expect(nounItems.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
