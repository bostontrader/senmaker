import React        from 'react'
import {RadioGroup} from 'react-radio-group'

import TestUtils         from 'react-addons-test-utils'
//import rtRenderer        from 'react-test-renderer'
import {findAll}         from 'react-shallow-testutils'
import {findWithType}    from 'react-shallow-testutils'

import VPEditForm    from './VPEditForm'
import VerbdSelect   from '../../dictionary/verbd/VerbdSelect'
import initialState  from '../../../data/StateGetter'

describe("VPEditForm", () => {

    beforeEach(function() {

        // Return the count of elements that match the given css_id
        this.countElements = function(lessonNavigator, css_id) {
            const n = findAll(lessonNavigator, (element) => {
                return (element && element.props && element.props.id===css_id)
            })
            return n.length
        }

    })

    it("Renders a VPEditForm", function() {
        const renderExpression = <VPEditForm {...initialState}/>
        const npEditForm = TestUtils.createRenderer().render(renderExpression)
        expect(npEditForm.type).toBe('div')
        expect(findWithType(npEditForm,VerbdSelect))
        expect(findWithType(npEditForm,RadioGroup))
        //expect( this.countElements(npEditForm, 'save-np')).toBe(1)
        //expect( this.countElements(npEditForm, 'cancel')).toBe(1)
        //expect( this.countElements(npEditForm, 'delete-np')).toBe(1)
        //expect( this.countElements(npEditForm, 'generatedText')).toBe(1)
        // Something wrong here. This stems from the <Select> in the <VPEditForm>
        // TypeError: Cannot read property 'style' of null
        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

})
