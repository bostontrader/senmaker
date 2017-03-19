import NouniActionTypes from './NouniActionTypes'
import AppDispatcher from '../AppDispatcher'

const NouniActions = {

    changeDefiniteness(newDefiniteness) {
        console.log('NouniActions.changeDefiniteness =', newDefiniteness)

        AppDispatcher.dispatch({
            type: NouniActionTypes.CHANGE_DEFINITENESS,
            newDefiniteness: newDefiniteness
        })
    }
}

export default NouniActions
