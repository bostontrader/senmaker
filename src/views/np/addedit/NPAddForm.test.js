import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import NPAddForm from './NPAddForm'
import NPAEStore from '../../../data/np/addedit/NPAEStore'
import StringStore  from '../../../data/strings/StringStore'
//import AppActionTypes from '../../../../data/app/AppActionTypes'
//import AppStore from '../../../../data/app/AppStore'
//import {NPPanelLevel} from '../../../../data/dictionary/np/NPConstants'

describe("NPAddForm", () => {

    it("Renders a NPPanelLevel.BASE NPAddForm", () => {
        const props = {
            np: Map({
                addedit: NPAEStore.getInitialState(),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <NPAddForm {...props} />
        const npAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(npAddForm.type).toBe('div')
        expect(npAddForm.props.children.length).toBe(4) // noun, input, save, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    /*it("Renders a NPPanelLevel.PAST_TENSE NPAddForm", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const strings = StringStore.getInitialState()
        const props = {
            level:newState.get('level'),
            np: Map({
                addedit: NPAEStore.getInitialState(),
                nouns: OrderedMap()
            }),
            strings:strings
        }
        const renderExpression = <NPAddForm {...props} />
        const npAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(npAddForm.type).toBe('div')
        //expect(npAddForm.props.children.length).toBe(5)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })*/

})
