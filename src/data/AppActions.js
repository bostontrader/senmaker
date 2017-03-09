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
    quizToggle() {
        AppDispatcher.dispatch({
            type: AppActionTypes.QUIZ_TOGGLE
        })
    }
}

export default AppActions
