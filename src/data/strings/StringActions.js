import AppActionTypes    from '../app/AppActionTypes'
import AppDispatcher     from '../AppDispatcher'
import StringActionTypes from './StringActionTypes'

const StringActions = {
    onAppReset() {
        AppDispatcher.dispatch({
            type: AppActionTypes.ON_CLICK_APP_RESET
        })
    },
    onLangEN() {
        AppDispatcher.dispatch({
            type: StringActionTypes.ON_LANG_EN
        })
    },
    onLangZH() {
        AppDispatcher.dispatch({
            type: StringActionTypes.ON_LANG_ZH
        })
    }
}

export default StringActions
