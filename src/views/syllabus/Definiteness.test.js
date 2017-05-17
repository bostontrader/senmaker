import React from 'react'

import ReactTestUtils     from 'react-dom/test-utils'
import {findWithType}     from 'react-shallow-testutils'
import {findAllWithClass} from 'react-shallow-testutils'

import LessonNavigator from './LessonNavigator'
import Definiteness    from './Definiteness'
import NPAEForm        from '../np/addedit/NPAEForm'
import {countWithId}   from '../../TestUtils'
import {heapsPermute}  from '../../TestUtils'
import initialState    from '../../data/StateGetter'
import NPActionTypes   from '../../data/np/NPActionTypes'
import QuizActionTypes from '../../data/quiz/QuizActionTypes'
import QuizStore       from '../../data/quiz/QuizStore'

describe("Definiteness", function() {

    /**
     * This component should be tested as each quiz question is answered.
     * However, I have found errors that derive from the order of answering
     * the quiz questions. Therefore test this component using every possible
     * order of answering the quiz questions.
     */
    it("Renders Definiteness in all its glory.", function() {

        const verifyBasicLayout = (definitenessComponent, expectQuizBox) => {
            expect(definitenessComponent.type).toBe('div')
            expect(countWithId(definitenessComponent,'help')).toBe(1)
            expect(findWithType(definitenessComponent,NPAEForm))
            expect(countWithId(definitenessComponent,'quiz')).toBe(expectQuizBox ? 1 : 0)
            expect(findWithType(definitenessComponent,LessonNavigator))
        }

        /*
         Given an array of actions, dispatch each one sequentially, in order,
         and verify that the basic layout is good and that the correct (and no other)
         checkmarks are present
         */
        const testSinglePermutation = (actions) => {
            let state = initialState

            const renderExpression = <Definiteness {...state} />
            const definitenessComponent = ReactTestUtils.createRenderer().render(renderExpression)

            // no need to check basic layout or the fact that none of the checks are displayed
            // because we've already checked it for the beginning state.

            let checks = [] // which check marks should be set?
            for(let quizItem of actions) {
                state.quiz  = QuizStore.reduce(state.quiz, {type: quizItem.type})
                checks.push(quizItem.i)
                let renderExpression = <Definiteness {...state} />
                let definitenessComponent = ReactTestUtils.createRenderer().render(renderExpression)

                if(state.quiz.getIn(['definiteness','passed'])) {
                    // If the quiz has passed, don't expect the quiz box and don't look for the checkmarks
                    verifyBasicLayout(definitenessComponent, false)
                } else {
                    // If the quiz has not passed, expect the quiz box and look
                    // for the checkmarks
                    verifyBasicLayout(definitenessComponent, true)

                    // verify that only the currently answered questions are checked
                    for(let check of checks)
                        expect(countWithId(definitenessComponent,check)).toBe(1)
                }

            }
        }

        const renderExpression = <Definiteness {...initialState} />
        const definitenessComponent = ReactTestUtils.createRenderer().render(renderExpression)

        verifyBasicLayout(definitenessComponent, true) // expect quizbox

        // None of the quiz items should be checked.
        expect(findAllWithClass(definitenessComponent,'checkmark').length).toBe(0)

        // Now verify correct operation of each permutation.
        heapsPermute([
            {type:NPActionTypes.ON_CHANGE_SELECTED_NOUND, i:'changeNoundCheck'},
            {type:NPActionTypes.ON_CHANGE_DEFINITENESS, i:'changeDefinitenessCheck'},
            {type:QuizActionTypes.definiteness.ON_ISEE_CHANGE_ARTICLE, i:'iseeArticleChangedCheck'}

        ], testSinglePermutation)
    })
})
