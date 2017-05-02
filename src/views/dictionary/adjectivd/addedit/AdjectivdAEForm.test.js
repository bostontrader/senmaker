import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import rtRenderer        from 'react-test-renderer'

//import {AdjectivdPanelLevel} from '../../../../data/dictionary/adjectivd/AdjectivdConstants'
import AdjectivdAEForm       from './AdjectivdAEForm'
import AdjectivdAEStore      from '../../../../data/dictionary/adjectivd/addedit/AdjectivdAEStore'
import StringStore       from '../../../../data/strings/StringStore'

describe("AdjectivdEditForm", () => {

    it("Renders a AdjectivdAEForm, add mode", () => {
        const props = {
            adjectivd: Map({
                addedit: AdjectivdAEStore.getInitialState().setIn(['addAdjectivd'],true),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }

        const renderExpression = <AdjectivdAEForm {...props} />
        const adjectivdAEForm = TestUtils.createRenderer().render(renderExpression)
        expect(adjectivdAEForm.type).toBe('div')
        expect(adjectivdAEForm.props.children.length).toBe(2) // base controls, buttons
        expect(adjectivdAEForm.props.children[1].props.children.length).toBe(2) // save, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders a AdjectivdAEForm, edit mode", () => {
        const props = {
            adjectivd: Map({
                addedit: AdjectivdAEStore.getInitialState().setIn(['adjectivd','id'],'1'),
                nouns: Map()
            }),
            strings:StringStore.getInitialState()
        }
        const renderExpression = <AdjectivdAEForm {...props}/>
        const adjectivdAEForm = TestUtils.createRenderer().render(renderExpression)
        expect(adjectivdAEForm.type).toBe('div')
        expect(adjectivdAEForm.props.children.length).toBe(2) // base controls, buttons
        expect(adjectivdAEForm.props.children[1].props.children.length).toBe(3) // save, delete, cancel

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
