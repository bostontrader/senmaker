import {Map, OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import AppActionTypes from '../../../../data/app/AppActionTypes'
import AppStore from '../../../../data/app/AppStore'
import StringStore from '../../../../data/strings/StringStore'
import AdjectivAEStore from '../../../../data/dictionary/adjectivd/addedit/AdjectivdAEStore'
import AdjectivEditForm from './AdjectivdEditForm'

describe("AdjectivEditForm", () => {

    it("Renders a AdjectivdPanelLevel.BASE AdjectivdEditForm", () => {
        //const appState = AppStore.getInitialState()
        //const props = {level: appState, editingAdjectiv:{base: 'cat'}}
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const strings = StringStore.getInitialState()
        const props = {
            level:newState.get('level'),
            adjectivd: Map({
                addEditAdjectivd: AdjectivAEStore.getInitialState(),
                adjectivs: OrderedMap()
            }),
            strings:strings
        }

        //const renderExpression = <AdjectivEditForm level={AdjectivdPanelLevel.BASE} editingAdjectiv={{base: 'cat'}}/>
        const renderExpression = <AdjectivEditForm {...props}/>

        const adjectivEditForm = TestUtils.createRenderer().render(renderExpression)
        expect(adjectivEditForm.type).toBe('div')
        //expect(adjectivEditForm.props.children.length).toBe(14)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a AdjectivdPanelLevel.PAST_TENSE AdjectivdEditForm", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const strings = StringStore.getInitialState()
        const props = {
            level:newState.get('level'),
            adjectivd: Map({
                addEditAdjectivd: AdjectivAEStore.getInitialState(),
                adjectivs: OrderedMap()
            }),
            strings:strings
        }
        
        const renderExpression = <AdjectivEditForm  {...props} />
        const adjectivEditForm = TestUtils.createRenderer().render(renderExpression)
        expect(adjectivEditForm.type).toBe('div')
        //expect(adjectivEditForm.props.children.length).toBe(6)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
