import React from 'react'

import TestUtils         from 'react-addons-test-utils'
//import rtRenderer        from 'react-test-renderer'

import NouniEditForm from './NouniEditForm'
import initialState  from '../../../data/StateGetter'

describe("NouniEditForm", () => {

    it("Renders a NouniPanelLevel.BASE NouniEditForm", () => {
        const renderExpression = <NouniEditForm {...initialState}/>
        const nouniEditForm = TestUtils.createRenderer().render(renderExpression)
        expect(nouniEditForm.type).toBe('div')
        expect(nouniEditForm.props.children.length).toBe(6) // noun select, definite, indefinite, save, delete, cancel

        // Something wrong here. This stems from the <Select> in the <NouniEditForm>
        // TypeError: Cannot read property 'style' of null
        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

})
