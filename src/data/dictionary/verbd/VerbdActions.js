import VerbdActionTypes from './VerbdActionTypes'
import AppDispatcher from '../../AppDispatcher'

const VerbdActions = {
    // Programmatic insert, no UI
    insertVerbd(verbd) {
        AppDispatcher.dispatch({
            type: VerbdActionTypes.INSERT_VERBD,
            verbd: verbd
        })
    }
}

export default VerbdActions
