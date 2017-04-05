import NoundActionTypes from './NoundActionTypes'
import AppDispatcher    from '../../AppDispatcher'

const NoundActions = {
    // Programmatic insert, no UI
    insertNound(nound) {
        AppDispatcher.dispatch({
            type: NoundActionTypes.INSERT_NOUND,
            nound: nound
        })
    },
    onChangeSelectedNound(nound) {
        AppDispatcher.dispatch({
            type: NoundActionTypes.ON_CHANGE_SELECTED_NOUND,
            nound: nound
        })
    }
}

export default NoundActions
