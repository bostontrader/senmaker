import React from 'react'

import {findAll} from 'react-shallow-testutils'
import TestUtils from 'react-addons-test-utils'

import AppActionTypes from '../../data/AppActionTypes'
import AppStore       from '../../data/AppStore'
import QuizStore      from '../../data/quiz/QuizStore'
import StringStore    from '../../data/StringStore'

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

    // Return the count of buttons that pass the test
    function look4Button(lessonNavigator, css_id) {
        const n = findAll(lessonNavigator, (element) => {
            return (element && element.props && element.props.id===css_id)
        })
        return n.length
    }

    // This is how we generate many different states for the nav buttons.
    it("Navigates completely through all lessons.", function() {

        // Starting fresh, force the first lesson to be passed.
        let currentLesson = this.state.app.getIn(['level','currentLesson'])
        this.state.quiz = this.state.quiz.setIn([currentLesson,'passed'],true)
        let renderExpression = <LessonNavigator {...this.state} />
        let lessonNavigator = TestUtils.createRenderer().render(renderExpression)
        expect(lessonNavigator.props.className).toBe("lesson-navigator")

        expect( look4Button(lessonNavigator, 'lesson-previous')).toBe(0)
        expect( look4Button(lessonNavigator, 'lesson-next')).toBe(1)
        expect( look4Button(lessonNavigator, 'level-reset')).toBe(1)

        while(!this.state.app.getIn(['level','lastLesson'])) {

            this.dispatch({
                type: AppActionTypes.ON_LESSON_NEXT
            })

            currentLesson = this.state.app.getIn(['level','currentLesson'])
            this.state.quiz = this.state.quiz.setIn([currentLesson,'passed'],true)

            renderExpression = <LessonNavigator {...this.state} />
            lessonNavigator = TestUtils.createRenderer().render(renderExpression)
            expect(lessonNavigator.props.className).toBe("lesson-navigator");

            expect( look4Button(lessonNavigator, 'lesson-previous')).toBe(1)

            if (this.state.app.getIn(['level','lastLesson'])) {
                expect( look4Button(lessonNavigator, 'lesson-next')).toBe(0)
            }
            else
                expect( look4Button(lessonNavigator, 'lesson-next')).toBe(1)

            expect( look4Button(lessonNavigator, 'level-reset')).toBe(1)
        }
    })

})
