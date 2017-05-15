import React from 'react'

import ReactTestUtils from 'react-dom/test-utils'
import {findAll}      from 'react-shallow-testutils'

import LessonNavigator from './LessonNavigator'
import {countWithId}   from '../../TestUtils'
import {langCode}      from '../../data/I18NConstants'
import AppActionTypes  from '../../data/app/AppActionTypes'
import AppStore        from '../../data/app/AppStore'
import QuizStore       from '../../data/quiz/QuizStore'
import StringStore     from '../../data/strings/StringStore'


describe("LessonNavigator", () => {

    let state

    const dispatch = action => {
        state.app   = AppStore .reduce(state.app, action)
        state.quiz  = QuizStore.reduce(state.quiz, action)
    }

    beforeEach(function() {
        // Always start with the initial state.
        state = {}
        state.app     = AppStore.getInitialState()
        state.quiz    = QuizStore.getInitialState()
        state.strings = StringStore.getInitialState()
    })

    // Return the count of elements that pass the test
    //function countElements(lessonNavigator, css_id) {
        //const n = findAll(lessonNavigator, (element) => {
            //return (element && element.props && element.props.id===css_id)
        //})
        //return n.length
    //}

    it('It will display the US flag, not the Chinese flag, when set to Chinese. (default)', function() {
        let renderExpression = <LessonNavigator {...state} />
        let lessonNavigator = ReactTestUtils.createRenderer().render(renderExpression)
        // By default the language is zh, so only see the US flag.
        expect( countWithId(lessonNavigator, 'enFlag')).toBe(1)
        expect( countWithId(lessonNavigator, 'zhFlag')).toBe(0)
    })

    it('It will display the Chinese flag, not the US flag, when set to English.', function() {
        //const newState = state.strings.setIn(['lang'],langCode.en)
        state.strings.lang = langCode.en
        let renderExpression = <LessonNavigator {...state} />
        let lessonNavigator = ReactTestUtils.createRenderer().render(renderExpression)
        expect( countWithId(lessonNavigator, 'enFlag')).toBe(0)
        expect( countWithId(lessonNavigator, 'zhFlag')).toBe(1)
    })

    // This is how we generate many different states for the nav buttons.
    it("Navigates completely through all lessons.", function() {

        // Starting fresh, force the first lesson to be passed.
        let currentLesson = state.app.getIn(['level','currentLesson'])
        state.quiz = state.quiz.setIn([currentLesson,'passed'],true)
        let renderExpression = <LessonNavigator {...state} />
        let lessonNavigator = ReactTestUtils.createRenderer().render(renderExpression)
        expect(lessonNavigator.props.className).toBe("lesson-navigator")

        expect( countWithId(lessonNavigator, 'lesson-previous')).toBe(0)
        expect( countWithId(lessonNavigator, 'lesson-next')).toBe(1)
        expect( countWithId(lessonNavigator, 'level-reset')).toBe(1)

        while(!state.app.getIn(['level','lastLesson'])) {

            dispatch({
                type: AppActionTypes.ON_CLICK_LESSON_NEXT
            })

            currentLesson = state.app.getIn(['level','currentLesson'])
            state.quiz = state.quiz.setIn([currentLesson,'passed'],true)

            renderExpression = <LessonNavigator {...state} />
            lessonNavigator = ReactTestUtils.createRenderer().render(renderExpression)
            expect(lessonNavigator.props.className).toBe("lesson-navigator");

            expect( countWithId(lessonNavigator, 'lesson-previous')).toBe(1)

            if (state.app.getIn(['level','lastLesson'])) {
                expect( countWithId(lessonNavigator, 'lesson-next')).toBe(0)
            }
            else
                expect( countWithId(lessonNavigator, 'lesson-next')).toBe(1)

            expect( countWithId(lessonNavigator, 'level-reset')).toBe(1)
        }
    })

})
