import NounActionTypes from './NounActionTypes'
import NounDispatcher from './NounDispatcher'

// Singleton. These functions are called by the UI.  They are intermediary conveniences and are not
// strictly required. We could instead call the dispatcher directly.
const Actions = {
    addNoun(noun) {
        NounDispatcher.dispatch({
            type: NounActionTypes.ADD_NOUN
        })
    },
    cancel() {
        NounDispatcher.dispatch({
            type: NounActionTypes.CANCEL
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
    insertNoun(noun) {
        console.log('NounActions.insertNoun')
        NounDispatcher.dispatch({
            type: NounActionTypes.INSERT_NOUN,
            noun
        })
    }
}

export default Actions
