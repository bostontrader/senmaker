import VerbActionTypes from './VerbActionTypes'
import AppDispatcher from '../AppDispatcher'

// Singleton. These functions are called by the UI.  They are intermediary conveniences and are not
// strictly required. We could instead call the dispatcher directly.
const Actions = {
    addVerb(verb) {
        AppDispatcher.dispatch({
            type: VerbActionTypes.ADD_VERB
        })
    },
    cancel() {
        AppDispatcher.dispatch({
            type: VerbActionTypes.CANCEL
        })
    },
    deleteVerb(id) {
        AppDispatcher.dispatch({
            type: VerbActionTypes.DELETE_VERB,
            id
        })
    },
    editVerb(verb) {
        AppDispatcher.dispatch({
            type: VerbActionTypes.EDIT_VERB,
            verb
        })
    },
    insertVerb(verb) {
        AppDispatcher.dispatch({
            type: VerbActionTypes.INSERT_VERB,
            verb
        })
    }
}

export default Actions
