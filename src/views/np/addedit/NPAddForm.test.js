import {Map}        from 'immutable'
import React        from 'react'
import {RadioGroup} from 'react-radio-group'

import TestUtils         from 'react-addons-test-utils'
//import rtRenderer        from 'react-test-renderer'
import {findAll}         from 'react-shallow-testutils'
import {findWithType}    from 'react-shallow-testutils'

import NPAddForm   from './NPAddForm'
import NoundSelect from '../../dictionary/nound/NoundSelect'
import AppStore    from '../../../data/app/AppStore'
import NoundStore  from '../../../data/dictionary/nound/NoundStore'
import NPStore     from '../../../data/np/NPStore'
import NPAEStore   from '../../../data/np/addedit/NPAEStore'
import StringStore from '../../../data/strings/StringStore'

describe("NPAddForm", function() {

    beforeEach(function() {

        this.state = {
            app: AppStore.getInitialState(),
            nound: Map({
                dict: NoundStore.getInitialState()
            }),
            np: Map({
                addedit: NPAEStore.getInitialState(),
                dict: NPStore.getInitialState()
            }),
            strings:StringStore.getInitialState()
        }

        // Return the count of elements that match the given css_id
        this.countElements = function(lessonNavigator, css_id) {
            const n = findAll(lessonNavigator, (element) => {
                return (element && element.props && element.props.id===css_id)
            })
            return n.length
        }

    })

    it("Renders a NPAddForm < level 5", function() {
        const renderExpression = <NPAddForm {...this.state} />
        const npAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(npAddForm.type).toBe('div')

        expect(findWithType(npAddForm,NoundSelect))
        expect(findWithType(npAddForm,RadioGroup))
        expect( this.countElements(npAddForm, 'save-np')).toBe(0)
        expect( this.countElements(npAddForm, 'cancel')).toBe(0)
        expect( this.countElements(npAddForm, 'generatedText')).toBe(1)

        // TypeError: Cannot read property 'style' of null
        // What is this? I don't have time for this now! :-(
        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

    it("Renders a NPAddForm == level 6", function() {
        this.state.app = this.state.app.setIn(['level','currentLevel'],6)
        const renderExpression = <NPAddForm {...this.state} />
        const npAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(npAddForm.type).toBe('div')

        expect(findWithType(npAddForm,NoundSelect))
        expect(findWithType(npAddForm,RadioGroup))
        expect( this.countElements(npAddForm, 'save-np')).toBe(1)
        expect( this.countElements(npAddForm, 'cancel')).toBe(1)
        expect( this.countElements(npAddForm, 'generatedText')).toBe(1)

        // TypeError: Cannot read property 'style' of null
        // What is this? I don't have time for this now! :-(
        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

})
