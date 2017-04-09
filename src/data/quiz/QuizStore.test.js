import QuizActionTypes    from './QuizActionTypes'
import QuizStore          from './QuizStore'
import AdjectivdAEActionTypes from '../dictionary/adjectivd/addedit/AdjectivdAEActionTypes'
import NoundActionTypes   from '../dictionary/nound/NoundActionTypes'
import NoundAEActionTypes from '../dictionary/nound/addedit/NoundAEActionTypes'
import NouniAEActionTypes from '../nouni/addedit/NouniAEActionTypes'
import VerbdAEActionTypes from '../dictionary/verbd/addedit/VerbdAEActionTypes'

/**
 * For each lesson tested, it's sufficient to test each individual
 * question and verify that the quiz has not passed.  Then in a final test,
 * answer all questions and verify that the quiz has indeed passed.  The order
 * of answering these questions is hereby deemed unimportant, hence no need to
 * check all the permutations of question answering order.
 */
describe('QuizStore', function() {

    beforeEach(function() {
        this.state = QuizStore.getInitialState()

        this.dispatch = action => {
            this.state = QuizStore.reduce(this.state, action)
        }
    })

    // 0. intro
    it('intro ON_I_UNDERSTAND', function() {
        expect(this.state.getIn(['intro','iunderstand'])).toBe(false)
        expect(this.state.getIn(['intro','passed'])).toBe(false)

        this.dispatch({
            type: QuizActionTypes.intro.ON_I_UNDERSTAND
        })

        expect(this.state.getIn(['intro','iunderstand'])).toBe(true)
        expect(this.state.getIn(['intro','passed'])).toBe(true)
    })

    // 1. nound
    describe('nound', function() {

        it('ON_CLICK_SAVE_NOUND, insert', function() {
            expect(this.state.getIn(['nound','insertNound'])).toBe(false)
            expect(this.state.getIn(['nound','passed'])).toBe(false)

            this.dispatch({
                type: NoundAEActionTypes.ON_CLICK_SAVE_NOUND,
                nound: {} // no id means insert new nound
            })

            expect(this.state.getIn(['nound','insertNound'])).toBe(true)
            expect(this.state.getIn(['nound','passed'])).toBe(false)
        })

        it('ON_CLICK_SAVE_NOUND, update', function() {
            expect(this.state.getIn(['nound','updateNound'])).toBe(false)
            expect(this.state.getIn(['nound','passed'])).toBe(false)

            this.dispatch({
                type: NoundAEActionTypes.ON_CLICK_SAVE_NOUND,
                nound: {id:'1'} // id means update
            })

            expect(this.state.getIn(['nound','updateNound'])).toBe(true)
            expect(this.state.getIn(['nound','passed'])).toBe(false)
        })

        it('ON_CLICK_DELETE_NOUND, update', function() {
            expect(this.state.getIn(['nound','deleteNound'])).toBe(false)
            expect(this.state.getIn(['nound','passed'])).toBe(false)

            this.dispatch({
                type: NoundAEActionTypes.ON_CLICK_DELETE_NOUND
            })

            expect(this.state.getIn(['nound','deleteNound'])).toBe(true)
            expect(this.state.getIn(['nound','passed'])).toBe(false)
        })

        it('Pass the quiz.', function() {
            expect(this.state.getIn(['nound','passed'])).toBe(false)

            this.dispatch({
                type: NoundAEActionTypes.ON_CLICK_SAVE_NOUND,
                nound: {} // no id means insert new nound
            })

            this.dispatch({
                type: NoundAEActionTypes.ON_CLICK_SAVE_NOUND,
                nound: {id:'1'} // id means update
            })

            this.dispatch({
                type: NoundAEActionTypes.ON_CLICK_DELETE_NOUND
            })

            expect(this.state.getIn(['nound','passed'])).toBe(true)
        })
    })

    // 2. verbd
    describe('verbd', function() {

        it('ON_CLICK_SAVE_VERBD, insert', function() {
            expect(this.state.getIn(['verbd','insertVerbd'])).toBe(false)
            expect(this.state.getIn(['verbd','passed'])).toBe(false)

            this.dispatch({
                type: VerbdAEActionTypes.ON_CLICK_SAVE_VERBD,
                verbd: {} // no id means insert new verbd
            })

            expect(this.state.getIn(['verbd','insertVerbd'])).toBe(true)
            expect(this.state.getIn(['verbd','passed'])).toBe(false)
        })

        it('ON_CLICK_SAVE_VERBD, update', function() {
            expect(this.state.getIn(['verbd','updateVerbd'])).toBe(false)
            expect(this.state.getIn(['verbd','passed'])).toBe(false)

            this.dispatch({
                type: VerbdAEActionTypes.ON_CLICK_SAVE_VERBD,
                verbd: {id:'1'} // id means update
            })

            expect(this.state.getIn(['verbd','updateVerbd'])).toBe(true)
            expect(this.state.getIn(['verbd','passed'])).toBe(false)
        })

        it('ON_CLICK_DELETE_VERBD, update', function() {
            expect(this.state.getIn(['verbd','deleteVerbd'])).toBe(false)
            expect(this.state.getIn(['verbd','passed'])).toBe(false)

            this.dispatch({
                type: VerbdAEActionTypes.ON_CLICK_DELETE_VERBD
            })

            expect(this.state.getIn(['verbd','deleteVerbd'])).toBe(true)
            expect(this.state.getIn(['verbd','passed'])).toBe(false)
        })

        it('Pass the quiz.', function() {
            expect(this.state.getIn(['verbd','passed'])).toBe(false)

            this.dispatch({
                type: VerbdAEActionTypes.ON_CLICK_SAVE_VERBD,
                verbd: {} // no id means insert new verbd
            })

            this.dispatch({
                type: VerbdAEActionTypes.ON_CLICK_SAVE_VERBD,
                verbd: {id:'1'} // id means update
            })

            this.dispatch({
                type: VerbdAEActionTypes.ON_CLICK_DELETE_VERBD
            })

            expect(this.state.getIn(['verbd','passed'])).toBe(true)
        })
    })

    // 3. adjectivd
    describe('adjectivd', function() {

        it('ON_CLICK_SAVE_ADJECTIVD, insert', function() {
            expect(this.state.getIn(['adjectivd','insertAdjectivd'])).toBe(false)
            expect(this.state.getIn(['adjectivd','passed'])).toBe(false)

            this.dispatch({
                type: AdjectivdAEActionTypes.ON_CLICK_SAVE_ADJECTIVD,
                adjectivd: {} // no id means insert new adjectivd
            })

            expect(this.state.getIn(['adjectivd','insertAdjectivd'])).toBe(true)
            expect(this.state.getIn(['adjectivd','passed'])).toBe(false)
        })

        it('ON_CLICK_SAVE_ADJECTIVD, update', function() {
            expect(this.state.getIn(['adjectivd','updateAdjectivd'])).toBe(false)
            expect(this.state.getIn(['adjectivd','passed'])).toBe(false)

            this.dispatch({
                type: AdjectivdAEActionTypes.ON_CLICK_SAVE_ADJECTIVD,
                adjectivd: {id:'1'} // id means update
            })

            expect(this.state.getIn(['adjectivd','updateAdjectivd'])).toBe(true)
            expect(this.state.getIn(['adjectivd','passed'])).toBe(false)
        })

        it('ON_CLICK_DELETE_ADJECTIVD, update', function() {
            expect(this.state.getIn(['adjectivd','deleteAdjectivd'])).toBe(false)
            expect(this.state.getIn(['adjectivd','passed'])).toBe(false)

            this.dispatch({
                type: AdjectivdAEActionTypes.ON_CLICK_DELETE_ADJECTIVD
            })

            expect(this.state.getIn(['adjectivd','deleteAdjectivd'])).toBe(true)
            expect(this.state.getIn(['adjectivd','passed'])).toBe(false)
        })

        it('Pass the quiz.', function() {
            expect(this.state.getIn(['adjectivd','passed'])).toBe(false)

            this.dispatch({
                type: AdjectivdAEActionTypes.ON_CLICK_SAVE_ADJECTIVD,
                adjectivd: {} // no id means insert new adjectivd
            })

            this.dispatch({
                type: AdjectivdAEActionTypes.ON_CLICK_SAVE_ADJECTIVD,
                adjectivd: {id:'1'} // id means update
            })

            this.dispatch({
                type: AdjectivdAEActionTypes.ON_CLICK_DELETE_ADJECTIVD
            })

            expect(this.state.getIn(['adjectivd','passed'])).toBe(true)
        })
    })

    // 4. definiteness
    describe('definiteness', function() {

        it('ON_CHANGE_SELECTED_NOUND', function() {
            expect(this.state.getIn(['definiteness','noundChanged'])).toBe(false)
            expect(this.state.getIn(['definiteness','passed'])).toBe(false)
            this.dispatch({
                type: NoundActionTypes.ON_CHANGE_SELECTED_NOUND,
            })

            expect(this.state.getIn(['definiteness','noundChanged'])).toBe(true)
            expect(this.state.getIn(['definiteness','passed'])).toBe(false)
        })

        it('ON_CHANGE_DEFINITENESS', function() {
            expect(this.state.getIn(['definiteness','definitenessChanged'])).toBe(false)
            expect(this.state.getIn(['definiteness','passed'])).toBe(false)

            this.dispatch({
                type: NouniAEActionTypes.ON_CHANGE_DEFINITENESS
            })

            expect(this.state.getIn(['definiteness','definitenessChanged'])).toBe(true)
            expect(this.state.getIn(['definiteness','passed'])).toBe(false)
        })

        it('ON_ISEE_CHANGE_ARTICLE', function() {
            expect(this.state.getIn(['definiteness','iseeArticleChanged'])).toBe(false)
            expect(this.state.getIn(['definiteness','passed'])).toBe(false)

            this.dispatch({
                type: QuizActionTypes.definiteness.ON_ISEE_CHANGE_ARTICLE
            })

            expect(this.state.getIn(['definiteness','iseeArticleChanged'])).toBe(true)
            expect(this.state.getIn(['definiteness','passed'])).toBe(false)
        })

        it('Pass the quiz.', function() {
            expect(this.state.getIn(['definiteness','passed'])).toBe(false)

            this.dispatch({
                type: NoundActionTypes.ON_CHANGE_SELECTED_NOUND,
            })

            this.dispatch({
                type: NouniAEActionTypes.ON_CHANGE_DEFINITENESS
            })

            this.dispatch({
                type: QuizActionTypes.definiteness.ON_ISEE_CHANGE_ARTICLE
            })

            expect(this.state.getIn(['definiteness','passed'])).toBe(true)
        })
    })

    // 5. phrases
    it('phrases ON_I_UNDERSTAND', function() {
        expect(this.state.getIn(['phrases','iunderstand'])).toBe(false)
        expect(this.state.getIn(['phrases','passed'])).toBe(false)

        this.dispatch({
            type: QuizActionTypes.phrases.ON_I_UNDERSTAND
        })

        expect(this.state.getIn(['phrases','iunderstand'])).toBe(true)
        expect(this.state.getIn(['phrases','passed'])).toBe(true)
    })

    // 6. nounPhrases
    it('nounPhrases ON_I_UNDERSTAND', function() {
        expect(this.state.getIn(['nounPhrases','iunderstand'])).toBe(false)
        expect(this.state.getIn(['nounPhrases','passed'])).toBe(false)

        this.dispatch({
            type: QuizActionTypes.nounPhrases.ON_I_UNDERSTAND
        })

        expect(this.state.getIn(['nounPhrases','iunderstand'])).toBe(true)
        expect(this.state.getIn(['nounPhrases','passed'])).toBe(true)
    })

})
