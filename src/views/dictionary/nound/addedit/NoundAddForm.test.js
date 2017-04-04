import {Map, OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import AppActionTypes from '../../../../data/app/AppActionTypes'
import AppStore from '../../../../data/app/AppStore'
import StringStore from '../../../../data/strings/StringStore'
import NoundAEStore from '../../../../data/dictionary/nound/addedit/NoundAEStore'
import NoundAddForm from './NoundAddForm'
import {NoundPanelLevel} from '../../../../data/dictionary/nound/NoundConstants'

describe("NoundAddForm", () => {

    it("Renders a NoundPanelLevel.BASE NoundAddForm", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const strings = StringStore.getInitialState()
        const props = {
            level:newState.get('level'),
            nound: Map({
                addEditNound: NoundAEStore.getInitialState(),
                nouns: OrderedMap()
            }),
            strings:strings
        }

        const renderExpression = <NoundAddForm {...props} />
        const noundAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(noundAddForm.type).toBe('div')
        //expect(noundAddForm.props.children.length).toBe(4)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    /*it("Renders a NoundPanelLevel.PAST_TENSE NoundAddForm", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const strings = StringStore.getInitialState()
        const props = {
            level:newState.get('level'),
            nound: Map({
                addEditNound: NoundAEStore.getInitialState(),
                nouns: OrderedMap()
            }),
            strings:strings
        }
        const renderExpression = <NoundAddForm {...props} />
        const noundAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(noundAddForm.type).toBe('div')
        //expect(noundAddForm.props.children.length).toBe(5)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })*/

})
