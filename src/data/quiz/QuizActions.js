// @flow
import QuizActionTypes from './QuizActionTypes'
import AppDispatcher from '../AppDispatcher'

const QuizActions:Object = {

    intro: {
        onIUnderstand() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.intro.ON_I_UNDERSTAND
            })
        },
    },
    definiteness: {
        onIseeArticleChanged() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.definiteness.ON_ISEE_CHANGE_ARTICLE
            })
        }
    },
    phrase: {
        onIUnderstand() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.phrase.ON_I_UNDERSTAND2
            })
        },
    },
    sentence: {
        onIUnderstand() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.sentence.ON_I_UNDERSTAND3
            })
        },
    },
    pluralization: {
        onIUnderstand() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.pluralization.ON_I_UNDERSTAND4
            })
        },
    }
}

export default QuizActions
