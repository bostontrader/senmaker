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
        console.log('AppActions setQuizScore =',score)
        AppDispatcher.dispatch({
            type: AppActionTypes.QUIZ_SETSCORE,
            score: score
        })
    }
}

export default AppActions
