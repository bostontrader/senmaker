import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

import AdjectivEditForm from './AdjectivdEditForm'
import AppActionTypes   from '../../../../data/app/AppActionTypes'
import AppStore         from '../../../../data/app/AppStore'
import AdjectivAEStore  from '../../../../data/dictionary/adjectivd/addedit/AdjectivdAEStore'
import StringStore      from '../../../../data/strings/StringStore'



describe("AdjectivEditForm", () => {

    it("Renders a AdjectivdPanelLevel.BASE AdjectivdEditForm", () => {
        const props = {
            adjectivd: Map({
                addedit: AdjectivAEStore.getInitialState(),
                adjectivs: Map()
            }),
            strings:StringStore.getInitialState()
        }
        const renderExpression = <AdjectivEditForm {...props}/>
        const adjectivEditForm = TestUtils.createRenderer().render(renderExpression)
        expect(adjectivEditForm.type).toBe('div')
        expect(adjectivEditForm.props.children.length).toBe(5) // noun, input, save, delete, cancel

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
                addedit: AdjectivAEStore.getInitialState(),
                adjectivs: Map()
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
