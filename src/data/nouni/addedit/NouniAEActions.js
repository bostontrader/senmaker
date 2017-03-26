import NouniAEActionTypes from './NouniAEActionTypes'
import AppDispatcher from '../../AppDispatcher'

const NouniAEActions = {

    onChangeDefiniteness(newDefiniteness) {
        AppDispatcher.dispatch({
            type: NouniAEActionTypes.ON_CHANGE_DEFINITENESS,
            newDefiniteness: newDefiniteness
        })
    }

}

export default NouniAEActions
