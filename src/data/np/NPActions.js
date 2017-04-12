import NPActionTypes from './NPActionTypes'
import AppDispatcher from '../AppDispatcher'

const NPActions = {
    // Programmatic insert, no UI
    insertNP(nound) {
        AppDispatcher.dispatch({
            type: NPActionTypes.INSERT_NP,
            nound: nound
        })
    },
    //onChangeSelectedNP(nound) {
        //AppDispatcher.dispatch({
            //type: NPActionTypes.ON_CHANGE_SELECTED_NP,
            //nound: nound
        //})
    //}
}

export default NPActions
