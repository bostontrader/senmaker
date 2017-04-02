import {Map} from 'immutable'
import React from 'react'

import TestUtils         from 'react-addons-test-utils'
import {findAll, findAllWithClass, findWithClass, findWithType} from 'react-shallow-testutils'


import LessonNavigator from './LessonNavigator'
import Verbd           from './Verbd'

import AppActionTypes  from '../../data/AppActionTypes'
import AppStore        from '../../data/AppStore'
import VerbdStore      from '../../data/dictionary/verbd/VerbdStore'
import QuizActionTypes from '../../data/quiz/QuizActionTypes'
import QuizStore       from '../../data/quiz/QuizStore'
import StringStore     from '../../data/StringStore'

import VerbdPanel from '../dictionary/verbd/VerbdPanel'

describe("Verbd", function() {

    function getInitialState() {
        return {
            app:     AppStore.getInitialState(),
            quiz:    QuizStore.getInitialState(),
            strings: StringStore.getInitialState(),
            verbd:Map({
                verbs:VerbdStore.getInitialState()
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
    it("Renders Verbd in all its glory.", function() {

        const swap = (array, pos1, pos2) => {
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

        const verifyBasicLayout = (verbdRenderer) => {
            expect(verbdRenderer.type).toBe('div')
            expect(findWithClass(verbdRenderer,'help'))
            expect(findWithType(verbdRenderer,VerbdPanel))
            expect(findWithClass(verbdRenderer,'quiz'))
            expect(findWithType(verbdRenderer,LessonNavigator))
        }

        const testSinglePermutation = (quizSequence) => {
            this.state = getInitialState()
            this.dispatch({
                type: AppActionTypes.ON_LESSON_NEXT    // advance to lesson verbd
            })

            const renderExpression = <Verbd {...this.state} />
            const verbdRenderer = TestUtils.createRenderer().render(renderExpression)

            // no need to check basic layout or the fact that none of the checks are displayed
            // because we've already checked it for the beginning state.

            let checks = [] // which check marks should be set?
            for(let quizItem of quizSequence) {
                this.dispatch({
                    type: quizItem.type,
                    verbd: quizItem.verbd
                })
                checks.push(quizItem.i)
                let renderExpression = <Verbd {...this.state} />
                let verbdRenderer = TestUtils.createRenderer().render(renderExpression)

                verifyBasicLayout(verbdRenderer)

                // verify that only the currently answered questions are checked
                expect(findAllWithClass(verbdRenderer,'checkmark').length).toBe(checks.length)
                //for(let check of checks) {
                    //const n = findAll(verbdRenderer, (element) => {element === check})
                    //expect(n.length).toBe(1)
                //}
            }
        }

        // Starting from the beginning,
        this.dispatch({
            type: AppActionTypes.ON_LESSON_NEXT    // advance to lesson verbd
        })

        const renderExpression = <Verbd {...this.state} />
        const verbdRenderer = TestUtils.createRenderer().render(renderExpression)

        verifyBasicLayout(verbdRenderer)

        // None of the quiz items should be checked.
        expect(findAllWithClass(verbdRenderer,'checkmark').length).toBe(0)

        // Now verify correct operation of each permutation.
        heapsPermute([
            {type:QuizActionTypes.verbd.ON_CLICK_SAVE_VERBD,   i:'insertVerbdCheck', verbd:{}},
            {type:QuizActionTypes.verbd.ON_CLICK_SAVE_VERBD,   i:'updateVerbdCheck', verbd:{id:'1'}},
            {type:QuizActionTypes.verbd.ON_CLICK_DELETE_VERBD, i:'deleteVerbdCheck'}
            ], testSinglePermutation)
    })
})
