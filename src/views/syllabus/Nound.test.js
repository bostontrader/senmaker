import React from 'react'

import TestUtils          from 'react-dom/test-utils'
import {findWithType}     from 'react-shallow-testutils'
import {findAllWithClass} from 'react-shallow-testutils'

import LessonNavigator  from './LessonNavigator'
import Nound            from './Nound'
import NoundPanel       from '../dictionary/nound/NoundPanel'
import {countWithId}    from '../../TestUtils'
import initialState     from '../../data/StateGetter'
import NoundActionTypes from '../../data/dictionary/nound/NoundActionTypes'
import QuizStore        from '../../data/quiz/QuizStore'

describe("Nound", function() {

    /**
     * This component should be tested as each quiz question is answered.
     * However, I have found errors that derive from the order of answering
     * the quiz questions. Therefore test this component using every possible
     * order of answering the quiz questions.
     */
    it("Renders Nound in all its glory.", function() {

        const verifyBasicLayout = (noundComponent) => {
            expect(noundComponent.type).toBe('div')
            expect(countWithId(noundComponent,'help')).toBe(1)
            expect(findWithType(noundComponent,NoundPanel))
            expect(countWithId(noundComponent,'quiz')).toBe(1)
            expect(findWithType(noundComponent,LessonNavigator))
        }

        const swap = (array, pos1, pos2) => {
            const temp = array[pos1]
            array[pos1] = array[pos2]
            array[pos2] = temp
        }

        /*
        Given an array of actions to execute, enumerate all possible orders of execution
        and then sequentially pass each permutation to the testFunction to be executed.
         */
        const heapsPermute = (actions, testFunction, n) => {
            n = n || actions.length // set n1 default to actions.length
            if (n === 1) {
                // If there is only one element in the actions, then just output that
                testFunction(actions)
            } else {
                for (let i = 1; i <= n; i += 1) {
                    heapsPermute(actions, testFunction, n - 1)
                    let j = (n % 2) ? 1 : i
                    swap(actions, j - 1, n - 1); // -1 to account for javascript zero-indexing
                }
            }
        }

        /*
        Given an array of actions, dispatch each one sequentially, in order,
        and verify that the basic layout is good and that the correct (and no other)
        checkmarks are present
         */
        const testSinglePermutation = (actions) => {
            let state = initialState

            const renderExpression = <Nound {...state} />
            const noundComponent = TestUtils.createRenderer().render(renderExpression)

            // no need to check basic layout or the fact that none of the checks are displayed
            // because we've already checked it for the beginning state.

            let checks = [] // which check marks should be set?
            for(let quizItem of actions) {
                state.quiz  = QuizStore.reduce(state.quiz, {type: quizItem.type, nound: quizItem.nound})
                checks.push(quizItem.i)
                let renderExpression = <Nound {...state} />
                let noundComponent = TestUtils.createRenderer().render(renderExpression)

                verifyBasicLayout(noundComponent)

                // verify that only the currently answered questions are checked
                for(let check of checks)
                    expect(countWithId(noundComponent,check)).toBe(1)
            }
        }

        const renderExpression = <Nound {...initialState} />
        const noundComponent = TestUtils.createRenderer().render(renderExpression)

        verifyBasicLayout(noundComponent)

        // None of the quiz items should be checked.
        expect(findAllWithClass(noundComponent,'checkmark').length).toBe(0)

        // Now verify correct operation of each permutation.
        heapsPermute([
            {type:NoundActionTypes.ON_CLICK_SAVE_NOUND,   i:'insertNoundCheck', nound:{}},
            {type:NoundActionTypes.ON_CLICK_SAVE_NOUND,   i:'updateNoundCheck', nound:{id:'1'}},
            {type:NoundActionTypes.ON_CLICK_DELETE_NOUND, i:'deleteNoundCheck'}
            ], testSinglePermutation)
    })
})
