import NounActionTypes from './NounActionTypes'
import NounDispatcher from './NounDispatcher'

const Actions = {
    addNoun(text) {
        NounDispatcher.dispatch({
            type: NounActionTypes.ADD_NOUN,
            text
        })
    },

    deleteCompletedNoun() {
        NounDispatcher.dispatch({
            type: NounActionTypes.DELETE_COMPLETED_NOUNS
        })
    },

    deleteNoun(id) {
        NounDispatcher.dispatch({
            type: NounActionTypes.DELETE_NOUN,
            id
        })
    },

    editNoun(id, text) {
        NounDispatcher.dispatch({
            type: NounActionTypes.EDIT_NOUN,
            id,
            text
        })
    },

    startEditingNoun(id) {
        NounDispatcher.dispatch({
            type: NounActionTypes.START_EDITING_NOUN,
            id
        })
    },

    stopEditingNoun() {
        NounDispatcher.dispatch({
            type: NounActionTypes.STOP_EDITING_NOUN
        })
    },

    toggleAllNouns() {
        NounDispatcher.dispatch({
            type: NounActionTypes.TOGGLE_ALL_NOUNS
        })
    },

    toggleNoun(id) {
        NounDispatcher.dispatch({
            type: NounActionTypes.TOGGLE_NOUN,
            id
        })
    },

    updateDraft(id) {
        NounDispatcher.dispatch({
            type: NounActionTypes.UPDATE_DRAFT,
            id
        })
    }
}

export default Actions