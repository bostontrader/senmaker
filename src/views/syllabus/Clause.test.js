import React from 'react'

import ReactTestUtils from 'react-dom/test-utils'
import {findWithType} from 'react-shallow-testutils'
import rtRenderer     from 'react-test-renderer'

import Clause          from './Clause'
import LessonNavigator from './LessonNavigator'
import {countWithId}   from '../../TestUtils'
import initialState    from '../../data/StateGetter'
import QuizActionTypes from '../../data/quiz/QuizActionTypes'
import QuizStore       from '../../data/quiz/QuizStore'

describe("Clause", () => {

    const verifyBasicLayout = (renderExpression, expectQuizBox) => {
        const clauseComponent = ReactTestUtils.createRenderer().render(renderExpression)
        expect(clauseComponent.type).toBe('div')
        expect(findWithType(clauseComponent,LessonNavigator))
        expect(countWithId(clauseComponent,'help')).toBe(1)
        expect(countWithId(clauseComponent,'quiz')).toBe(expectQuizBox ? 1 : 0)

        return clauseComponent
    }

    it("Renders Clause before the Quiz", () => {
        const renderExpression = <Clause {...initialState} />
        const clauseComponent = verifyBasicLayout(renderExpression, true) // expectQuizBox
        expect(countWithId(clauseComponent,'iunderstandCheckmark')).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders Clause after the Quiz", () => {
        let newState = initialState
        newState.quiz = QuizStore.reduce(initialState.quiz, {type:QuizActionTypes.clause.ON_I_UNDERSTAND})
        const renderExpression = <Clause {...newState} />

        const clauseComponent = verifyBasicLayout(renderExpression, true) // expectQuizBox
        expect(countWithId(clauseComponent,'iunderstandCheckmark')).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
