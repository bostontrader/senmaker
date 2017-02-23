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
        editing: NounEditStore.getState(), //
        nouns: NounStore.getState(),

        onAdd: NounActions.addNoun,
        onCancel: NounActions.cancel,
        onInsert: NounActions.insertNoun,
        onDeleteNoun: NounActions.deleteNoun,
        onEditNoun: NounActions.editNoun,
    }
}

export default Container.createFunctional(AppView, getStores, getState)
