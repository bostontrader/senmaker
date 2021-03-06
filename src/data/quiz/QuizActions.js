// @flow
import QuizActionTypes from './QuizActionTypes'
import AppDispatcher   from '../AppDispatcher'

const QuizActions:Object = {

    // 0
    intro: {
        onIUnderstand() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.intro.ON_I_UNDERSTAND
            })
        },
    },

    // 2
    definiteness: {
        onIseeArticleChanged() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.definiteness.ON_ISEE_CHANGE_ARTICLE
            })
        }
    },

    // 3
    phrase: {
        onIUnderstand() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.phrase.ON_I_UNDERSTAND
            })
        },
    },

    // 6
    npAdjective: {
        onIUnderstand() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.npAdjective.ON_I_UNDERSTAND
            })
        },
    },

    // 8
    verbConjugation: {
        onIUnderstand() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.verbConjugation.ON_I_UNDERSTAND
            })
        },
    },

    // 9
    pastForm: {
        onIUnderstand() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.pastForm.ON_I_UNDERSTAND
            })
        },
    },

    // 10
    verbTime: {
        onIUnderstand() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.verbTime.ON_I_UNDERSTAND
            })
        },
    },

    // 12
    clause: {
        onIUnderstand() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.clause.ON_I_UNDERSTAND
            })
        },
    },    //
    /*sentence: {
        onIUnderstand() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.sentence.ON_I_UNDERSTAND
            })
        },
    },

    //
    pluralization: {
        onIUnderstand() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.pluralization.ON_I_UNDERSTAND
            })
        },
    }*/
}

export default QuizActions
