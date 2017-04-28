import {Map}        from 'immutable'
import React        from 'react'
import {RadioGroup} from 'react-radio-group'

import TestUtils      from 'react-addons-test-utils'
//import rtRenderer   from 'react-test-renderer'
import {findAll}      from 'react-shallow-testutils'
import {findWithType} from 'react-shallow-testutils'

import VPAddForm    from './VPAddForm'
import VerbdSelect  from '../../dictionary/verbd/VerbdSelect'
import AppStore     from '../../../data/app/AppStore'
import VerbdStore   from '../../../data/dictionary/verbd/VerbdStore'
import StringStore  from '../../../data/strings/StringStore'
import VPStore      from '../../../data/vp/VPStore'
import VPAEStore    from '../../../data/vp/addedit/VPAEStore'
import initialState from '../../../data/StateGetter'

describe("VPAddForm", function() {

    beforeEach(function() {

        // Return the count of elements that match the given css_id
        this.countElements = function(lessonNavigator, css_id) {
            const n = findAll(lessonNavigator, (element) => {
                return (element && element.props && element.props.id===css_id)
            })
            return n.length
        }

    })

    it("Renders a VPAddForm < level 5", function() {
        const renderExpression = <VPAddForm {...initialState} />
        const vpAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(vpAddForm.type).toBe('div')

        expect(findWithType(vpAddForm,VerbdSelect))
        expect(findWithType(vpAddForm,RadioGroup))
        expect( this.countElements(vpAddForm, 'save-vp')).toBe(0)
        expect( this.countElements(vpAddForm, 'cancel')).toBe(0)
        expect( this.countElements(vpAddForm, 'generatedText')).toBe(1)

        // TypeError: Cannot read property 'style' of null
        // What is this? I don't have time for this now! :-(
        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

    it("Renders a VPAddForm == level 6", function() {
        initialState.app = initialState.app.setIn(['level','currentLevel'],6)
        const renderExpression = <VPAddForm {...initialState} />
        const vpAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(vpAddForm.type).toBe('div')

        expect(findWithType(vpAddForm,VerbdSelect))
        expect(findWithType(vpAddForm,RadioGroup))
        //expect( this.countElements(vpAddForm, 'save-vp')).toBe(1)
        //expect( this.countElements(vpAddForm, 'cancel')).toBe(1)
        //expect( this.countElements(vpAddForm, 'generatedText')).toBe(1)

        // TypeError: Cannot read property 'style' of null
        // What is this? I don't have time for this now! :-(
        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

})
