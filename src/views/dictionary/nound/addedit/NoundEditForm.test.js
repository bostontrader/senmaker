import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import NoundEditForm from './NoundEditForm'
import NoundAEStore  from '../../../../data/dictionary/nound/addedit/NoundAEStore'
import StringStore   from '../../../../data/strings/StringStore'

//import AppActionTypes from '../../../../data/app/AppActionTypes'
//import AppStore from '../../../../data/app/AppStore'
//import {NoundPanelLevel} from '../../../../data/dictionary/nound/NoundConstants'

describe("NoundEditForm", () => {

    it("Renders a NoundPanelLevel.BASE NoundEditForm", () => {
        const props = {
            nound: Map({
                addEditNound: NoundAEStore.getInitialState(),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }
        const renderExpression = <NoundEditForm {...props}/>
        const nounEditForm = TestUtils.createRenderer().render(renderExpression)
        expect(nounEditForm.type).toBe('div')
        expect(nounEditForm.props.children.length).toBe(5) // noun, input, save, delete, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    /*it("Renders a NoundPanelLevel.PAST_TENSE NoundEditForm", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const strings = StringStore.getInitialState()
        const props = {
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
    })*/

})
