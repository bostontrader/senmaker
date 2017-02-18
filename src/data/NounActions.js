import NounActionTypes from './NounActionTypes'
import NounDispatcher from './NounDispatcher'

// Singleton. These functions are called by the UI.  It's an intermediary convenience but it's not required
// because we could call the dispatcher directly.
const Actions = {
    addNoun(noun) {
        NounDispatcher.dispatch({
            type: NounActionTypes.ADD_NOUN,
            noun
        })
    },
    deleteNoun(id) {
        NounDispatcher.dispatch({
            type: NounActionTypes.DELETE_NOUN,
            id
        })
    },
    editNoun(noun) {
        NounDispatcher.dispatch({
            type: NounActionTypes.EDIT_NOUN,
            noun
        })
    },
}

export default Actions