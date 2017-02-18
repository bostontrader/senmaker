import AppView from '../views/AppView'
import {Container} from 'flux/utils'
import NounActions from '../data/NounActions'
import NounEditStore from '../data/NounEditStore'
import NounStore from '../data/NounStore'

function getStores() {
    return [
        NounEditStore,
        NounStore
    ]
}

function getState() {
    return {
        editing: NounEditStore.getState(),
        nouns: NounStore.getState(),

        onAdd: NounActions.addNoun,
        onDeleteCompletedNouns: NounActions.deleteCompletedNouns,
        onDeleteNoun: NounActions.deleteNoun,
        onEditNoun: NounActions.editNoun,
        onStartEditingNoun: NounActions.startEditingNoun,
        onStopEditingNoun: NounActions.stopEditingNoun,
        onToggleAllNouns: NounActions.toggleAllNouns,
        onToggleNoun: NounActions.toggleNoun,
        onUpdateDraft: NounActions.updateDraft
    }
}

export default Container.createFunctional(AppView, getStores, getState)