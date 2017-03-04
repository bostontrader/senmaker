import AppActionTypes from './AppActionTypes'
import AppDispatcher from './AppDispatcher'

// Singleton. These functions are called by the UI.  They are intermediary conveniences and are not
// strictly required. We could instead call the dispatcher directly.
const AppActions = {
    levelPrevious() {
        AppDispatcher.dispatch({
            type: AppActionTypes.LEVEL_PREVIOUS
        })
    },
    levelNext() {
        console.log('AppActions.levelNext')
        AppDispatcher.dispatch({
            type: AppActionTypes.LEVEL_NEXT
        })
    },
    levelReset() {
        AppDispatcher.dispatch({
            type: AppActionTypes.LEVEL_RESET
        })
    }
}

export default AppActions
