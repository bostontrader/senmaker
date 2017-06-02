import {fromJS} from 'immutable'
import {Map} from 'immutable'

import {MD}                from './SchemaConstants'
import Adjectivd           from './dictionary/adjectivd/Adjectivd'
import AdjectivdStoreState from './dictionary/adjectivd/AdjectivdStoreState'

// Given an input string, build an immutable object, of the correct type, possibly with
// an arbitrary quantity of nested immutable objects.
const deserialize = (string) => {

    return fromJS(JSON.parse(string), function (key, value, path) {
        switch(value.get('t')) {
            case MD.Adj.t:
                return Adjectivd(value)
            case MD.AdjStore.t:
                return AdjectivdStoreState(value)
            default:
                return Map(value)
        }

    })

}

export {deserialize}
