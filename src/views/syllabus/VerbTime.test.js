import React from 'react'

import ReactTestUtils from 'react-dom/test-utils'
import {findWithType} from 'react-shallow-testutils'
import rtRenderer     from 'react-test-renderer'

import LessonNavigator from './LessonNavigator'
import VerbTime        from './VerbTime'
import {countWithId}   from '../../TestUtils'
import initialState    from '../../data/StateGetter'
import QuizActionTypes from '../../data/quiz/QuizActionTypes'
import QuizStore       from '../../data/quiz/QuizStore'

describe("VerbTime", () => {

    const verifyBasicLayout = (renderExpression, expectQuizBox) => {
        const verbTimeComponent = ReactTestUtils.createRenderer().render(renderExpression)
        expect(verbTimeComponent.type).toBe('div')
        expect(findWithType(verbTimeComponent,LessonNavigator))
        expect(countWithId(verbTimeComponent,'help')).toBe(1)
        expect(countWithId(verbTimeComponent,'quiz')).toBe(expectQuizBox ? 1 : 0)

        return verbTimeComponent
    }

    it("Renders VerbTime before the Quiz", () => {
        const renderExpression = <VerbTime {...initialState} />
        const verbTimeComponent = verifyBasicLayout(renderExpression, true) // expectQuizBox
        expect(countWithId(verbTimeComponent,'iunderstandCheckmark')).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders VerbTime after the Quiz", () => {
        let newState = initialState
        newState.quiz = QuizStore.reduce(initialState.quiz, {type:QuizActionTypes.verbTime.ON_I_UNDERSTAND})
        const renderExpression = <VerbTime {...newState} />

        const verbTimeComponent = verifyBasicLayout(renderExpression, true) // expectQuizBox
        expect(countWithId(verbTimeComponent,'iunderstandCheckmark')).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
