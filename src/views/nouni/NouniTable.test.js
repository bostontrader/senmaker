import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import {findAllWithType} from 'react-shallow-testutils'
import rtRenderer        from 'react-test-renderer'

import NouniRow   from './NouniRow'
import NouniTable from './NouniTable'

import AppStore             from '../../data/app/AppStore'
import {PluralizationRule}  from '../../data/dictionary/nound/NoundConstants'
import NouniActionTypes     from '../../data/nouni/NouniActionTypes'
import {DefinitenessSelect} from '../../data/nouni/NouniConstants'
import NouniStore           from '../../data/nouni/NouniStore'
import StringStore          from '../../data/strings/StringStore'

describe("NouniTable", function() {

    beforeEach(function() {
        this.state = {}
        this.state.app     = AppStore.getInitialState()
        this.state.strings = StringStore.getInitialState()
        this.state.nouni = Map({
            dict:NouniStore.getInitialState()
        })

        this.dispatch = action => {
            this.state.app   = AppStore .reduce(this.state.app, action)
            const n = NouniStore.reduce(this.state.nouni.get('dict'), action)
            this.state.nouni = this.state.nouni.set('dict',n)
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

    it("Renders a NouniTable", function() {
        const renderExpression = <NouniTable {...this.state} />
        const nouniTable = TestUtils.createRenderer().render(renderExpression)
        expect(nouniTable.type).toBe('table')

        // Two columns in the thead
        expect(nouniTable.props.children[0].props.children.props.children.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Will render one NouniRow", function() {
        this.dispatch({
            type: NouniActionTypes.INSERT_NOUNI,
            nouni: this.example0
        })
        
        const renderExpression = <NouniTable {...this.state} />
        const nouniTable = TestUtils.createRenderer().render(renderExpression)
        const nounItems = findAllWithType(nouniTable, NouniRow)
        expect(nounItems.length).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Will render two NouniRow", function() {
        this.dispatch({
            type: NouniActionTypes.INSERT_NOUNI,
            nouni: this.example0
        })

        this.dispatch({
            type: NouniActionTypes.INSERT_NOUNI,
            nouni: this.example1
        })

        const renderExpression = <NouniTable {...this.state} />
        const nouniTable = TestUtils.createRenderer().render(renderExpression)
        const nounItems = findAllWithType(nouniTable, NouniRow)
        expect(nounItems.length).toBe(2)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
