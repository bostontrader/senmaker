import {OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import AppActionTypes from '../../data/AppActionTypes'
import AppStore from '../../data/AppStore'
import NounAddEditStore from '../../data/nouns/NounAddEditStore'
import NounEditForm from './NounEditForm'
import {NounPanelLevel} from '../../data/nouns/NounConstants'

describe("NounEditForm", () => {

    it("Renders a NounPanelLevel.BASE NounEditForm", () => {
        //const appState = AppStore.getInitialState()
        //const props = {level: appState, editingNoun:{base: 'cat'}}
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const props = {level:newState, nouns: OrderedMap(), addEditNoun: NounAddEditStore.getInitialState()}

        //const renderExpression = <NounEditForm level={NounPanelLevel.BASE} editingNoun={{base: 'cat'}}/>
        const renderExpression = <NounEditForm {...props}/>

        const nounEditForm = TestUtils.createRenderer().render(renderExpression)
        expect(nounEditForm.type).toBe('div')
        //expect(nounEditForm.props.children.length).toBe(14)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a NounPanelLevel.PAST_TENSE NounEditForm", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        console.log('NounEditForm.test',newState)
        expect(true)
        const props = {level:newState, nouns: OrderedMap(), addEditNoun: NounAddEditStore.getInitialState()}
        
        const renderExpression = <NounEditForm  {...props} />
        const nounEditForm = TestUtils.createRenderer().render(renderExpression)
        expect(nounEditForm.type).toBe('div')
        //expect(nounEditForm.props.children.length).toBe(6)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
