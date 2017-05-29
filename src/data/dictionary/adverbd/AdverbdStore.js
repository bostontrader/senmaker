// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import Adverbd            from './Adverbd'
import AdverbdActionTypes from './AdverbdActionTypes'
import AppDispatcher      from '../../AppDispatcher'
import {MakeMapOfAdverbd} from '../../JSONParseUtils'
import {validateAdverbd}  from '../../Validator'
import AppActionTypes     from '../../app/AppActionTypes'

import {localStorageAvailable} from '../../LocalStorage'
import {migrateNG}             from '../../LocalStorage'
const localStorageKey:string = 'AdverbdStore'

// This is how it starts in the very beginning.
const factoryReset:Object = Map({
    v:0,
    nextid:1,
    coll:Map()
})

const mutators:Array<Function> = [
    //(priorTemplate:Object):Object => {return priorTemplate.merge({'catfood':''})}, // 0 -> 1
    //(priorTemplate:Object):Object => {return priorTemplate.merge({'dogfood':''})}  // 1 -> 2
]

// This is what the structure should look like when finished.
// We only need this for testing.
const currentStateTemplate:Object =
    Map({
        v:2,
        catfood:'c',
        dogfood:'d',
        nextid:1,
        coll:Map()
    })

//const initialStates:Array<Function> = [
    //() => {
        //return Map({
            //v:0,
            //nextid:1,
            //coll:Map()
        //})
    //},
    //(priorFormat) => {
        //return Map({
            //v:0,
            //nextid:1,
            //coll:Map()
        //})
    //},
//]

class AdverbdStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    // There are two levels of "initial state."
    // Level 0. When this store is used for the very first time ever, there is no prior
    // state in local storage.  Use the "factory reset" edition of the beginning state.
    //
    // Level 1. Whenever the app starts or is reloaded, and there _is_  prior state
    // already available in local store, then use that.
    //
    // In either case we must migrate the intermediate state to the most recently available format.
    //

    // Else start with
    getInitialState() {

        if (localStorageAvailable) {
            //console.log('a')
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                //console.log('b')
                let originalParse = migrateNG(fromJS(JSON.parse(localStorageState)), mutators, factoryReset)
                let newColl = MakeMapOfAdverbd(originalParse.getIn(['coll']))
                return originalParse.set('coll',newColl)
            }
        }

        return migrateNG(factoryReset, mutators, factoryReset)

    }

    // Given a currentFormat state object, an array of mutator functions,
    // and a factoryReset value: If the currentFormat is recognizable then return the most
    // current format/version. Else return factoryReset
    // return the factory reset if we cann
    /*migrateNG(currentFormat:Object, mutators:Array<Function>, factoryReset:Object):Object {
        console.log('currentFormat',currentFormat)
        let currentVersion: number = currentFormat.getIn(['v'])
        console.log('currentVersion',currentVersion)
        // If the currentVersion is undefined then we start fresh
        if (currentVersion === undefined) {
            console.log('return factoryReset')
            return factoryReset
        }


        // If the currentVersion is the most recent then so is currentFormat.  Return that.
        console.log(mutators.length)
        console.log(currentVersion === mutators.length)
        if (currentVersion === mutators.length) {
            console.log('return currentformat', currentFormat)
            return currentFormat
        }

        // Else migrate from the currentFormat to the latest format.

        console.log('time to migrate')
        let newState:Object = currentFormat
        while(currentVersion < mutators.length) {
            newState = mutators[currentVersion](newState)
            console.log('cv=', currentVersion++)
            console.log(newState)
        }
        return currentFormat
    }*/

    reduce(state:Object, action:Object):Object {

        function insertNewRecord(adverbd) {
            validateAdverbd(adverbd)
            const id:number = state.getIn(['nextid'])
            let newState = state.setIn(['nextid'], id + 1)

            return newState.setIn(['coll',id.toString()], Adverbd({
                id: id.toString(),
                base: adverbd.get('base')
            }))
        }

        let newState:Object = state

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = migrateNG(factoryReset, mutators, factoryReset)
                break

            // Insert a new record or update an existing one, originating from a UI.
            case AdverbdActionTypes.ON_CLICK_SAVE_ADVERBD:
                validateAdverbd(action.adverbd)
                if(action.adverbd.id) {
                    // An id exists so update the existing record.
                    newState = newState.setIn(['coll', action.adverbd.id], Adverbd(action.adverbd))
                } else {
                    // No id exists so insert a new record.
                    newState = insertNewRecord(action.adverbd)
                }
                break

            case AdverbdActionTypes.ON_CLICK_DELETE_ADVERBD:
                newState = newState.deleteIn(['coll',action.id])
                break

            // Insert a new record programmatically, w/o a UI.
            case AdverbdActionTypes.INSERT_ADVERBD:
                newState = insertNewRecord(action.adverbd)
                break

            default:
            // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

export default new AdverbdStore()
export {currentStateTemplate}
export {factoryReset}
export {mutators}
