import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import NPRow   from './NPRow'
import NPTable from './NPTable'

import AppStore             from '../../data/app/AppStore'
import {PluralizationRule}  from '../../data/dictionary/nound/NoundConstants'
import NP                   from '../../data/np/NP'
import NPActionTypes        from '../../data/np/NPActionTypes'
import {DefinitenessSelect} from '../../data/np/NPConstants'
import NPStore              from '../../data/np/NPStore'
import StringStore          from '../../data/strings/StringStore'

describe("NPTable", function() {

    beforeEach(function() {
        this.state = {}
        this.state.app     = AppStore.getInitialState()
        this.state.strings = StringStore.getInitialState()
        this.state.np = Map({
            dict:NPStore.getInitialState()
        })

        this.dispatch = action => {
            this.state.app   = AppStore .reduce(this.state.app, action)
            const n = NPStore.reduce(this.state.np.get('dict'), action)
            this.state.np = this.state.np.set('dict',n)
        }

        this.example0 = {
            nound: {id:'1', base: 'cat', plural: 'cats', pluralization_rule: PluralizationRule.Append_s},
            definiteness: DefinitenessSelect.Definite,
            generatedText: 'the cat'
        }
        this.example1 = {
            nound: {id:'2', base: 'box', plural: 'boxes', pluralization_rule: PluralizationRule.Append_es},
            definiteness: DefinitenessSelect.Indefinite,
            generatedText: 'a box'
        }
    })

    it("Renders a NPTable", function() {
        const renderExpression = <NPTable {...this.state} />
        const npTable = TestUtils.createRenderer().render(renderExpression)
        expect(npTable.type).toBe('table')

        // Two columns in the thead
        expect(npTable.props.children[0].props.children.props.children.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Will render one NPRow", function() {
        this.dispatch({type: NPActionTypes.INSERT_NP, np: NP(this.example0)})
        
        const renderExpression = <NPTable {...this.state} />
        const npTable = TestUtils.createRenderer().render(renderExpression)
        const nounItems = findAllWithType(npTable, NPRow)
        expect(nounItems.length).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Will render two NPRow", function() {
        this.dispatch({type: NPActionTypes.INSERT_NP, np: NP(this.example0)})
        this.dispatch({type: NPActionTypes.INSERT_NP, np: NP(this.example1)})

        const renderExpression = <NPTable {...this.state} />
        const npTable = TestUtils.createRenderer().render(renderExpression)
        const nounItems = findAllWithType(npTable, NPRow)
        expect(nounItems.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
