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
    changeBase(base) {
        //console.log('NounActions.changeBase=',base)
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
        //console.log('NounActions.deleteNoun')
        AppDispatcher.dispatch({
            type: NounActionTypes.DELETE_NOUN,
            id
        })
    },
    editNoun(noun) {
        AppDispatcher.dispatch({
            type: NounActionTypes.EDIT_NOUN,
            payload: {noun: noun, level: 1}
        })
    },
    insertNoun(noun) {
        //console.log('NounActions.insertNoun')
        AppDispatcher.dispatch({
            type: NounActionTypes.INSERT_NOUN,
            noun
        })
    },
    updateNoun(noun) {
        console.log('NounActions.updateNoun =',noun)
        AppDispatcher.dispatch({
            type: NounActionTypes.UPDATE_NOUN,
            noun
        })
    }
}

export default Actions
