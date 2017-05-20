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

    //
    /*verbConjugation: {
        onIUnderstand() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.verbConjugation.ON_I_UNDERSTAND
            })
        },
    },

    //
    sentence: {
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
