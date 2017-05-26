import React from 'react'

import ReactTestUtils from 'react-dom/test-utils'
import {findWithType} from 'react-shallow-testutils'
import rtRenderer     from 'react-test-renderer'

import LessonNavigator from './LessonNavigator'
import VerbConjugation        from './VerbConjugation'
import {countWithId}   from '../../TestUtils'
import initialState    from '../../data/StateGetter'
import QuizActionTypes from '../../data/quiz/QuizActionTypes'
import QuizStore       from '../../data/quiz/QuizStore'

describe("VerbConjugation", () => {

    const verifyBasicLayout = (renderExpression, expectQuizBox) => {
        const verbConjugationComponent = ReactTestUtils.createRenderer().render(renderExpression)
        expect(verbConjugationComponent.type).toBe('div')
        expect(findWithType(verbConjugationComponent,LessonNavigator))
        expect(countWithId(verbConjugationComponent,'help')).toBe(1)
        expect(countWithId(verbConjugationComponent,'quiz')).toBe(expectQuizBox ? 1 : 0)

        return verbConjugationComponent
    }

    it("Renders VerbConjugation before the Quiz", () => {
        const renderExpression = <VerbConjugation {...initialState} />
        const verbConjugationComponent = verifyBasicLayout(renderExpression, true) // expectQuizBox
        expect(countWithId(verbConjugationComponent,'iunderstandCheckmark')).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders VerbConjugation after the Quiz", () => {
        let newState = initialState
        newState.quiz = QuizStore.reduce(initialState.quiz, {type:QuizActionTypes.verbConjugation.ON_I_UNDERSTAND})
        const renderExpression = <VerbConjugation {...newState} />

        const verbConjugationComponent = verifyBasicLayout(renderExpression, true) // expectQuizBox
        expect(countWithId(verbConjugationComponent,'iunderstandCheckmark')).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
