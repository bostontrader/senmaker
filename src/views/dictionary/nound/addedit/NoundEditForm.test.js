import {Map, OrderedMap} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import AppActionTypes from '../../../../data/AppActionTypes'
import AppStore from '../../../../data/AppStore'
import StringStore from '../../../../data/StringStore'
import NounAEStore from '../../../../data/dictionary/nound/addedit/NoundAEStore'
import NounEditForm from './NoundEditForm'
import {NoundPanelLevel} from '../../../../data/dictionary/nound/NoundConstants'

describe("NounEditForm", () => {

    it("Renders a NoundPanelLevel.BASE NoundEditForm", () => {
        //const appState = AppStore.getInitialState()
        //const props = {level: appState, editingNoun:{base: 'cat'}}
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const strings = StringStore.getInitialState()
        const props = {
            level:newState.get('level'),
            nound: Map({
                addEditNound: NounAEStore.getInitialState(),
                nouns: OrderedMap()
            }),
            strings:strings
        }

        //const renderExpression = <NounEditForm level={NoundPanelLevel.BASE} editingNoun={{base: 'cat'}}/>
        const renderExpression = <NounEditForm {...props}/>

        const nounEditForm = TestUtils.createRenderer().render(renderExpression)
        expect(nounEditForm.type).toBe('div')
        //expect(nounEditForm.props.children.length).toBe(14)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a NoundPanelLevel.PAST_TENSE NoundEditForm", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const strings = StringStore.getInitialState()
        const props = {
            level:newState.get('level'),
            nound: Map({
                addEditNound: NounAEStore.getInitialState(),
                nouns: OrderedMap()
            }),
            strings:strings
        }
        
        const renderExpression = <NounEditForm  {...props} />
        const nounEditForm = TestUtils.createRenderer().render(renderExpression)
        expect(nounEditForm.type).toBe('div')
        //expect(nounEditForm.props.children.length).toBe(6)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
