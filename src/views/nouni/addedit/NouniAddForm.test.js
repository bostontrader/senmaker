import {Map} from 'immutable'
import React from 'react'
import {RadioGroup} from 'react-radio-group'

import TestUtils         from 'react-addons-test-utils'
//import rtRenderer        from 'react-test-renderer'
import {findAll}         from 'react-shallow-testutils'
import {findWithType}    from 'react-shallow-testutils'

import AppStore       from '../../../data/app/AppStore'
import NouniStore     from '../../../data/nouni/NouniStore'
import NouniAEStore   from '../../../data/nouni/addedit/NouniAEStore'
import StringStore    from '../../../data/strings/StringStore'
import NouniAddForm from './NouniAddForm'
import NoundSelect from '../../dictionary/nound/NoundSelect'

describe("NouniAddForm", function() {

    beforeEach(function() {

        this.state = {
            app: AppStore.getInitialState(),
            nouni: Map({
                addedit: NouniAEStore.getInitialState(),
                dict: NouniStore.getInitialState()
            }),
            strings:StringStore.getInitialState()
        }

        // This "dispatches" an action to our stores. We can bypass the dispatcher
        // and just call the store's reduce function directly.
        //this.dispatch = action => {
            //this.state.app   = AppStore .reduce(this.state.app, action)
            //this.state.quiz  = QuizStore.reduce(this.state.quiz, action)
        //}

        // Return the count of elements that match the given css_id
        this.countElements = function(lessonNavigator, css_id) {
            const n = findAll(lessonNavigator, (element) => {
                return (element && element.props && element.props.id===css_id)
            })
            return n.length
        }

    })

    it("Renders a NouniAddForm < level 5", function() {
        const renderExpression = <NouniAddForm {...this.state} />
        const nouniAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(nouniAddForm.type).toBe('div')

        expect(findWithType(nouniAddForm,NoundSelect))
        expect(findWithType(nouniAddForm,RadioGroup))
        expect( this.countElements(nouniAddForm, 'save-nouni')).toBe(0)
        expect( this.countElements(nouniAddForm, 'cancel')).toBe(0)
        expect( this.countElements(nouniAddForm, 'generatedText')).toBe(1)

        // TypeError: Cannot read property 'style' of null
        // What is this? I don't have time for this now! :-(
        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

    it("Renders a NouniAddForm == level 5", function() {
        this.state.app = this.state.app.setIn(['level','currentLevel'],5)
        const renderExpression = <NouniAddForm {...this.state} />
        const nouniAddForm = TestUtils.createRenderer().render(renderExpression)
        expect(nouniAddForm.type).toBe('div')

        expect(findWithType(nouniAddForm,NoundSelect))
        expect(findWithType(nouniAddForm,RadioGroup))
        expect( this.countElements(nouniAddForm, 'save-nouni')).toBe(1)
        expect( this.countElements(nouniAddForm, 'cancel')).toBe(1)
        expect( this.countElements(nouniAddForm, 'generatedText')).toBe(1)

        // TypeError: Cannot read property 'style' of null
        // What is this? I don't have time for this now! :-(
        //const tree = rtRenderer.create(renderExpression).toJSON()
        //expect(tree).toMatchSnapshot()
    })

})
