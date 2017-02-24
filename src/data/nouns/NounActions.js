import NounActionTypes from './NounActionTypes'
import AppDispatcher from '../AppDispatcher'

// Singleton. These functions are called by the UI.  They are intermediary conveniences and are not
// strictly required. We could instead call the dispatcher directly.
const Actions = {
    addNoun(noun) {
        AppDispatcher.dispatch({
            type: NounActionTypes.ADD_NOUN
        })
    },
    cancel() {
        AppDispatcher.dispatch({
            type: NounActionTypes.CANCEL
        })
    },
    deleteNoun(id) {
        AppDispatcher.dispatch({
            type: NounActionTypes.DELETE_NOUN,
            id
        })
    },
    editNoun(noun) {
        AppDispatcher.dispatch({
            type: NounActionTypes.EDIT_NOUN,
            noun
        })
    },
    insertNoun(noun) {
        AppDispatcher.dispatch({
            type: NounActionTypes.INSERT_NOUN,
            noun
        })
    }
}

export default Actions
