// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import StringActionTypes from './StringActionTypes'
import StringsEN         from './StringsEN'
import StringsZH         from './StringsZH'
import AppDispatcher     from '../AppDispatcher'
import {langCode}        from '../I18NConstants'
import AppActionTypes    from '../app/AppActionTypes'

import {localStorageAvailable} from '../LocalStorage'
import {migrate}               from '../LocalStorage'
const localStorageKey:string = 'StringStore'

// We want to provide a migration capacity for the format of this store.  It's serialized
// into localStorage and there's no telling when old versions will be seen in the future.
const initialStates:Array<Object> = [Map({v:0, lang: langCode.zh})]

/**
 * This store differs from the others.
 *
 * In this store want to save the language choice to
 * localState and we _do not_ want to save the blizzard of strings.  But for the ordinary
 * operation of the app, we _do_ want the strings in the state.  We must therefore engage
 * in contortions to append and prune the strings from the state where applicable.
 *
 */
class StringStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {
        if (localStorageAvailable) {
            const localStorageState = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = migrate(fromJS(JSON.parse(localStorageState)), initialStates)
                if(originalParse.get('lang') === langCode.zh) originalParse = originalParse.set('strings', StringsZH)
                else if(originalParse.get('lang') === langCode.en) originalParse = originalParse.set('strings', StringsEN)
                // else max fubar error

                return originalParse
            }
        }

        return initialStates.slice(-1)[0].set('strings', StringsZH)
    }
    
    reduce(state:Object, action:Object):Object {

        let newState:Object = state

        switch (action.type) {

            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = initialStates.slice(-1)[0].set('strings', StringsZH)
                break
            
            case StringActionTypes.ON_LANG_EN:
                newState = newState.set('lang', langCode.en)
                newState = newState.set('strings', StringsEN)
                break

            case StringActionTypes.ON_LANG_ZH:
                newState = newState.set('lang', langCode.zh)
                newState = newState.set('strings', StringsZH)
                break

            default:
                // do nothing, newState is already set to the existing state
        }

        // We don't need to save all these strings to localStorage but we do
        // want to save the language selection.
        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.delete('strings').toJSON()))

        return newState
    }
}

export default new StringStore()
