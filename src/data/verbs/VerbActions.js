import VerbActionTypes from './VerbActionTypes'
import AppDispatcher from '../AppDispatcher'

const Actions = {
    addVerb(verb) {
        AppDispatcher.dispatch({
            type: VerbActionTypes.ADD_VERB
        })
    },
    changeBase(base) {
        AppDispatcher.dispatch({
            type: VerbActionTypes.CHANGE_BASE,
            base: base
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
    },
    updateVerb(verb) {
        AppDispatcher.dispatch({
            type: VerbActionTypes.UPDATE_VERB,
            verb
        })
    }
}

export default Actions
