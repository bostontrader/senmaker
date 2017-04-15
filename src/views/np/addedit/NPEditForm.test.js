import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import NPEditForm from './NPEditForm'
import NPAEStore  from '../../../data/np/addedit/NPAEStore'
import StringStore   from '../../../data/strings/StringStore'

//import AppActionTypes from '../../../../data/app/AppActionTypes'
//import AppStore from '../../../../data/app/AppStore'
//import {NPPanelLevel} from '../../../../data/dictionary/np/NPConstants'

describe("NPEditForm", () => {

    it("Renders a NPPanelLevel.BASE NPEditForm", () => {
        const props = {
            np: Map({
                addedit: NPAEStore.getInitialState(),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }
        const renderExpression = <NPEditForm {...props}/>
        const nounEditForm = TestUtils.createRenderer().render(renderExpression)
        expect(nounEditForm.type).toBe('div')
        expect(nounEditForm.props.children.length).toBe(5) // noun, input, save, delete, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    /*it("Renders a NPPanelLevel.PAST_TENSE NPEditForm", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const strings = StringStore.getInitialState()
        const props = {
            np: Map({
                addedit: NounAEStore.getInitialState(),
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
