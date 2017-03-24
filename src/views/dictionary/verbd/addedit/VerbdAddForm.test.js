import {Map, OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import AppActionTypes from '../../../../data/AppActionTypes'
import AppStore from '../../../../data/AppStore'
import StringStore from '../../../../data/StringStore'
import VerbdAddForm from './VerbdAddForm'
import VerbdAEStore from '../../../../data/dictionary/verbd/addedit/VerbdAEStore'

describe("VerbdAddForm", () => {

    it("Renders a VerbPanelLevel.BASE VerbdAddForm", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const strings = StringStore.getInitialState()
        const props = {
            level:newState.get('level'),
            verbd: Map({
                addEditVerbd: VerbdAEStore.getInitialState(),
                verbs: OrderedMap()
            }),
            strings:strings
        }
        
        const renderExpression = <VerbdAddForm {...props} />
        const verbdAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbdAddForm.type).toBe('div')
        expect(verbdAddForm.props.children.length).toBe(4)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    /*it("Renders a VerbPanelLevel.PAST_TENSE VerbdAddForm", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const strings = StringStore.getInitialState()
        const props = {level:newState.get('level'), verbs: OrderedMap(), addEditVerb: VerbdAEStore.getInitialState(), strings:strings}

        const renderExpression = <VerbdAddForm {...props} />
        const verbdAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(verbdAddForm.type).toBe('div')
        expect(verbdAddForm.props.children.length).toBe(5)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })*/

})
