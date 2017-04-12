import QuizActionTypes from './QuizActionTypes'
import AppDispatcher from '../AppDispatcher'

const QuizActions = {

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
    nouni: {
        onIUnderstand() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.nouni.ON_I_UNDERSTAND
            })
        },
    },
    phrases: {
        onIUnderstand() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.phrases.ON_I_UNDERSTAND
            })
        },
    },
    nounPhrases: {
        onIUnderstand() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.nounPhrases.ON_I_UNDERSTAND
            })
        },
    }
}

export default QuizActions
