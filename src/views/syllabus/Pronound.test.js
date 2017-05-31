import React from 'react'

import ReactTestUtils     from 'react-dom/test-utils'
import {findWithType}     from 'react-shallow-testutils'
import {findAllWithClass} from 'react-shallow-testutils'

import LessonNavigator   from './LessonNavigator'
import Conjunctiond      from './Conjunctiond'
import ConjunctiondPanel from '../dictionary/conjunctiond/ConjunctiondPanel'
import {countWithId}     from '../../TestUtils'
import {heapsPermute}    from '../../TestUtils'
import initialState      from '../../data/StateGetter'
import ConjunctiondActionTypes from '../../data/dictionary/conjunctiond/ConjunctiondActionTypes'
import QuizStore         from '../../data/quiz/QuizStore'

describe("Conjunctiond", function() {

    /**
     * This component should be tested as each quiz question is answered.
     * However, I have found errors that derive from the order of answering
     * the quiz questions. Therefore test this component using every possible
     * order of answering the quiz questions.
     */
    it("Renders Conjunctiond in all its glory.", function() {

        const verifyBasicLayout = (conjunctiondComponent, expectQuizBox) => {
            expect(conjunctiondComponent.type).toBe('div')
            expect(countWithId(conjunctiondComponent,'help')).toBe(1)
            expect(findWithType(conjunctiondComponent,ConjunctiondPanel))
            expect(countWithId(conjunctiondComponent,'quiz')).toBe(expectQuizBox ? 1 : 0)
            expect(findWithType(conjunctiondComponent,LessonNavigator))
        }

        /*
        Given an array of actions, dispatch each one sequentially, in order,
        and verify that the basic layout is good and that the correct (and no other)
        checkmarks are present
         */
        const testSinglePermutation = (actions) => {
            let state = initialState

            const renderExpression = <Conjunctiond {...state} />
            const conjunctiondComponent = ReactTestUtils.createRenderer().render(renderExpression)

            // no need to check basic layout or the fact that none of the checks are displayed
            // because we've already checked it for the beginning state.

            let checks = [] // which check marks should be set?
            for(let quizItem of actions) {
                state.quiz  = QuizStore.reduce(state.quiz, {type: quizItem.type, conjunctiond: quizItem.conjunctiond})
                checks.push(quizItem.i)
                let renderExpression = <Conjunctiond {...state} />
                let conjunctiondComponent = ReactTestUtils.createRenderer().render(renderExpression)

                // Passed or not, the quiz box should be there
                //if(state.quiz.getIn(['conjunctiond','passed'])) {
                    // If the quiz has pass, don't expect the quiz box and don't look for the checkmarks
                    //verifyBasicLayout(conjunctiondComponent, false)
                //} else {
                    // If the quiz has not passed, expect the quiz box and look
                    // for the checkmarks
                    verifyBasicLayout(conjunctiondComponent, true)

                    // verify that only the currently answered questions are checked
                    //for(let check of checks)
                        //expect(countWithId(conjunctiondComponent,check)).toBe(1)
                //}


            }
        }

        const renderExpression = <Conjunctiond {...initialState} />
        const conjunctiondComponent = ReactTestUtils.createRenderer().render(renderExpression)

        verifyBasicLayout(conjunctiondComponent, true) // expect quizbox

        // None of the quiz items should be checked.
        expect(findAllWithClass(conjunctiondComponent,'checkmark').length).toBe(0)

        // Now verify correct operation of each permutation.
        heapsPermute([
            {type:ConjunctiondActionTypes.ON_CLICK_SAVE_NOUND,   i:'insertConjunctiondCheckmark', conjunctiond:{}},
            {type:ConjunctiondActionTypes.ON_CLICK_SAVE_NOUND,   i:'updateConjunctiondCheckmark', conjunctiond:{id:'1'}},
            {type:ConjunctiondActionTypes.ON_CLICK_DELETE_NOUND, i:'deleteConjunctiondCheckmark'}
            ], testSinglePermutation)
    })
})
