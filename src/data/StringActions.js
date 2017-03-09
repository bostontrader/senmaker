import StringActionTypes from './StringActionTypes'
import AppDispatcher from './AppDispatcher'

const StringActions = {
    langEng() {
        AppDispatcher.dispatch({
            type: StringActionTypes.LANG_EN
        })
    },
    langChn() {
        AppDispatcher.dispatch({
            type: StringActionTypes.LANG_ZH
        })
    }
}

export default StringActions
