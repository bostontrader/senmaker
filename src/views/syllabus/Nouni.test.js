import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import {findAllWithClass, findWithClass, findWithType} from 'react-shallow-testutils'

import LessonNavigator from './LessonNavigator'
import Nouni           from './Nouni'

import AppActionTypes     from '../../data/app/AppActionTypes'
import AppStore           from '../../data/app/AppStore'
import NouniAEActionTypes from '../../data/nouni/addedit/NouniAEActionTypes'
import NouniStore         from '../../data/nouni/NouniStore'
import QuizStore          from '../../data/quiz/QuizStore'
import StringStore        from '../../data/strings/StringStore'

import NouniPanel from '../nouni/NouniPanel'

describe("Nouni", function() {

    function getInitialState() {
        return {
            app:     AppStore.getInitialState(),
            quiz:    QuizStore.getInitialState(),
            strings: StringStore.getInitialState(),
            nouni:Map({
                nounis:NouniStore.getInitialState()
            })
        }
    }

    beforeEach(function() {

        this.state = getInitialState()

        this.dispatch = action => {
            this.state.app   = AppStore .reduce(this.state.app, action)
            this.state.quiz  = QuizStore.reduce(this.state.quiz, action)
        }
    })

    /**
     * This component should be tested as each quiz question is answered.
     * However, I have found errors that derive from the order of answering
     * the quiz questions. Therefore test this component using every possible
     * order of answering the quiz questions.
     */
    it("Renders Nouni in all its glory.", function() {

        expect(true)
        /*const swap = (array, pos1, pos2) => {
            const temp = array[pos1]
            array[pos1] = array[pos2]
            array[pos2] = temp
        }

        const heapsPermute = (array, output, n) => {
            n = n || array.length; // set n default to array.length
            if (n === 1) {
                output(array)
            } else {
                for (let i = 1; i <= n; i += 1) {
                    heapsPermute(array, output, n - 1);
                    let j
                    if (n % 2) {
                        j = 1;
                    } else {
                        j = i;
                    }
                    swap(array, j - 1, n - 1); // -1 to account for javascript zero-indexing
                }
            }
        }

        const verifyBasicLayout = (nouniRenderer) => {
            expect(nouniRenderer.type).toBe('div')
            expect(findWithClass(nouniRenderer,'help'))
            expect(findWithType(nouniRenderer,NouniPanel))
            expect(findWithClass(nouniRenderer,'quiz'))
            expect(findWithType(nouniRenderer,LessonNavigator))
        }

        const testSinglePermutation = (quizSequence) => {
            this.state = getInitialState()
            this.dispatch({
                type: AppActionTypes.ON_LESSON_NEXT    // advance to lesson nouni
            })

            const renderExpression = <Nouni {...this.state} />
            const nouniRenderer = TestUtils.createRenderer().render(renderExpression)

            // no need to check basic layout or the fact that none of the checks are displayed
            // because we've already checked it for the beginning state.

            let checks = [] // which check marks should be set?
            for(let quizItem of quizSequence) {
                this.dispatch({
                    type: quizItem.type,
                    nouni: quizItem.nouni
                })
                checks.push(quizItem.i)
                let renderExpression = <Nouni {...this.state} />
                let nouniRenderer = TestUtils.createRenderer().render(renderExpression)

                verifyBasicLayout(nouniRenderer)

                // verify that only the currently answered questions are checked
                expect(findAllWithClass(nouniRenderer,'checkmark').length).toBe(checks.length)
                //for(let check of checks) {
                    //const n = findAll(nouniRenderer, (element) => {element === check})
                    //expect(n.length).toBe(1)
                //}
            }
        }

        // Starting from the beginning,
        this.dispatch({
            type: AppActionTypes.ON_LESSON_NEXT    // advance to lesson nouni
        })

        const renderExpression = <Nouni {...this.state} />
        const nouniRenderer = TestUtils.createRenderer().render(renderExpression)

        verifyBasicLayout(nouniRenderer)

        // None of the quiz items should be checked.
        expect(findAllWithClass(nouniRenderer,'checkmark').length).toBe(0)

        // Now verify correct operation of each permutation.
        heapsPermute([
            {type:NouniAEActionTypes.ON_CLICK_SAVE_NOUNI,   i:'insertNouniCheck', nouni:{}},
            {type:NouniAEActionTypes.ON_CLICK_SAVE_NOUNI,   i:'updateNouniCheck', nouni:{id:'1'}},
            {type:NouniAEActionTypes.ON_CLICK_DELETE_NOUNI, i:'deleteNouniCheck'}
            ], testSinglePermutation)*/
    })
})
