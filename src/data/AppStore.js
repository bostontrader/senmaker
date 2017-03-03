import {ReduceStore} from 'flux/utils'
import AppDispatcher from './AppDispatcher'

import {NounPanelLevel} from '../data/nouns/NounConstants'
import {VerbPanelLevel} from '../data/verbs/VerbConstants'

class AppStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return {app: 0, nounPanel: 0, verbPanel: 0}
        //return {app: 1, nounPanel: NounPanelLevel.BASE, verbPanel: 0}
        //return {app: 2, nounPanel: NounPanelLevel.BASE, verbPanel: VerbPanelLevel.BASE}
    }

    reduce(state, action) {
        //switch (action.type) {

            //default:
                return state
        //}
    }
}

export default new AppStore()
