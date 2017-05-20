import React from 'react'

import ReactTestUtils     from 'react-dom/test-utils'
import {findWithType}     from 'react-shallow-testutils'
import {findAllWithClass} from 'react-shallow-testutils'

import LessonNavigator from './LessonNavigator'
import NounPhrase      from './NounPhrase'
import NPPanel         from '../np/NPPanel'
import {countWithId}   from '../../TestUtils'
import {heapsPermute}  from '../../TestUtils'
import initialState    from '../../data/StateGetter'
import NPActionTypes   from '../../data/np/NPActionTypes'
import QuizStore       from '../../data/quiz/QuizStore'

describe("NounPhrase", () => {

    /**
     * This component should be tested as each quiz question is answered.
     * However, I have found errors that derive from the order of answering
     * the quiz questions. Therefore test this component using every possible
     * order of answering the quiz questions.
     */
    it("Renders NounPhrase in all its glory.", () => {

        const verifyBasicLayout = (npComponent, expectQuizBox) => {
            expect(npComponent.type).toBe('div')
            expect(countWithId(npComponent,'help')).toBe(1)
            expect(findWithType(npComponent,NPPanel))
            expect(countWithId(npComponent,'quiz')).toBe(expectQuizBox ? 1 : 0)
            expect(findWithType(npComponent,LessonNavigator))
        }

        /*
         Given an array of actions, dispatch each one sequentially, in order,
         and verify that the basic layout is good and that the correct (and no other)
         checkmarks are present
         */
        const testSinglePermutation = (actions) => {
            let state = initialState

            const renderExpression = <NounPhrase {...state} />
            const npComponent = ReactTestUtils.createRenderer().render(renderExpression)

            // no need to check basic layout or the fact that none of the checks are displayed
            // because we've already checked it for the beginning state.

            let checks = [] // which check marks should be set?
            for(let quizItem of actions) {
                state.quiz  = QuizStore.reduce(state.quiz, quizItem)

                checks.push(quizItem.i)
                let renderExpression = <NounPhrase {...state} />
                let npComponent = ReactTestUtils.createRenderer().render(renderExpression)

                if(state.quiz.getIn(['np','passed'])) {
                    // If the quiz has passed, don't expect the quiz box and don't look for the checkmarks
                    verifyBasicLayout(npComponent, false)
                } else {
                    // If the quiz has not passed, expect the quiz box and look
                    // for the checkmarks
                    verifyBasicLayout(npComponent, true)

                    // verify that only the currently answered questions are checked
                    for(let check of checks)
                        expect(countWithId(npComponent,check)).toBe(1)
                }
            }
        }

        const renderExpression = <NounPhrase {...initialState} />
        const npComponent = ReactTestUtils.createRenderer().render(renderExpression)
        verifyBasicLayout(npComponent, true) // first time, expect the quiz box

        // None of the quiz items should be checked.
        expect(findAllWithClass(npComponent,'checkmark').length).toBe(0)

        // Now verify correct operation of each permutation.
        heapsPermute([
            {type:NPActionTypes.ON_CLICK_SAVE_NP, i:'quizInsertNPMark'},
            {type:NPActionTypes.ON_CHANGE_SELECTED_NOUND_L2, i:'quizUpdateNPNounMark'},
            {type:NPActionTypes.ON_CHANGE_DEFINITENESS_L2, i:'quizUpdateNPDefinitenessMark'},
            {type:NPActionTypes.ON_CLICK_DELETE_NP, i:'quizDeleteNPMark'},
        ], testSinglePermutation)
    })
})
