import AppActionTypes from './AppActionTypes'
import AppDispatcher from './AppDispatcher'

const AppActions = {
    levelPrevious() {
        AppDispatcher.dispatch({
            type: AppActionTypes.LEVEL_PREVIOUS
        })
    },
    levelNext() {
        AppDispatcher.dispatch({
            type: AppActionTypes.LEVEL_NEXT
        })
    },
    levelReset() {
        AppDispatcher.dispatch({
            type: AppActionTypes.LEVEL_RESET
        })
    },

    // score: boolean true = pass, false = not pass. Applies to the present level.
    setQuizScore(score) {
        AppDispatcher.dispatch({
            type: AppActionTypes.QUIZ_SETSCORE,
            score: score
        })
    },

    // Nouns
    changeDefiniteness(newDefiniteness) {
        AppDispatcher.dispatch({
            type: AppActionTypes.CHANGE_DEFINITENESS,
            newDefiniteness: newDefiniteness
        })
    }

}

export default AppActions
