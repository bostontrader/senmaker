import {Map, OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import AppActionTypes from '../../../data/AppActionTypes'
import AppStore       from '../../../data/AppStore'
import StringStore    from '../../../data/StringStore'

import {PastTenseRule}  from '../../../data/dictionary/verbd/VerbdConstants'
import Verbd            from '../../../data/dictionary/verbd/Verbd'
import VerbdActionTypes from '../../../data/dictionary/verbd/VerbdActionTypes'
import VerbdStore       from '../../../data/dictionary/verbd/VerbdStore'

import VerbdRow from './VerbdRow'
import VerbdTable from './VerbdTable'

describe("VerbdTable", function() {

    beforeEach(function() {
        // Always start with the initial state.
        this.state = {}
        this.state.app     = AppStore.getInitialState()
        //this.state.quiz    = QuizStore.getInitialState()
        this.state.strings = StringStore.getInitialState()
        this.state.verbd = Map({
            verbs:VerbdStore.getInitialState()
        })

        // This "dispatches" an action to our stores. We can bypass the dispatcher
        // and just call the store's reduce function directly.
        this.dispatch = action => {
            this.state.app   = AppStore .reduce(this.state.app, action)
            //this.state.quiz  = QuizStore.reduce(this.state.quiz, action)
            const n = VerbdStore.reduce(this.state.verbd.get('verbs'), action)
            this.state.verbd = this.state.verbd.set('verbs',n)
        }
    })

    it("Renders a VerbdPanelLevel.BASE VerbdTable", function() {
        //let newState = AppStore.getInitialState()
        //newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        //newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        //const props = {
            //level:newState.get('level'),
            //verbd: Map({
                //verbs: OrderedMap()
            //})
        //}
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
        //let newState = AppStore.getInitialState()
        //newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        //newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        //newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        //newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})

        //const verbs = OrderedMap().set(1, new Verbd({
            //id: 1,
            //base: 'talk',
            //pastTense: 'talked',
            //pastTense_rule: PastTenseRule.Append_ed
        //}))

        //const strings = StringStore.getInitialState()
        //const props = {level:newState.get('level'), verbs: verbs, strings: strings}

        //this.dispatch({
            //type: AppActionTypes.ON_LESSON_NEXT
        //})

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
        //let newState = AppStore.getInitialState()
        //newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        //newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        //newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        //newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})

        //const verbs = OrderedMap().set(1, new Verbd({
            //id: 1,
            //base: 'talk',
            //pastTense: 'talked',
            //pastTense_rule: PastTenseRule.Append_ed
        //})).set(2, new Verbd({
            //id: 2,
            //base: 'eat',
            //pastTense: 'ate',
            //pastTense_rule: PastTenseRule.Irregular
        //}))

        //const strings = StringStore.getInitialState()
        //const props = {level:newState.get('level'), verbs: verbs, strings: strings}

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
