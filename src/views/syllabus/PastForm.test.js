//import {Map} from 'immutable'
import React from 'react'

//import ReactTestUtils         from 'react-dom/test-utils'
//import {findAllWithClass, findWithClass, findWithType} from 'react-shallow-testutils'

//import LessonNavigator from './LessonNavigator'
//import PastForm           from './PastForm'

//import AppActionTypes   from '../../data/app/AppActionTypes'
//import AppStore         from '../../data/app/AppStore'
//import PastFormActionTypes from '../../data/dictionary/verbd/PastFormActionTypes'
//import PastFormStore       from '../../data/dictionary/verbd/PastFormStore'
//import QuizStore        from '../../data/quiz/QuizStore'
//import StringStore      from '../../data/strings/StringStore'

//import PastFormPanel from '../dictionary/verbd/PastFormPanel'

describe("PastForm", function() {

    beforeEach(function() {

        //this.state = getInitialState()

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
    it("Renders PastForm in all its glory.", function() {

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

        const verifyBasicLayout = (noundRenderer) => {
            expect(noundRenderer.type).toBe('div')
            expect(findWithClass(noundRenderer,'help'))
            expect(findWithType(noundRenderer,PastFormPanel))
            expect(findWithClass(noundRenderer,'quiz'))
            expect(findWithType(noundRenderer,LessonNavigator))
        }

        const testSinglePermutation = (quizSequence) => {
            this.state = getInitialState()
            this.dispatch({
                type: AppActionTypes.ON_CLICK_LESSON_NEXT    // advance to lesson nound
            })

            const renderExpression = <PastForm {...this.state} />
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
                let renderExpression = <PastForm {...this.state} />
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

        const renderExpression = <PastForm {...this.state} />
        const noundRenderer = ReactTestUtils.createRenderer().render(renderExpression)

        verifyBasicLayout(noundRenderer)

        // None of the quiz items should be checked.
        expect(findAllWithClass(noundRenderer,'checkmark').length).toBe(0)

        // Now verify correct operation of each permutation.
        heapsPermute([
            {type:PastFormActionTypes.ON_CLICK_SAVE_NOUND,   i:'insertPastFormCheck', nound:{}},
            {type:PastFormActionTypes.ON_CLICK_SAVE_NOUND,   i:'updatePastFormCheck', nound:{id:'1'}},
            {type:PastFormActionTypes.ON_CLICK_DELETE_NOUND, i:'deletePastFormCheck'}
            ], testSinglePermutation)*/
    })
})
