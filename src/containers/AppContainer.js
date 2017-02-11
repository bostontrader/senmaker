import AppView from '../views/AppView'
import {Container} from 'flux/utils'
import NounStore from '../data/NounStore'

function getStores() {
    return [
        NounStore
    ]
}

function getState() {
    return {
        nouns: NounStore.getState(),
    }
}

export default Container.createFunctional(AppView, getStores, getState)