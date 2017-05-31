// @flow
import AppActionTypes from './AppActionTypes'
import AppDispatcher from '../AppDispatcher'

const AppActions:Object = {

    onAppReset():void {
        AppDispatcher.dispatch({
            type: AppActionTypes.ON_CLICK_APP_RESET
        })
    },
    onClickExamples(store:string):void {
        AppDispatcher.dispatch({
            type: AppActionTypes.ON_CLICK_EXAMPLES,
            store: store
        })
    },
    onLessonPrevious():void {
        AppDispatcher.dispatch({
            type: AppActionTypes.ON_CLICK_LESSON_PREVIOUS
        })
    },
    onLessonNext():void {
        AppDispatcher.dispatch({
            type: AppActionTypes.ON_CLICK_LESSON_NEXT
        })
    }

}

export default AppActions
