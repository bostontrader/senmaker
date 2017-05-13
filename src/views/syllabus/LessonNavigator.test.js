import React from 'react'

import {findAll} from 'react-shallow-testutils'
import TestUtils from 'react-addons-test-utils'

import AppActionTypes from '../../data/app/AppActionTypes'
import AppStore       from '../../data/app/AppStore'
import QuizStore      from '../../data/quiz/QuizStore'
import StringStore    from '../../data/strings/StringStore'

import LessonNavigator from './LessonNavigator'

describe("LessonNavigator", function () {

    beforeEach(function() {
        // Always start with the initial state.
        this.state = {}
        this.state.app     = AppStore.getInitialState()
        this.state.quiz    = QuizStore.getInitialState()
        this.state.strings = StringStore.getInitialState()

        // This "dispatches" an action to our stores. We can bypass the dispatcher
        // and just call the store's reduce function directly.
        this.dispatch = action => {
            this.state.app   = AppStore .reduce(this.state.app, action)
            this.state.quiz  = QuizStore.reduce(this.state.quiz, action)
        }
    })

    // Return the count of elements that pass the test
    function countElements(lessonNavigator, css_id) {
        const n = findAll(lessonNavigator, (element) => {
            return (element && element.props && element.props.id===css_id)
        })
        return n.length
    }

    /**
     * Don't display both language flags.  Only display the flag to switch
     * to the language we're not using now.
     */
    it("It displays the proper flag.", function() {
        let renderExpression = <LessonNavigator {...this.state} />
        let lessonNavigator = TestUtils.createRenderer().render(renderExpression)
        // By default the language is zh, so only see the US flag.
        //expect( countElements(lessonNavigator, 'en_flag')).toBe(1)
        expect( countElements(lessonNavigator, 'zh_flag')).toBe(0)

        // Now switch to en.
        // Only see the Chinese flag.
        // Now switch to zh.
        // Only see the US flag.
    })

    // This is how we generate many different states for the nav buttons.
    it("Navigates completely through all lessons.", function() {

        // Starting fresh, force the first lesson to be passed.
        let currentLesson = this.state.app.getIn(['level','currentLesson'])
        this.state.quiz = this.state.quiz.setIn([currentLesson,'passed'],true)
        let renderExpression = <LessonNavigator {...this.state} />
        let lessonNavigator = TestUtils.createRenderer().render(renderExpression)
        expect(lessonNavigator.props.className).toBe("lesson-navigator")

        expect( countElements(lessonNavigator, 'lesson-previous')).toBe(0)
        expect( countElements(lessonNavigator, 'lesson-next')).toBe(1)
        expect( countElements(lessonNavigator, 'level-reset')).toBe(1)

        while(!this.state.app.getIn(['level','lastLesson'])) {

            this.dispatch({
                type: AppActionTypes.ON_CLICK_LESSON_NEXT
            })

            currentLesson = this.state.app.getIn(['level','currentLesson'])
            this.state.quiz = this.state.quiz.setIn([currentLesson,'passed'],true)

            renderExpression = <LessonNavigator {...this.state} />
            lessonNavigator = TestUtils.createRenderer().render(renderExpression)
            expect(lessonNavigator.props.className).toBe("lesson-navigator");

            expect( countElements(lessonNavigator, 'lesson-previous')).toBe(1)

            if (this.state.app.getIn(['level','lastLesson'])) {
                //expect( countElements(lessonNavigator, 'lesson-next')).toBe(0)
            }
            else
                expect( countElements(lessonNavigator, 'lesson-next')).toBe(1)

            expect( countElements(lessonNavigator, 'level-reset')).toBe(1)
        }
    })

})
