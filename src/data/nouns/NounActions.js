import NounActionTypes from './NounActionTypes'
import AppDispatcher from '../AppDispatcher'

const Actions = {
    addNoun(noun) {
        AppDispatcher.dispatch({
            type: NounActionTypes.ADD_NOUN
        })
    },
    changeBase(base) {
        AppDispatcher.dispatch({
            type: NounActionTypes.CHANGE_BASE,
            base: base
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
            payload: {noun: noun}
        })
    },
    insertNoun(payload) {
        AppDispatcher.dispatch({
            type: NounActionTypes.INSERT_NOUN,
            ui:payload.ui,
            noun: payload.noun
        })
    },
    updateNoun(noun) {
        AppDispatcher.dispatch({
            type: NounActionTypes.UPDATE_NOUN,
            noun
        })
    }
}

export default Actions
