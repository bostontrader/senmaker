import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import AppActionTypes from '../../../data/AppActionTypes'
import AppStore from '../../../data/AppStore'
import StringStore from '../../../data/StringStore'
import NounAddEditStore from '../../../data/dictionary/nouns/NounDictionaryItemAddEditStore'
import NounEditForm from './NounEditForm'
import {NounDictionaryItemPanelLevel} from '../../../data/dictionary/nouns/NounDictionaryItemConstants'

describe("NounEditForm", () => {

    it("Renders a NounDictionaryItemPanelLevel.BASE NounEditForm", () => {
        //const appState = AppStore.getInitialState()
        //const props = {level: appState, editingNoun:{base: 'cat'}}
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const strings = StringStore.getInitialState()
        const props = {level:newState.get('level'), nouns: OrderedMap(), addEditNoun: NounAddEditStore.getInitialState(), strings:strings}

        //const renderExpression = <NounEditForm level={NounDictionaryItemPanelLevel.BASE} editingNoun={{base: 'cat'}}/>
        const renderExpression = <NounEditForm {...props}/>

        const nounEditForm = TestUtils.createRenderer().render(renderExpression)
        expect(nounEditForm.type).toBe('div')
        //expect(nounEditForm.props.children.length).toBe(14)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a NounDictionaryItemPanelLevel.PAST_TENSE NounEditForm", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const strings = StringStore.getInitialState()
        const props = {level:newState.get('level'), nouns: OrderedMap(), addEditNoun: NounAddEditStore.getInitialState(), strings:strings}
        
        const renderExpression = <NounEditForm  {...props} />
        const nounEditForm = TestUtils.createRenderer().render(renderExpression)
        expect(nounEditForm.type).toBe('div')
        //expect(nounEditForm.props.children.length).toBe(6)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
