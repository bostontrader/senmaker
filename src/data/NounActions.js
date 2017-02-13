import NounActionTypes from './NounActionTypes'
import NounDispatcher from './NounDispatcher'

const Actions = {

    addNoun(base) {
        NounDispatcher.dispatch({
            type: NounActionTypes.ADD_NOUN,
            base
        })
    }

}

export default Actions