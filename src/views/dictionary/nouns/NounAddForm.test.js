import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import AppActionTypes from '../../../data/AppActionTypes'
import AppStore from '../../../data/AppStore'
import StringStore from '../../../data/StringStore'
import NounAddEditStore from '../../../data/dictionary/nouns/NounDictionaryItemAddEditStore'
import NounAddForm from './NounAddForm'
import {NounDictionaryItemPanelLevel} from '../../../data/dictionary/nouns/NounDictionaryItemConstants'

describe("NounAddForm", () => {

    it("Renders a NounDictionaryItemPanelLevel.BASE NounAddForm", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const strings = StringStore.getInitialState()
        const props = {level:newState, nouns: OrderedMap(), addEditNoun: NounAddEditStore.getInitialState(), strings:strings}

        const renderExpression = <NounAddForm {...props} />
        const nounAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(nounAddForm.type).toBe('div')
        //expect(nounAddForm.props.children.length).toBe(4)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a NounDictionaryItemPanelLevel.PAST_TENSE NounAddForm", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const strings = StringStore.getInitialState()
        const props = {level:newState, nouns: OrderedMap(), addEditNoun: NounAddEditStore.getInitialState(), strings:strings}
        const renderExpression = <NounAddForm {...props} />
        const nounAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(nounAddForm.type).toBe('div')
        //expect(nounAddForm.props.children.length).toBe(5)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
