import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import AdjectivdAddForm from './AdjectivdAddForm'
import AppActionTypes   from '../../../../data/app/AppActionTypes'
import AppStore         from '../../../../data/app/AppStore'
import AdjectivdAEStore from '../../../../data/dictionary/adjectivd/addedit/AdjectivdAEStore'
import StringStore      from '../../../../data/strings/StringStore'


describe("AdjectivdAddForm", () => {

    it("Renders a AdjectivdPanelLevel.BASE AdjectivdAddForm", () => {
        const props = {
            adjectivd: Map({
                addedit: AdjectivdAEStore.getInitialState(),
                adjectivs: Map()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <AdjectivdAddForm {...props} />
        const adjectivdAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(adjectivdAddForm.type).toBe('div')
        expect(adjectivdAddForm.props.children.length).toBe(4) // noun, input, save, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    /*it("Renders a AdjectivdPanelLevel.PAST_TENSE AdjectivdAddForm", () => {
        let newState = AppStore.getInitialState()
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        newState = AppStore.reduce(newState, {type: AppActionTypes.LEVEL_NEXT})
        const strings = StringStore.getInitialState()
        const props = {
            level:newState.get('level'),
            adjectivd: Map({
                addedit: AdjectivdAEStore.getInitialState(),
                adjectivs: OrderedMap()
            }),
            strings:strings
        }
        const renderExpression = <AdjectivdAddForm {...props} />
        const adjectivdAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(adjectivdAddForm.type).toBe('div')
        //expect(adjectivdAddForm.props.children.length).toBe(5)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })*/

})
