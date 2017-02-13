import AppView from '../views/AppView'
import {Container} from 'flux/utils'
import NounActions from '../data/NounActions'
import NounStore from '../data/NounStore'

function getStores() {
    return [
        NounStore
    ]
}

function getState() {
    return {
        nouns: NounStore.getState(),
        onAdd: NounActions.addNoun
    }
}

export default Container.createFunctional(AppView, getStores, getState)