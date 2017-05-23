import React from 'react'

import ReactTestUtils from 'react-dom/test-utils'
import {findWithType} from 'react-shallow-testutils'
import rtRenderer     from 'react-test-renderer'

import Intro           from './Intro'
import LessonNavigator from './LessonNavigator'
import {countWithId}   from '../../TestUtils'
import initialState    from '../../data/StateGetter'
import QuizActionTypes from '../../data/quiz/QuizActionTypes'
import QuizStore       from '../../data/quiz/QuizStore'

describe("Intro", () => {

    const verifyBasicLayout = (renderExpression, expectQuizBox) => {
        const introComponent = ReactTestUtils.createRenderer().render(renderExpression)
        expect(introComponent.type).toBe('div')
        expect(findWithType(introComponent,LessonNavigator))
        expect(countWithId(introComponent,'help')).toBe(1)
        expect(countWithId(introComponent,'quiz')).toBe(expectQuizBox ? 1 : 0)

        return introComponent
    }

    it("Renders Intro before the Quiz", () => {
        const renderExpression = <Intro {...initialState} />
        const introComponent = verifyBasicLayout(renderExpression, true) // expectQuizBox
        expect(countWithId(introComponent,'iunderstandCheckmark')).toBe(0)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it("Renders Intro after the Quiz", () => {
        let newState = initialState
        newState.quiz = QuizStore.reduce(initialState.quiz, {type:QuizActionTypes.intro.ON_I_UNDERSTAND})
        const renderExpression = <Intro {...newState} />

        const introComponent = verifyBasicLayout(renderExpression, true) // expectQuizBox
        expect(countWithId(introComponent,'iunderstandCheckmark')).toBe(1)

        const tree = rtRenderer.create(renderExpression).toJSON()
        expect(tree).toMatchSnapshot()
    })

})
