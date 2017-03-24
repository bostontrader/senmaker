import NouniActionTypes from './NouniActionTypes'
import AppDispatcher from '../AppDispatcher'

const NouniActions = {

    changeDefiniteness(newDefiniteness) {
        console.log('NouniActions.changeDefiniteness =', newDefiniteness)

        AppDispatcher.dispatch({
            type: NouniActionTypes.CHANGE_DEFINITENESS,
            newDefiniteness: newDefiniteness
        })
    },
    //changeSelectedNoun(newNoun) {
        //console.log('NouniActions.changeSelectedNoun =', newNoun)

        //AppDispatcher.dispatch({
            //type: NouniActionTypes.CHANGE_SELECTED_NOUN,
            //newNoun: newNoun
        //})
    //}
}

export default NouniActions
