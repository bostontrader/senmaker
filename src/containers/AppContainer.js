import AppView from '../views/AppView'
import {Container} from 'flux/utils'
import NounActions from '../data/nouns/NounActions'
import NounEditStore from '../data/nouns/NounEditStore'
import NounStore from '../data/nouns/NounStore'
import VerbActions from '../data/verbs/VerbActions'
import VerbEditStore from '../data/verbs/VerbEditStore'
import VerbStore from '../data/verbs/VerbStore'

function getStores() {
    return [
        NounStore,
        NounEditStore,
        VerbStore,
        VerbEditStore
    ]
}

function getState() {
    return {
        nouns: NounStore.getState(),
        editingNoun: NounEditStore.getState(),

        onAddNoun: NounActions.addNoun,
        onCancelNoun: NounActions.cancel,
        onInsertNoun: NounActions.insertNoun,
        onDeleteNoun: NounActions.deleteNoun,
        onEditNoun: NounActions.editNoun,

        verbs: VerbStore.getState(),
        editingVerb: VerbEditStore.getState(),

        onAddVerb: VerbActions.addVerb,
        onCancelVerb: VerbActions.cancel,
        onInsertVerb: VerbActions.insertVerb,
        onDeleteVerb: VerbActions.deleteVerb,
        onEditVerb: VerbActions.editVerb,
        
    }
}

export default Container.createFunctional(AppView, getStores, getState)
