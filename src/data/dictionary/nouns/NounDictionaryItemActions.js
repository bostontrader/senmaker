import NounDictionaryItemActionTypes from './NounDictionaryItemActionTypes'
import AppDispatcher from '../../AppDispatcher'

const NounDictionaryItemActions = {
    addNoun() {
        AppDispatcher.dispatch({
            type: NounDictionaryItemActionTypes.ADD_NOUN
        })
    },
    changeBase(base) {
        AppDispatcher.dispatch({
            type: NounDictionaryItemActionTypes.CHANGE_BASE,
            base: base
        })
    },
    changeDefiniteness(newDefiniteness) {
        AppDispatcher.dispatch({
            type: NounDictionaryItemActionTypes.CHANGE_DEFINITENESS,
            newDefiniteness: newDefiniteness
        })
    },
    cancel() {
        AppDispatcher.dispatch({
            type: NounDictionaryItemActionTypes.CANCEL
        })
    },
    deleteNoun(id) {
        AppDispatcher.dispatch({
            type: NounDictionaryItemActionTypes.DELETE_NOUN,
            id
        })
    },
    editNoun(noun) {
        AppDispatcher.dispatch({
            type: NounDictionaryItemActionTypes.EDIT_NOUN,
            payload: {noun: noun}
        })
    },
    insertNoun(payload) {
        AppDispatcher.dispatch({
            type: NounDictionaryItemActionTypes.INSERT_NOUN,
            ui:payload.ui,
            noun: payload.noun
        })
    },
    updateNoun(noun) {
        AppDispatcher.dispatch({
            type: NounDictionaryItemActionTypes.UPDATE_NOUN,
            noun
        })
    }
}

export default NounDictionaryItemActions
