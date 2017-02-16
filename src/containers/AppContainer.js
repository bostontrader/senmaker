import AppView from '../views/AppView'
import {Container} from 'flux/utils'
import NounActions from '../data/NounActions'
import NounDraftStore from '../data/NounDraftStore'
import NounEditStore from '../data/NounEditStore'
import NounStore from '../data/NounStore'

function getStores() {
    return [
        NounDraftStore,
        NounEditStore,
        NounStore
    ]
}

function getState() {
    return {
        draft: NounDraftStore.getState(),
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