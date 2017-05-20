import React from 'react'

import ReactTestUtils     from 'react-dom/test-utils'
import {findWithType}     from 'react-shallow-testutils'
import {findAllWithClass} from 'react-shallow-testutils'

import LessonNavigator  from './LessonNavigator'
import Verbd            from './Verbd'
import VerbdPanel       from '../dictionary/verbd/VerbdPanel'
import {countWithId}    from '../../TestUtils'
import {heapsPermute}   from '../../TestUtils'
import initialState     from '../../data/StateGetter'
import VerbdActionTypes from '../../data/dictionary/verbd/VerbdActionTypes'
import QuizStore        from '../../data/quiz/QuizStore'

describe("Verbd", function() {

    /**
     * This component should be tested as each quiz question is answered.
     * However, I have found errors that derive from the order of answering
     * the quiz questions. Therefore test this component using every possible
     * order of answering the quiz questions.
     */
    it("Renders Verbd in all its glory.", function() {

        const verifyBasicLayout = (verbdComponent, expectQuizBox) => {
            expect(verbdComponent.type).toBe('div')
            expect(countWithId(verbdComponent,'help')).toBe(1)
            expect(findWithType(verbdComponent,VerbdPanel))
            expect(countWithId(verbdComponent,'quiz')).toBe(expectQuizBox ? 1 : 0)
            expect(findWithType(verbdComponent,LessonNavigator))
        }

        /*
         Given an array of actions, dispatch each one sequentially, in order,
         and verify that the basic layout is good and that the correct (and no other)
         checkmarks are present
         */
        const testSinglePermutation = (actions) => {
            let state = initialState

            const renderExpression = <Verbd {...state} />
            const verbdComponent = ReactTestUtils.createRenderer().render(renderExpression)

            // no need to check basic layout or the fact that none of the checks are displayed
            // because we've already checked it for the beginning state.

            let checks = [] // which check marks should be set?
            for(let quizItem of actions) {
                state.quiz  = QuizStore.reduce(state.quiz, {type: quizItem.type, verbd: quizItem.verbd})
                checks.push(quizItem.i)
                let renderExpression = <Verbd {...state} />
                let verbdComponent = ReactTestUtils.createRenderer().render(renderExpression)

                if(state.quiz.getIn(['verbd','passed'])) {
                    // If the quiz has pass, don't expect the quiz box and don't look for the checkmarks
                    verifyBasicLayout(verbdComponent, false)
                } else {
                    // If the quiz has not passed, expect the quiz box and look
                    // for the checkmarks
                    verifyBasicLayout(verbdComponent, true)

                    // verify that only the currently answered questions are checked
                    for(let check of checks)
                        expect(countWithId(verbdComponent,check)).toBe(1)
                }


            }
        }

        const renderExpression = <Verbd {...initialState} />
        const verbdComponent = ReactTestUtils.createRenderer().render(renderExpression)

        verifyBasicLayout(verbdComponent, true) // expect quizbox

        // None of the quiz items should be checked.
        expect(findAllWithClass(verbdComponent,'checkmark').length).toBe(0)

        // Now verify correct operation of each permutation.
        heapsPermute([
            {type:VerbdActionTypes.ON_CLICK_SAVE_VERBD,   i:'insertVerbdCheck', verbd:{}},
            {type:VerbdActionTypes.ON_CLICK_SAVE_VERBD,   i:'updateVerbdCheck', verbd:{id:'1'}},
            {type:VerbdActionTypes.ON_CLICK_DELETE_VERBD, i:'deleteVerbdCheck'}
        ], testSinglePermutation)
    })
})



/*import {Map} from 'immutable'
import React from 'react'

import ReactTestUtils         from 'react-dom/test-utils'
import {findAllWithClass, findWithClass, findWithType} from 'react-shallow-testutils'

import LessonNavigator from './LessonNavigator'
import Verbd           from './Verbd'

import AppActionTypes   from '../../data/app/AppActionTypes'
import AppStore         from '../../data/app/AppStore'
import VerbdActionTypes from '../../data/dictionary/verbd/VerbdActionTypes'
import VerbdStore       from '../../data/dictionary/verbd/VerbdStore'
import QuizStore        from '../../data/quiz/QuizStore'
import StringStore      from '../../data/strings/StringStore'

import VerbdPanel from '../dictionary/verbd/VerbdPanel'

describe("Verbd", function() {

    function getInitialState() {
        return {
            app:     AppStore.getInitialState(),
            quiz:    QuizStore.getInitialState(),
            strings: StringStore.getInitialState(),
            nound:Map({
                nouns:VerbdStore.getInitialState()
            })
        }
    }*/

    /*beforeEach(function() {

        this.state = getInitialState()

        this.dispatch = action => {
            this.state.app   = AppStore .reduce(this.state.app, action)
            this.state.quiz  = QuizStore.reduce(this.state.quiz, action)
        }
    })*/

    /**
     * This component should be tested as each quiz question is answered.
     * However, I have found errors that derive from the order of answering
     * the quiz questions. Therefore test this component using every possible
     * order of answering the quiz questions.
     */
    //it("Renders Verbd in all its glory.", function() {

        /*const swap = (array, pos1, pos2) => {
            const temp = array[pos1]
            array[pos1] = array[pos2]
            array[pos2] = temp
        }

        /*const heapsPermute = (array, output, n) => {
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

        const verifyBasicLayout = (noundRenderer) => {
            expect(noundRenderer.type).toBe('div')
            expect(findWithClass(noundRenderer,'help'))
            expect(findWithType(noundRenderer,VerbdPanel))
            expect(findWithClass(noundRenderer,'quiz'))
            expect(findWithType(noundRenderer,LessonNavigator))
        }

        const testSinglePermutation = (quizSequence) => {
            this.state = getInitialState()
            this.dispatch({
                type: AppActionTypes.ON_CLICK_LESSON_NEXT    // advance to lesson nound
            })

            const renderExpression = <Verbd {...this.state} />
            const noundRenderer = ReactTestUtils.createRenderer().render(renderExpression)

            // no need to check basic layout or the fact that none of the checks are displayed
            // because we've already checked it for the beginning state.

            let checks = [] // which check marks should be set?
            for(let quizItem of quizSequence) {
                this.dispatch({
                    type: quizItem.type,
                    nound: quizItem.nound
                })
                checks.push(quizItem.i)
                let renderExpression = <Verbd {...this.state} />
                let noundRenderer = ReactTestUtils.createRenderer().render(renderExpression)

                verifyBasicLayout(noundRenderer)

                // verify that only the currently answered questions are checked
                //expect(findAllWithClass(noundRenderer,'checkmark').length).toBe(checks.length)
                //for(let check of checks) {
                    //const n = findAll(noundRenderer, (element) => {element === check})
                    //expect(n.length).toBe(1)
                //}
            }
        }

        // Starting from the beginning,
        this.dispatch({
            type: AppActionTypes.ON_CLICK_LESSON_NEXT    // advance to lesson nound
        })

        const renderExpression = <Verbd {...this.state} />
        const noundRenderer = ReactTestUtils.createRenderer().render(renderExpression)

        verifyBasicLayout(noundRenderer)

        // None of the quiz items should be checked.
        expect(findAllWithClass(noundRenderer,'checkmark').length).toBe(0)

        // Now verify correct operation of each permutation.
        heapsPermute([
            {type:VerbdActionTypes.ON_CLICK_SAVE_NOUND,   i:'insertVerbdCheck', nound:{}},
            {type:VerbdActionTypes.ON_CLICK_SAVE_NOUND,   i:'updateVerbdCheck', nound:{id:'1'}},
            {type:VerbdActionTypes.ON_CLICK_DELETE_NOUND, i:'deleteVerbdCheck'}
            ], testSinglePermutation)*/
    //})
//})
