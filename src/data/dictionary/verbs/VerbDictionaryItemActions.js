import VerbActionTypes from './VerbDictionaryActionTypes'
import AppDispatcher from '../../AppDispatcher'

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
            payload: {verb: verb}
        })
    },
    insertVerb(payload) {
        AppDispatcher.dispatch({
            type: VerbActionTypes.INSERT_VERB,
            ui:payload.ui,
            verb: payload.verb
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
