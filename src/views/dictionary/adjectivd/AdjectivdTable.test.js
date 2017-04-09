import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import AppActionTypes from '../../../data/app/AppActionTypes'
import AppStore       from '../../../data/app/AppStore'
import StringStore    from '../../../data/strings/StringStore'

import Adjectivd               from '../../../data/dictionary/adjectivd/Adjectivd'
import AdjectivdActionTypes    from '../../../data/dictionary/adjectivd/AdjectivdActionTypes'
import AdjectivdStore          from '../../../data/dictionary/adjectivd/AdjectivdStore'

import AdjectivdRow   from './AdjectivdRow'
import AdjectivdTable from './AdjectivdTable'

describe("AdjectivdTable", function() {

    beforeEach(function() {
        // Always start with the initial state.
        this.state = {}
        this.state.app     = AppStore.getInitialState()
        //this.state.quiz    = QuizStore.getInitialState()
        this.state.strings = StringStore.getInitialState()
        this.state.adjectivd = Map({
            adjectivs:AdjectivdStore.getInitialState()
        })

        // This "dispatches" an action to our stores. We can bypass the dispatcher
        // and just call the store's reduce function directly.
        this.dispatch = action => {
            this.state.app   = AppStore .reduce(this.state.app, action)
            //this.state.quiz  = QuizStore.reduce(this.state.quiz, action)
            const n = AdjectivdStore.reduce(this.state.adjectivd.get('adjectivs'), action)
            this.state.adjectivd = this.state.adjectivd.set('adjectivs',n)
        }
    })

    it("Renders a AdjectivdPanelLevel.BASE AdjectivdTable", function() {
        //let newState = {app: AppStore.getInitialState()}
        //newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        //const props = {
            //level:newState.get('level'),
            //adjectivd: Map({
                //adjectivs: OrderedMap()
            //})
        //}
        //const renderExpression = <AdjectivdTable {...props} />
        const renderExpression = <AdjectivdTable {...this.state} />

        const adjectivTable = TestUtils.createRenderer().render(renderExpression)
        expect(adjectivTable.type).toBe('table')

        // Two columns in the thead
        expect(adjectivTable.props.children[0].props.children.props.children.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    /*it("Renders a AdjectivdPanelLevel.PLURALIZATION AdjectivdTable", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        const props = {level:newState.get('level'), adjectivs: OrderedMap()}
        const renderExpression = <AdjectivdTable {...props} />
        const adjectivTable = TestUtils.createRenderer().render(renderExpression)
        expect(adjectivTable.type).toBe('table')

        // Three columns in the thead
        expect(adjectivTable.props.children[0].props.children.props.children.length).toBe(3)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })*/

    /*it("Will render zero AdjectivdRow", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        //newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        //newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        const props = {level:newState.get('level'), adjectivs: OrderedMap()}
        const renderExpression = <AdjectivdTable {...props} />
        const adjectivTable = TestUtils.createRenderer().render(renderExpression)
        const adjectivItems = findAllWithType(adjectivTable, AdjectivdRow)
        expect(adjectivItems.length).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })*/

    it("Will render one AdjectivdRow", function() {
        this.dispatch({
            type: AppActionTypes.ON_LESSON_NEXT
        })

        this.dispatch({
            type: AdjectivdActionTypes.INSERT_ADJECTIVD,
            adjectivd: {
                base: 'cat'
            }
        })
        
        const renderExpression = <AdjectivdTable {...this.state} />
        const adjectivTable = TestUtils.createRenderer().render(renderExpression)
        const adjectivItems = findAllWithType(adjectivTable, AdjectivdRow)
        expect(adjectivItems.length).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Will render two AdjectivdRow", function() {
        /*let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})

        const adjectivs = OrderedMap().set(1, new Adjectivd({
            id: 1,
            base: 'cat',
            plural: 'cats',
            pluralization_rule: PluralizationRule.Append_s
        })).set(2, new Adjectivd({
            id: 2,
            base: 'box',
            plural: 'boxes',
            pluralization_rule: PluralizationRule.Append_es
        }))*/






        //const strings = StringStore.getInitialState()
        //const props = {level:newState.get('level'), adjectivs: adjectivs, strings: strings}


        this.dispatch({
            type: AppActionTypes.ON_LESSON_NEXT
        })

        this.dispatch({
            type: AdjectivdActionTypes.INSERT_ADJECTIVD,
            adjectivd: {
                base: 'fat'
            }
        })

        this.dispatch({
            type: AdjectivdActionTypes.INSERT_ADJECTIVD,
            adjectivd: {
                base: 'lazy'
            }
        })

        const renderExpression = <AdjectivdTable {...this.state} />
        const adjectivTable = TestUtils.createRenderer().render(renderExpression)
        const adjectivItems = findAllWithType(adjectivTable, AdjectivdRow)
        expect(adjectivItems.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
