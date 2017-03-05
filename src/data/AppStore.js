import {ReduceStore} from 'flux/utils'

import AppActionTypes from './AppActionTypes'
import AppDispatcher from './AppDispatcher'

import {NounPanelLevel} from '../data/nouns/NounConstants'
import {VerbPanelLevel} from '../data/verbs/VerbConstants'

class AppStore extends ReduceStore {

    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return AppStore.theLevels[AppStore.currentLevel]
    }

    reduce(state, action) {
        switch (action.type) {

            case AppActionTypes.LEVEL_PREVIOUS:
                if(AppStore.currentLevel > 0)
                    return AppStore.theLevels[--AppStore.currentLevel]
                else
                    return state

            case AppActionTypes.LEVEL_NEXT:
                if(AppStore.currentLevel < AppStore.theLevels.length-1)
                    return AppStore.theLevels[++AppStore.currentLevel]
                else
                    return state

            case AppActionTypes.LEVEL_RESET:
                AppStore.currentLevel = 0
                return AppStore.theLevels[0]

            default:
                return state
        }
    }
}

AppStore.currentLevel = 0
AppStore.theLevels = [
    {maxLevel: 3, app: 0},
    {maxLevel: 3, app: 1, nounPanel: NounPanelLevel.BASE},
    {maxLevel: 3, app: 2, verbPanel: VerbPanelLevel.BASE},
    {maxLevel: 3, app: 3, nounPanel: NounPanelLevel.PLURALIZATION}
]

export default new AppStore()
