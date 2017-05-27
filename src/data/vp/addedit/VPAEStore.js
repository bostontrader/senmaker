// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import VP                 from '../VP'
import VPActionTypes      from '../VPActionTypes'
import AppDispatcher      from '../../AppDispatcher'
import {MakeVP}           from '../../JSONParseUtils'
import {validateVerbd}    from '../../Validator'
import {validateVP}       from '../../Validator'
import AppActionTypes     from '../../app/AppActionTypes'
import Verbd              from '../../dictionary/verbd/Verbd'
//import {ActionTime}     from '../../dictionary/verbd/VerbdConstants'
import {ActionTimeSelect} from '../../vp/VPConstants'

import {localStorageAvailable} from '../../LocalStorage'
const localStorageKey:string = 'VPAEStore'

/*
 This store manages all state required to support the add/edit operations on a vp.
 This obviously includes the present state of whatever vp is being added or created.
 If said vp has an id, then this is an edit, otherwise we're creating a new vp.

 We can use this information to manage the display of a suitable add/edit component.
 If the vp has an id then we are editing a vp and we thus want to display the VPEditForm component.
 If the clickAddVP flag = true, then we are adding a new vp and we want to display the VPAddForm component.
 Else display nothing.

 We use the clickAddVP flag for purposes of code clarity.

 */

// We want to provide a migration capacity for the format of this store.  It's serialized
// into localStorage and there's no telling when old versions will be seen in the future.
const initialStates:Array<Object> = [
    Map({
        addVP: false,
        vp: new VP()
    }),
    Map({
        v:0,
        addVP: false,
        vp: new VP()
    })
]

class VPAEStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState():Object {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = this.migrate(fromJS(JSON.parse(localStorageState)))
                let newVP = MakeVP(originalParse.getIn(['vp']))
                return originalParse.set('vp',newVP)
            }

        }
        return initialStates.slice(-1)[0]

    }

    // Given an originalFormat state object migrate to the most current version
    migrate(originalFormat:Object):Object {
        const currentInitialState:Object = initialStates.slice(-1)[0]
        const originalVersion:number = originalFormat.getIn(['v'])

        // If the version is undefined then we start fresh
        if(originalVersion === undefined)
            return currentInitialState

        // If the version is the most recent
        if (originalVersion === currentInitialState.getIn(['v']))
            return originalFormat

        // Else migrate from the originalVersion to the current version
        // But at this time there are no intermediate version to migrate through
        // so do nothing
        return currentInitialState
    }

    reduce(state:Object, action:Object):Object {

        let newState:Object = state

        const calcResultText:Function = (vp:Object):string => {

            let baseForm = vp.getIn(['verbd','base'])
            let ingForm = baseForm + 'ing'
            let pastForm = vp.getIn(['verbd','pastForm'])

            let generatedText:string = ''

            //if(vp.getIn(['simple']) ) {
                switch(parseInt(vp.getIn(['actionTime']))) {
                    case ActionTimeSelect.Past:
                        generatedText = vp.getIn(['verbd','pastForm'])
                        break
                    case ActionTimeSelect.Present:
                        generatedText = vp.getIn(['verbd','base'])
                        break
                    case ActionTimeSelect.Future:
                        generatedText = 'will ' + baseForm
                        break
                    default:
                        // shouldn't ever get here
                }

            // perfect, continuous had been walking   have been walking   will have been walking
            /*} else if(vp.getIn(['perfect']) && vp.getIn(['progressive']) ) {

                switch(parseInt(vp.getIn(['actionTime']))) {
                    case ActionTimeSelect.Past:
                        generatedText = 'had been ' + ingForm
                        break
                    case ActionTimeSelect.Present:
                        generatedText = 'have been ' + ingForm
                        break
                    case ActionTimeSelect.Future:
                        generatedText = 'will have been ' + ingForm
                        break
                    default:
                        // shouldn't ever get here
                }

            // perfect                   had walked         have walked         will have walked
            } else if(vp.getIn(['perfect']) ) {
                console.log('c')

                switch(parseInt(vp.getIn(['actionTime']))) {
                    case ActionTimeSelect.Past:
                        generatedText = 'had ' + pastForm
                        break
                    case ActionTimeSelect.Present:
                        generatedText = 'have ' + pastForm
                        break
                    case ActionTimeSelect.Future:
                        generatedText = 'will have ' + pastForm
                        break
                    default:
                    // shouldn't ever get here
                }

            // continuous                   walking         are walking          will be walking
            } else if(vp.getIn(['progressive']) ) {

                switch(parseInt(vp.getIn(['actionTime']))) {
                    case ActionTimeSelect.Past:
                        generatedText = ingForm
                        break
                    case ActionTimeSelect.Present:
                        generatedText = 'are ' + ingForm
                        break
                    case ActionTimeSelect.Future:
                        generatedText = 'will be ' + ingForm
                        break
                    default:
                    // shouldn't ever get here
                }
            }*/



            return generatedText
        }

        let presentActionTime:number
        let presentVerbd:Object
        let generatedText:string

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = initialStates.slice(-1)[0]
                break

            // Signal the UI to open the VPAddForm
            case VPActionTypes.ON_CLICK_ADD_VP:
                newState = newState.set('addVP', true)
                break

            // Signal the UI to close VPAddForm or VPEditForm
            case VPActionTypes.ON_CLICK_CANCEL:
                newState = initialStates.slice(-1)[0]
                break

            // Signal the UI to close VPAddForm or VPEditForm (but the delete button
            // is only present on NounEditForm.)
            // VPStore will also catch this event and it's responsible for the actual deletion.
            case VPActionTypes.ON_CLICK_DELETE_VP:
                newState = initialStates.slice(-1)[0]
                break

            // Signal the UI to open VPEditForm and populate with the given data.
            case VPActionTypes.ON_CLICK_EDIT_VP:
                validateVP(action.vp)
                newState = newState.set('vp', VP({
                    id: action.vp.id,
                    verbd: action.vp.verbd,
                    actionTime: action.vp.actionTime,
                    generatedText: action.vp.generatedText
                }))
                break

            // Signal the UI to close VPAddForm or VPEditForm. We don't need to specify which,
            // the same state should close either one.
            case VPActionTypes.ON_CLICK_SAVE_VP:
                newState = initialStates.slice(-1)[0]
                break

            case VPActionTypes.ON_CHANGE_ACTION_TIME:
                newState = newState.updateIn(['vp','actionTime'],value => action.newActionTime)
                generatedText = calcResultText(newState.getIn(['vp']))
                newState = newState.updateIn(['vp','generatedText'], value => generatedText)
                break

            // Should be VERBD because that's what's being changed!
            case VPActionTypes.ON_CHANGE_SELECTED_VERBD:
                newState = newState.updateIn(['vp','verbd'],value => action.newVerbd)
                generatedText = calcResultText(newState.getIn(['vp']))
                newState = newState.updateIn(['vp','generatedText'], value => generatedText)
                break

            /*case VPActionTypes.ON_CHANGE_SIMPLE:
                // We can only change simple to true with this action.  We cannot change it to false
                // otherwise perfect and progressive would be also false.
                if(action.newSimple) {
                    newState = newState.updateIn(['vp','simple'],value => true)
                    newState = newState.updateIn(['vp','perfect'],value => false)
                    newState = newState.updateIn(['vp','progressive'],value => false)
                }
                generatedText = calcResultText(newState.getIn(['vp']))
                newState = newState.updateIn(['vp','generatedText'], value => generatedText)
                break

            case VPActionTypes.ON_CHANGE_PERFECT:
                newState = newState.updateIn(['vp', 'perfect'], value => action.newPerfect)
                if( action.newPerfect) {
                    newState = newState.updateIn(['vp','simple'],value => false)
                } else {
                    // if progressive is also false, then set simple to true
                    if( !newState.getIn(['vp','progressive']))
                        newState = newState.updateIn(['vp','simple'],value => true)
                }
                generatedText = calcResultText(newState.getIn(['vp']))
                newState = newState.updateIn(['vp','generatedText'], value => generatedText)
                break

            case VPActionTypes.ON_CHANGE_PROGRESSIVE:
                newState = newState.updateIn(['vp', 'progressive'], value => action.newProgressive)
                if( action.newProgressive) {
                    newState = newState.updateIn(['vp','simple'],value => false)
                } else {
                    // if perfect is also false, then set simple to true
                    if( !newState.getIn(['vp','perfect']))
                        newState = newState.updateIn(['vp','simple'],value => true)
                }
                generatedText = calcResultText(newState.getIn(['vp']))
                newState = newState.updateIn(['vp','generatedText'], value => generatedText)
                break*/

            default:
                // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

export default new VPAEStore()
export {initialStates}
