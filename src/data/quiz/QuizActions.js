// @flow
import QuizActionTypes from './QuizActionTypes'
import AppDispatcher from '../AppDispatcher'

const QuizActions:Object = {

    // 0
    intro: {
        onIUnderstand() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.intro.ON_I_UNDERSTAND
            })
        },
    },

    // 4
    definiteness: {
        onIseeArticleChanged() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.definiteness.ON_ISEE_CHANGE_ARTICLE
            })
        }
    },

    // 5
    phrase: {
        onIUnderstand() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.phrase.ON_I_UNDERSTAND
            })
        },
    },

    // 7
    verbConjugation: {
        onIUnderstand() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.verbConjugation.ON_I_UNDERSTAND
            })
        },
    },

    // 11
    sentence: {
        onIUnderstand() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.sentence.ON_I_UNDERSTAND
            })
        },
    },

    // 12
    pluralization: {
        onIUnderstand() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.pluralization.ON_I_UNDERSTAND
            })
        },
    }
}

export default QuizActions
