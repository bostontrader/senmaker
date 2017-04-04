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
    //onLangEng() {
        //AppDispatcher.dispatch({
            //type: AppActionTypes.ON_LANG_ENG
        //})
    //},
    //onLangChn() {
        //AppDispatcher.dispatch({
            //type: AppActionTypes.ON_LANG_CHN
        //})
    //},
    onLessonNext() {
        AppDispatcher.dispatch({
            type: AppActionTypes.ON_LESSON_NEXT
        })
    },

    // Nouni
    //changeDefiniteness(newDefiniteness) {
    //console.log('AppActions.changeDefiniteness =', newDefiniteness)

    //AppDispatcher.dispatch({
    //type: AppActionTypes.CHANGE_DEFINITENESS,
    //newDefiniteness: newDefiniteness
    //})
    //},
    //insertNouni(payload) {
    //console.log('AppActions.insertNouni =', payload)

    //AppDispatcher.dispatch({
    //type: AppActionTypes.INSERT_NOUNI,
    //ui:payload.ui,
    //nouni: payload.nouni
    //})
    //},
    // score: boolean true = pass, false = not pass. Applies to the present level.
    //setQuizScore(score) {
        //console.log('AppActions setQuizScore ',score)
        //AppDispatcher.dispatch({
            //type: AppActionTypes.QUIZ_SETSCORE,
            //score: score
        //})
    //}

}

export default AppActions
