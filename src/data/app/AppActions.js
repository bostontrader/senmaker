import AppActionTypes from './AppActionTypes'
import AppDispatcher from '../AppDispatcher'

const AppActions = {

    onAppReset() {
        AppDispatcher.dispatch({
            type: AppActionTypes.ON_APP_RESET
        })
    },
    onLessonPrevious() {
        AppDispatcher.dispatch({
            type: AppActionTypes.ON_LESSON_PREVIOUS
        })
    },
    onLessonNext() {
        AppDispatcher.dispatch({
            type: AppActionTypes.ON_LESSON_NEXT
        })
    }

}

export default AppActions
