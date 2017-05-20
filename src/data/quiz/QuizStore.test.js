import QuizActionTypes      from './QuizActionTypes'
import QuizStore            from './QuizStore'
import AdjectivdActionTypes from '../dictionary/adjectivd/AdjectivdActionTypes'
import NoundActionTypes     from '../dictionary/nound/NoundActionTypes'
import VerbdActionTypes     from '../dictionary/verbd/VerbdActionTypes'
import NPActionTypes        from '../np/NPActionTypes'

/**
 * For each lesson tested, it's sufficient to test each individual
 * question and verify that the quiz has not passed.  Then in a final test,
 * answer all questions and verify that the quiz has indeed passed.  The order
 * of answering these questions is hereby deemed unimportant, hence no need to
 * check all the permutations of question answering order.
 */
describe('QuizStore', () => {

    let state

    beforeEach(() => {state = QuizStore.getInitialState()})

    // 0. intro
    it('intro ON_I_UNDERSTAND', () => {
        expect(state.getIn(['intro','iunderstand'])).toBe(false)
        expect(state.getIn(['intro','passed'])).toBe(false)

        state = QuizStore.reduce(state, {type: QuizActionTypes.intro.ON_I_UNDERSTAND})
        expect(state.getIn(['intro','iunderstand'])).toBe(true)
        expect(state.getIn(['intro','passed'])).toBe(true)
    })

    // 1. nound
    describe('nound', () => {

        it('ON_CLICK_SAVE_NOUND, insert', () => {
            expect(state.getIn(['nound','insertNound'])).toBe(false)
            expect(state.getIn(['nound','passed'])).toBe(false)

            state = QuizStore.reduce(state, {
                type: NoundActionTypes.ON_CLICK_SAVE_NOUND,
                nound: {}
            }) // no id means insert new nound

            expect(state.getIn(['nound','insertNound'])).toBe(true)
            expect(state.getIn(['nound','passed'])).toBe(false)
        })

        it('ON_CLICK_SAVE_NOUND, update', () => {
            expect(state.getIn(['nound','updateNound'])).toBe(false)
            expect(state.getIn(['nound','passed'])).toBe(false)

            state = QuizStore.reduce(state, {
                type: NoundActionTypes.ON_CLICK_SAVE_NOUND,
                nound: {id:'1'} // id means update
            })
            expect(state.getIn(['nound','updateNound'])).toBe(true)
            expect(state.getIn(['nound','passed'])).toBe(false)
        })

        it('ON_CLICK_DELETE_NOUND, update', () => {
            expect(state.getIn(['nound','deleteNound'])).toBe(false)
            expect(state.getIn(['nound','passed'])).toBe(false)

            state = QuizStore.reduce(state, {type: NoundActionTypes.ON_CLICK_DELETE_NOUND})
            expect(state.getIn(['nound','deleteNound'])).toBe(true)
            expect(state.getIn(['nound','passed'])).toBe(false)
        })

        it('Pass the quiz.', () => {
            expect(state.getIn(['nound','passed'])).toBe(false)

            state = QuizStore.reduce(state, {
                type: NoundActionTypes.ON_CLICK_SAVE_NOUND,
                nound: {} // no id means insert new nound
            })

            state = QuizStore.reduce(state, {
                type: NoundActionTypes.ON_CLICK_SAVE_NOUND,
                nound: {id:'1'} // id means update
            })

            state = QuizStore.reduce(state, {type: NoundActionTypes.ON_CLICK_DELETE_NOUND})

            expect(state.getIn(['nound','passed'])).toBe(true)
        })
    })

    // 2. definiteness
    describe('definiteness', () => {

        it('ON_CHANGE_SELECTED_NOUND', () => {
            expect(state.getIn(['definiteness','noundChanged'])).toBe(false)
            expect(state.getIn(['definiteness','passed'])).toBe(false)

            state = QuizStore.reduce(state, {type: NPActionTypes.ON_CHANGE_SELECTED_NOUND_L1,})
            expect(state.getIn(['definiteness','noundChanged'])).toBe(true)
            expect(state.getIn(['definiteness','passed'])).toBe(false)
        })

        it('ON_CHANGE_DEFINITENESS', () => {
            expect(state.getIn(['definiteness','definitenessChanged'])).toBe(false)
            expect(state.getIn(['definiteness','passed'])).toBe(false)

            state = QuizStore.reduce(state, {type: NPActionTypes.ON_CHANGE_DEFINITENESS_L1})

            expect(state.getIn(['definiteness','definitenessChanged'])).toBe(true)
            expect(state.getIn(['definiteness','passed'])).toBe(false)
        })

        it('ON_ISEE_CHANGE_ARTICLE', () => {
            expect(state.getIn(['definiteness','iseeArticleChanged'])).toBe(false)
            expect(state.getIn(['definiteness','passed'])).toBe(false)

            state = QuizStore.reduce(state, {type: QuizActionTypes.definiteness.ON_ISEE_CHANGE_ARTICLE})
            expect(state.getIn(['definiteness','iseeArticleChanged'])).toBe(true)
            expect(state.getIn(['definiteness','passed'])).toBe(false)
        })

        it('Pass the quiz.', () => {
            expect(state.getIn(['definiteness','passed'])).toBe(false)

            state = QuizStore.reduce(state, {type: NPActionTypes.ON_CHANGE_SELECTED_NOUND_L1,})
            state = QuizStore.reduce(state, {type: NPActionTypes.ON_CHANGE_DEFINITENESS_L1})
            state = QuizStore.reduce(state, {type: QuizActionTypes.definiteness.ON_ISEE_CHANGE_ARTICLE})

            expect(state.getIn(['definiteness','passed'])).toBe(true)
        })
    })

    // 3. phrase
    it('phrase ON_I_UNDERSTAND', () => {
        expect(state.getIn(['phrase','iunderstand'])).toBe(false)
        expect(state.getIn(['phrase','passed'])).toBe(false)

        state = QuizStore.reduce(state, {type: QuizActionTypes.phrase.ON_I_UNDERSTAND})
        expect(state.getIn(['phrase','iunderstand'])).toBe(true)
        expect(state.getIn(['phrase','passed'])).toBe(true)
    })

    // 4. nounPhrase
    /*describe('nounPhrase', () => {

        it('ON_CLICK_SAVE_NP, insert', () => {
            expect(state.getIn(['np','insertNP'])).toBe(false)
            expect(state.getIn(['np','passed'])).toBe(false)

            state = QuizStore.reduce(state, {type: NPActionTypes.ON_CLICK_SAVE_NP, np: {}}) // no id means insert new np
            expect(state.getIn(['np','insertNP'])).toBe(true)
            expect(state.getIn(['np','passed'])).toBe(false)
        })

        it('ON_CLICK_SAVE_NP, update', () => {
            expect(state.getIn(['np','updateNP'])).toBe(false)
            expect(state.getIn(['np','passed'])).toBe(false)

            state = QuizStore.reduce(state, {type: NPActionTypes.ON_CLICK_SAVE_NP, np: {id:'1'}}) // id means update
            expect(state.getIn(['np','updateNP'])).toBe(true)
            expect(state.getIn(['np','passed'])).toBe(false)
        })

        it('ON_CLICK_DELETE_NP, update', () => {
            expect(state.getIn(['np','deleteNP'])).toBe(false)
            expect(state.getIn(['np','passed'])).toBe(false)

            state = QuizStore.reduce(state, {type: NPActionTypes.ON_CLICK_DELETE_NP})
            expect(state.getIn(['np','deleteNP'])).toBe(true)
            expect(state.getIn(['np','passed'])).toBe(false)
        })

        it('Pass the quiz.', () => {
            expect(state.getIn(['np','passed'])).toBe(false)

            state = QuizStore.reduce(state, {type: NPActionTypes.ON_CLICK_SAVE_NP, np: {}})
            state = QuizStore.reduce(state, {type: NPActionTypes.ON_CLICK_SAVE_NP, np: {id:'1'}})
            state = QuizStore.reduce(state, {type: NPActionTypes.ON_CLICK_DELETE_NP})

            expect(state.getIn(['np','passed'])).toBe(true)
        })
    })*/

    // 5. adjectivd
    describe('adjectivd', () => {

        it('ON_CLICK_SAVE_ADJECTIVD, insert', () => {
            expect(state.getIn(['adjectivd','insertAdjectivd'])).toBe(false)
            expect(state.getIn(['adjectivd','passed'])).toBe(false)

            state = QuizStore.reduce(state, {type: AdjectivdActionTypes.ON_CLICK_SAVE_ADJECTIVD, adjectivd: {}}) // no id means insert new adjectivd
            expect(state.getIn(['adjectivd','insertAdjectivd'])).toBe(true)
            expect(state.getIn(['adjectivd','passed'])).toBe(false)
        })

        it('ON_CLICK_SAVE_ADJECTIVD, update', () => {
            expect(state.getIn(['adjectivd','updateAdjectivd'])).toBe(false)
            expect(state.getIn(['adjectivd','passed'])).toBe(false)

            state = QuizStore.reduce(state, {type: AdjectivdActionTypes.ON_CLICK_SAVE_ADJECTIVD, adjectivd: {id:'1'}}) // id means update
            expect(state.getIn(['adjectivd','updateAdjectivd'])).toBe(true)
            expect(state.getIn(['adjectivd','passed'])).toBe(false)
        })

        it('ON_CLICK_DELETE_ADJECTIVD, update', () => {
            expect(state.getIn(['adjectivd','deleteAdjectivd'])).toBe(false)
            expect(state.getIn(['adjectivd','passed'])).toBe(false)

            state = QuizStore.reduce(state, {type: AdjectivdActionTypes.ON_CLICK_DELETE_ADJECTIVD})
            expect(state.getIn(['adjectivd','deleteAdjectivd'])).toBe(true)
            expect(state.getIn(['adjectivd','passed'])).toBe(false)
        })

        it('Pass the quiz.', () => {
            expect(state.getIn(['adjectivd','passed'])).toBe(false)

            state = QuizStore.reduce(state, {type: AdjectivdActionTypes.ON_CLICK_SAVE_ADJECTIVD, adjectivd: {}}) // no id means insert new adjectivd
            state = QuizStore.reduce(state, {type: AdjectivdActionTypes.ON_CLICK_SAVE_ADJECTIVD, adjectivd: {id:'1'}}) // id means update
            state = QuizStore.reduce(state, {type: AdjectivdActionTypes.ON_CLICK_DELETE_ADJECTIVD})

            expect(state.getIn(['adjectivd','passed'])).toBe(true)
        })
    })

    // 6. npAdjective

    // 7. verbd
    describe('verbd', () => {

        it('ON_CLICK_SAVE_VERBD, insert', () => {
            expect(state.getIn(['verbd','insertVerbd'])).toBe(false)
            expect(state.getIn(['verbd','passed'])).toBe(false)

            state = QuizStore.reduce(state, {
                type: VerbdActionTypes.ON_CLICK_SAVE_VERBD,
                verbd: {}
            }) // no id means insert new verbd

            expect(state.getIn(['verbd','insertVerbd'])).toBe(true)
            expect(state.getIn(['verbd','passed'])).toBe(false)
        })

        it('ON_CLICK_SAVE_VERBD, update', () => {
            expect(state.getIn(['verbd','updateVerbd'])).toBe(false)
            expect(state.getIn(['verbd','passed'])).toBe(false)

            state = QuizStore.reduce(state, {
            type: VerbdActionTypes.ON_CLICK_SAVE_VERBD,
            verbd: {id:'1'} // id means update
            })
            expect(state.getIn(['verbd','updateVerbd'])).toBe(true)
            expect(state.getIn(['verbd','passed'])).toBe(false)
        })

        it('ON_CLICK_DELETE_VERBD, update', () => {
            expect(state.getIn(['verbd','deleteVerbd'])).toBe(false)
            expect(state.getIn(['verbd','passed'])).toBe(false)

            state = QuizStore.reduce(state, {type: VerbdActionTypes.ON_CLICK_DELETE_VERBD})
            expect(state.getIn(['verbd','deleteVerbd'])).toBe(true)
            expect(state.getIn(['verbd','passed'])).toBe(false)
        })

        it('Pass the quiz.', () => {
            expect(state.getIn(['verbd','passed'])).toBe(false)

            state = QuizStore.reduce(state, {
            type: VerbdActionTypes.ON_CLICK_SAVE_VERBD,
            verbd: {} // no id means insert new verbd
            })

            state = QuizStore.reduce(state, {
            type: VerbdActionTypes.ON_CLICK_SAVE_VERBD,
            verbd: {id:'1'} // id means update
            })

            state = QuizStore.reduce(state, {type: VerbdActionTypes.ON_CLICK_DELETE_VERBD})

            expect(state.getIn(['verbd','passed'])).toBe(true)
        })
    })


    /*// 7. verbConjugation
    it('verbConjugation ON_I_UNDERSTAND', () => {
        expect(state.getIn(['verbConjugation','iunderstand'])).toBe(false)
        expect(state.getIn(['verbConjugation','passed'])).toBe(false)

        this.dispatch({
            type: QuizActionTypes.verbConjugation.ON_I_UNDERSTAND
        })

        expect(state.getIn(['verbConjugation','iunderstand'])).toBe(true)
        expect(state.getIn(['verbConjugation','passed'])).toBe(true)
    })*/

})
