import React from 'react'

import ReactTestUtils from 'react-dom/test-utils'
import {findWithType} from 'react-shallow-testutils'
import rtRenderer     from 'react-test-renderer'

import Phrase          from './Phrase'
import LessonNavigator from './LessonNavigator'
import {countWithId}   from '../../TestUtils'
import initialState    from '../../data/StateGetter'
import QuizActionTypes from '../../data/quiz/QuizActionTypes'
import QuizStore       from '../../data/quiz/QuizStore'

describe("Phrase", () => {

    const verifyBasicLayout = (renderExpression, expectQuizBox) => {
        const phraseComponent = ReactTestUtils.createRenderer().render(renderExpression)
        expect(phraseComponent.type).toBe('div')
        expect(findWithType(phraseComponent,LessonNavigator))
        expect(countWithId(phraseComponent,'help')).toBe(1)
        expect(countWithId(phraseComponent,'quiz')).toBe(expectQuizBox ? 1 : 0)

        return phraseComponent
    }

    it("Renders Phrase before the Quiz", () => {
        const renderExpression = <Phrase {...initialState} />
        const phraseComponent = verifyBasicLayout(renderExpression, true) // expectQuizBox
        expect(countWithId(phraseComponent,'iunderstandCheckmark')).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders Phrase after the Quiz", () => {
        let newState = initialState
        newState.quiz = QuizStore.reduce(initialState.quiz, {type:QuizActionTypes.phrase.ON_I_UNDERSTAND})
        const renderExpression = <Phrase {...newState} />

        // Answering the quiz will make the quiz box go away
        const phraseComponent = verifyBasicLayout(renderExpression, false) // don't expectQuizBox

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
