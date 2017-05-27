// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS}      from 'immutable'
import {Map}         from 'immutable'

import Clause            from '../Clause'
import ClauseActionTypes from '../ClauseActionTypes'
import AppDispatcher     from '../../AppDispatcher'
import {MakeClause}      from '../../JSONParseUtils'
import {validateClause}  from '../../Validator'
import {validateNP}      from '../../Validator'
import {validateVP}      from '../../Validator'
import AppActionTypes    from '../../app/AppActionTypes'

import {localStorageAvailable} from '../../LocalStorage'
import {migrate}               from '../../LocalStorage'
const localStorageKey:string = 'ClauseAEStore'

/*
 This store manages all state required to support the add/edit operations on a clause.
 This obviously includes the present state of whatever clause is being added or created.
 If said clause has an id, then this is an edit, otherwise we're creating a new clause.

 We can use this information to manage the display of a suitable add/edit component.
 If the clause has an id then we are editing a clause and we thus want to display the ClauseEditForm component.
 If the clickAddClause flag = true, then we are adding a new clause and we want to display the ClauseAddForm component.
 Else display nothing.

 We use the clickAddClause flag for purposes of code clarity.

 */

// We want to provide a migration capacity for the format of this store.  It's serialized
// into localStorage and there's no telling when old versions will be seen in the future.
const initialStates:Array<Object> = [
    Map({
        v:0,
        addClause: false,
        clause: new Clause()
    })
]

class ClauseAEStore extends ReduceStore {

    constructor() {super(AppDispatcher)}

    getInitialState() {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = migrate(fromJS(JSON.parse(localStorageState)), initialStates)
                let newClause = MakeClause(originalParse.getIn(['clause']))
                return originalParse.set('clause',newClause)
            }

        }
        return initialStates.slice(-1)[0]

    }

    reduce(state:Object, action:Object):Object {

        let newState:Object = state

        const calcResultText = (np:Object, vp:Object):string => {
            validateNP(np)
            validateVP(vp)

            let generatedText:string = np.get('generatedText') + ' ' + vp.get('generatedText')

            return generatedText
        }

        let presentNP:Object
        let presentVP:Object
        let generatedText:string

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = initialStates.slice(-1)[0]
                break

            // Signal the UI to open the VPAddForm
            case ClauseActionTypes.ON_CLICK_ADD_CLAUSE:
                newState = newState.set('addClause', true)
                break

            // Signal the UI to close VPAddForm or VPEditForm
            case ClauseActionTypes.ON_CLICK_CANCEL:
                newState = initialStates.slice(-1)[0]
                break

            // Signal the UI to close VPAddForm or VPEditForm (but the delete button
            // is only present on NounEditForm.)
            // VPStore will also catch this event and it's responsible for the actual deletion.
            case ClauseActionTypes.ON_CLICK_DELETE_CLAUSE:
                newState = initialStates.slice(-1)[0]
                break

            // Signal the UI to open VPEditForm and populate with the given data.
            case ClauseActionTypes.ON_CLICK_EDIT_CLAUSE:
                validateClause(action.clause)
                newState = newState.set('clause', Clause({
                    id: action.clause.id,
                    np: action.clause.np,
                    vp: action.clause.vp,
                    generatedText: action.clause.generatedText
                }))
                break

            // Signal the UI to close VPAddForm or VPEditForm. We don't need to specify which,
            // the same state should close either one.
            case ClauseActionTypes.ON_CLICK_SAVE_CLAUSE:
                newState = initialStates.slice(-1)[0]
                break

            // Should be NP because that's what's being changed!
            case ClauseActionTypes.ON_CHANGE_SELECTED_NP:
                validateNP(action.newNP)
                presentNP = action.newNP
                presentVP = state.getIn(['clause','vp'])
                generatedText = calcResultText(presentNP, presentVP)
                newState = newState.updateIn(['clause','np'],value => presentNP)
                newState = newState.updateIn(['clause','generatedText'], value => generatedText)
                break

            // Should be VP because that's what's being changed!
            case ClauseActionTypes.ON_CHANGE_SELECTED_VP:
                validateVP(action.newVP)
                presentNP = state.getIn(['clause','np'])
                presentVP = action.newVP
                generatedText = calcResultText(presentNP, presentVP)
                newState = newState.updateIn(['clause','vp'],value => presentVP)
                newState = newState.updateIn(['clause','generatedText'], value => generatedText)
                break

            default:
                // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

export default new ClauseAEStore()
export {initialStates}
