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
    phrase: {
        onIUnderstand() {
            AppDispatcher.dispatch({
                type: QuizActionTypes.phrase.ON_I_UNDERSTAND
            })
        },
    }
}

export default QuizActions
