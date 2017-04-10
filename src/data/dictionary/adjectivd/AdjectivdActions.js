import AdjectivdActionTypes from './AdjectivdActionTypes'
import AppDispatcher        from '../../AppDispatcher'

const AdjectivdActions = {
    // Programmatic insert, no UI
    insertAdjectivd(adjectivd) {
        AppDispatcher.dispatch({
            type: AdjectivdActionTypes.INSERT_ADJECTIVD,
            adjectivd: adjectivd
        })
    },
    onChangeSelectedAdjectivd(adjectivd) {
        AppDispatcher.dispatch({
            type: AdjectivdActionTypes.ON_CHANGE_SELECTED_ADJECTIVD,
            adjectivd: adjectivd
        })
    }
}

export default AdjectivdActions
