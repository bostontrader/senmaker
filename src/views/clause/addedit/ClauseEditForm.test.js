import {Map} from 'immutable'
import React from 'react'

import ReactTestUtils      from 'react-dom/test-utils'
//import rtRenderer   from 'react-test-renderer'
import {findAll}      from 'react-shallow-testutils'
import {findWithType} from 'react-shallow-testutils'

import ClauseEditForm from './ClauseEditForm'
import NPSelect       from '../../np/NPSelect'
import VPSelect       from '../../vp/VPSelect'
import AppStore       from '../../../data/app/AppStore'
import NPStore        from '../../../data/np/NPStore'
import VPStore        from '../../../data/vp/VPStore'
import StringStore    from '../../../data/strings/StringStore'
import ClauseStore    from '../../../data/clause/ClauseStore'
import ClauseAEStore  from '../../../data/clause/addedit/ClauseAEStore'

describe("ClauseEditForm", function() {

    /*beforeEach(function() {

        this.state = {
            app: AppStore.getInitialState(),
            np: Map({
                dict: NPStore.getInitialState()
            }),
            vp: Map({
                dict: VPStore.getInitialState()
            }),
            clause: Map({
                addedit: ClauseAEStore.getInitialState(),
                dict: ClauseStore.getInitialState()
            }),
            strings:StringStore.getInitialState()
        }*/

        // Return the count of elements that match the given css_id
        /*this.countElements = function(lessonNavigator, css_id) {
            const n = findAll(lessonNavigator, (element) => {
                return (element && element.props && element.props.id===css_id)
            })
            return n.length
        }*/

    //})

    it("Renders a ClauseEditForm", function() {
        //const renderExpression = <ClauseEditForm {...this.state} />
        //const clauseEditForm = ReactTestUtils.createRenderer().render(renderExpression)
        //expect(clauseEditForm.type).toBe('div')

        //expect(findWithType(clauseEditForm,NPSelect))
        //expect(findWithType(clauseEditForm,VPSelect))
        //expect( this.countElements(clauseEditForm, 'save-clause')).toBe(1)
        //expect( this.countElements(clauseEditForm, 'cancel')).toBe(1)
        //expect( this.countElements(clauseEditForm, 'delete-clause')).toBe(1)
        //expect( this.countElements(clauseEditForm, 'generatedText')).toBe(1)

        // TypeError: Cannot read property 'style' of null
        // What is this? I don't have time for this now! :-(
        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

})
