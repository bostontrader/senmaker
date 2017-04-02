import QuizActionTypes   from './QuizActionTypes'
import QuizStore         from './QuizStore'

describe('QuizStore', function() {

    beforeEach(function() {
        this.state = QuizStore.getInitialState()

        this.dispatch = action => {
            this.state = QuizStore.reduce(this.state, action)
        }
    })

    // 1. intro
    it('ON_I_UNDERSTAND', function() {
        expect(this.state.getIn(['intro','iunderstand'])).toBe(false)
        expect(this.state.getIn(['intro','passed'])).toBe(false)

        this.dispatch({
            type: QuizActionTypes.intro.ON_I_UNDERSTAND
        })

        expect(this.state.getIn(['intro','iunderstand'])).toBe(true)
        expect(this.state.getIn(['intro','passed'])).toBe(true)
    })

    // 2.
    describe('nound', function() {
        /**
         * This section has three questions.  It's sufficient to test each individual
         * question and verify that the quiz has not passed.  Then in a final test,
         * answer all questions and verify that the quiz has indeed passed.  The order
         * of answering these questions is hereby deemed unimportant, hence no need to
         * check all the permutations.
         */
        it('ON_CLICK_SAVE_NOUND, insert', function() {
            expect(this.state.getIn(['nound','insertNound'])).toBe(false)
            expect(this.state.getIn(['nound','passed'])).toBe(false)

            this.dispatch({
                type: QuizActionTypes.nound.ON_CLICK_SAVE_NOUND,
                nound: {} // no id means insert new nound
            })

            expect(this.state.getIn(['nound','insertNound'])).toBe(true)
            expect(this.state.getIn(['nound','passed'])).toBe(false)
        })

        it('ON_CLICK_SAVE_NOUND, update', function() {
            expect(this.state.getIn(['nound','updateNound'])).toBe(false)
            expect(this.state.getIn(['nound','passed'])).toBe(false)

            this.dispatch({
                type: QuizActionTypes.nound.ON_CLICK_SAVE_NOUND,
                nound: {id:'1'} // id means update
            })

            expect(this.state.getIn(['nound','updateNound'])).toBe(true)
            expect(this.state.getIn(['nound','passed'])).toBe(false)
        })

        it('ON_CLICK_DELETE_NOUND, update', function() {
            expect(this.state.getIn(['nound','deleteNound'])).toBe(false)
            expect(this.state.getIn(['nound','passed'])).toBe(false)

            this.dispatch({
                type: QuizActionTypes.nound.ON_CLICK_DELETE_NOUND
            })

            expect(this.state.getIn(['nound','deleteNound'])).toBe(true)
            expect(this.state.getIn(['nound','passed'])).toBe(false)
        })

        it('Pass the quiz.', function() {
            expect(this.state.getIn(['nound','passed'])).toBe(false)

            this.dispatch({
                type: QuizActionTypes.nound.ON_CLICK_SAVE_NOUND,
                nound: {} // no id means insert new nound
            })

            this.dispatch({
                type: QuizActionTypes.nound.ON_CLICK_SAVE_NOUND,
                nound: {id:'1'} // id means update
            })

            this.dispatch({
                type: QuizActionTypes.nound.ON_CLICK_DELETE_NOUND
            })

            expect(this.state.getIn(['nound','passed'])).toBe(true)
        })
    })

    // 3.
    describe('verbd', function() {
        /**
         * This section has three questions.  It's sufficient to test each individual
         * question and verify that the quiz has not passed.  Then in a final test,
         * answer all questions and verify that the quiz has indeed passed.  The order
         * of answering these questions is hereby deemed unimportant, hence no need to
         * check all the permutations.
         */
        it('ON_CLICK_SAVE_VERBD, insert', function() {
            expect(this.state.getIn(['verbd','insertVerbd'])).toBe(false)
            expect(this.state.getIn(['verbd','passed'])).toBe(false)

            this.dispatch({
                type: QuizActionTypes.verbd.ON_CLICK_SAVE_VERBD,
                verbd: {} // no id means insert new verbd
            })

            expect(this.state.getIn(['verbd','insertVerbd'])).toBe(true)
            expect(this.state.getIn(['verbd','passed'])).toBe(false)
        })

        it('ON_CLICK_SAVE_VERBD, update', function() {
            expect(this.state.getIn(['verbd','updateVerbd'])).toBe(false)
            expect(this.state.getIn(['verbd','passed'])).toBe(false)

            this.dispatch({
                type: QuizActionTypes.verbd.ON_CLICK_SAVE_VERBD,
                verbd: {id:'1'} // id means update
            })

            expect(this.state.getIn(['verbd','updateVerbd'])).toBe(true)
            expect(this.state.getIn(['verbd','passed'])).toBe(false)
        })

        it('ON_CLICK_DELETE_VERBD, update', function() {
            expect(this.state.getIn(['verbd','deleteVerbd'])).toBe(false)
            expect(this.state.getIn(['verbd','passed'])).toBe(false)

            this.dispatch({
                type: QuizActionTypes.verbd.ON_CLICK_DELETE_VERBD
            })

            expect(this.state.getIn(['verbd','deleteVerbd'])).toBe(true)
            expect(this.state.getIn(['verbd','passed'])).toBe(false)
        })

        it('Pass the quiz.', function() {
            expect(this.state.getIn(['verbd','passed'])).toBe(false)

            this.dispatch({
                type: QuizActionTypes.verbd.ON_CLICK_SAVE_VERBD,
                verbd: {} // no id means insert new verbd
            })

            this.dispatch({
                type: QuizActionTypes.verbd.ON_CLICK_SAVE_VERBD,
                verbd: {id:'1'} // id means update
            })

            this.dispatch({
                type: QuizActionTypes.verbd.ON_CLICK_DELETE_VERBD
            })

            expect(this.state.getIn(['verbd','passed'])).toBe(true)
        })
    })



})
