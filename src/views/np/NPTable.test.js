import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

//import NPRow   from './NPRow'
import NPTable from './NPTable'

//import AppActionTypes from '../../../data/app/AppActionTypes'
import AppStore       from '../../data/app/AppStore'
import StringStore    from '../../data/strings/StringStore'

//import NP               from '../../../data/dictionary/np/NP'
import NPActionTypes    from '../../data/np/NPActionTypes'
import NPStore          from '../../data/np/NPStore'

describe("NPTable", function() {

    beforeEach(function() {
        this.state = {}
        this.state.app     = AppStore.getInitialState()
        this.state.strings = StringStore.getInitialState()
        this.state.np = Map({
            nps:NPStore.getInitialState()
        })

        this.dispatch = action => {
            //this.state.app   = AppStore .reduce(this.state.app, action)
            //const n = NPStore.reduce(this.state.np.get('nps'), action)
            //this.state.np = this.state.np.set('nps',n)
        }
    })

    it("Renders a NPPanelLevel.BASE NPTable", function() {
        const renderExpression = <NPTable {...this.state} />
        const npTable = TestUtils.createRenderer().render(renderExpression)
        expect(npTable.type).toBe('table')

        // Two columns in the thead
        expect(npTable.props.children[0].props.children.props.children.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    /*it("Renders a NPPanelLevel.PLURALIZATION NPTable", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        const props = {level:newState.get('level'), nps: OrderedMap()}
        const renderExpression = <NPTable {...props} />
        const npTable = TestUtils.createRenderer().render(renderExpression)
        expect(npTable.type).toBe('table')

        // Three columns in the thead
        expect(npTable.props.children[0].props.children.props.children.length).toBe(3)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })*/

    /*it("Will render zero NPRow", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        //newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        //newState = AppStore.reduce(newState, {type: AppActionTypes.ON_LESSON_NEXT})
        const props = {level:newState.get('level'), nps: OrderedMap()}
        const renderExpression = <NPTable {...props} />
        const npTable = TestUtils.createRenderer().render(renderExpression)
        const npItems = findAllWithType(npTable, NPRow)
        expect(npItems.length).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })*/





    /*it("Will render one NPRow", function() {
        this.dispatch({
            type: NPActionTypes.INSERT_NP,
            np: {
                base: 'cat',
                plural: 'cats',
                pluralization_rule: PluralizationRule.Append_s
            }
        })
        
        const renderExpression = <NPTable {...this.state} />
        const npTable = TestUtils.createRenderer().render(renderExpression)
        const npItems = findAllWithType(npTable, NPRow)
        expect(npItems.length).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Will render two NPRow", function() {
        this.dispatch({
            type: NPActionTypes.INSERT_NP,
            np: {
                base: 'cat',
                plural: 'cats',
                pluralization_rule: PluralizationRule.Append_s
            }
        })

        this.dispatch({
            type: NPActionTypes.INSERT_NP,
            np: {
                base: 'box',
                plural: 'boxes',
                pluralization_rule: PluralizationRule.Append_es
            }
        })

        const renderExpression = <NPTable {...this.state} />
        const npTable = TestUtils.createRenderer().render(renderExpression)
        const npItems = findAllWithType(npTable, NPRow)
        expect(npItems.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })*/

})
