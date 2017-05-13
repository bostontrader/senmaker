// @flow
import {ReduceStore} from 'flux/utils'
import {fromJS, Map} from 'immutable'

import NP                   from '../NP'
import NPActionTypes        from '../NPActionTypes'
import {DefinitenessSelect} from '../NPConstants'
import AppDispatcher        from '../../AppDispatcher'
import {MakeNP}             from '../../JSONParseUtils'
import {validateAdjectivd}  from '../../Validator'
import {validateNound}      from '../../Validator'
import {validateNP}         from '../../Validator'
import AppActionTypes       from '../../app/AppActionTypes'

import {localStorageAvailable} from '../../../LocalStorage'
const localStorageKey = 'NPAEStore'

/*
 This store manages all state required to support the add/edit operations on a np.
 This obviously includes the present state of whatever np is being added or created.
 If said np has an id, then this is an edit, otherwise we're creating a new np.

 We can use this information to manage the display of a suitable add/edit component.
 If the np has an id then we are editing a np and we thus want to display the NPEditForm component.
 If the clickAddNP flag = true, then we are adding a new np and we want to display the NPAddForm component.
 Else display nothing.

 We use the clickAddNP flag for purposes of code clarity.

 */
class NPAEStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {

        if (localStorageAvailable) {
            const localStorageState:string | null | void = localStorage.getItem(localStorageKey)

            if(localStorageState) {
                let originalParse = fromJS(JSON.parse(localStorageState))
                let newNP = MakeNP(originalParse.getIn(['np']))
                return originalParse.set('np',newNP)
            }

        }
        return NPAEStore.initialState

    }

    reduce(state:Object, action:Object):Object {

        let newState:Object = state

        // http://www.ef.com/english-resources/english-grammar/singular-and-plural-nouns
        const calcResultText = (definiteness:number, nound:Object, adjectivs:Array<Object>):string => {
            validateNound(nound)
            //adjectivs.map( (adjectivd) => {validateAdjectivd(adjectivd)})

            // Graft in this ugly code from another project...
            //let suffix = ''
            //let root = noun
            //const es = {"s":'',"x":'',"z":'',"ch":'',"sh":''}
            const vowels = {'a':'','e':'','i':'','o':'','u':''}

            const base = nound.get('base')
            const n1 = base.slice(-1) // last char
            const n2 = base.slice(-2) // last two chars
            const n3 = base.slice(-2,2)
            const n4 = base.slice(0,1) // first char
            //console.log(base, n1, n2, n3, n4)
            //const test1 = !(n[noun] === undefined)
            //const test2 = !(es[n1] === undefined && es[n2] === undefined)
            //const test3 = (vowels[n3] === undefined) && n1 === 'y'
            const testStartWithVowel = !(vowels[n4] === undefined)


            // 4. irregular
            // 5. Singular and plural are the same
            //if (test1) {
            //root = n[noun]
            //} else if(test2) {
            // 2. A singular noun ending in s, x, z, ch, sh makes the plural by adding-es. ex. bus, wish
            //suffix = 'es'
            //} else if(test3) {
            // 3. A singular noun ending in a consonant and then y makes the plural by dropping the y and adding-ies. ex. spy, baby
            //suffix = 'ies'
            //root = noun.slice(0,noun.length-1)
            //} else {
            // 1. Most singular nound form the plural by adding -s
            //suffix = 's'
            //}



            let article = ''

            // Ugly hack
            if(definiteness === "definite") definiteness = DefinitenessSelect.Definite
            if(definiteness === "indefinite") definiteness = DefinitenessSelect.Indefinite

            if(definiteness === DefinitenessSelect.Definite) {article = 'the'}
            if(definiteness === DefinitenessSelect.Indefinite) {
                article = testStartWithVowel === true ? 'an' : 'a'
            }

            let generatedText = ''

            //let adjectives = ""

            //for (var i = 0, l = this.state.newAdjectives.length; i < l; i++) {
            //if (i === 0) {
            //adjectives = this.state.newAdjectives[i].value
            //} else {
            //adjectives = adjectives + ', ' + this.state.newAdjectives[i].value
            //}
            //}
            let adjString = ''
            let firstTime = true
            for( let adjectivd:Object of adjectivs) {
                if (firstTime) {
                    adjString = adjectivd.get('base')
                    firstTime = false
                }
                else
                    adjString += ' ' + adjectivd.get('base')

            }



            if(article === '') {
                if(base === '') {
                    // no article, no base, no result
                } else {
                    // no article, but there is a base, so use that as the result
                    generatedText = adjString + base
                }
            } else {
                if(base === '') {
                    // an article, but no base, no result
                } else {
                    // an article and a base, we can use that
                    generatedText = article + ' ' + adjString + ' ' + base
                }
            }



            // if indefinite, then disable plural and singular
            //if(this.state.definitenessSelectedOption === DefinitenessRadio.INDEFINITE) {
            //this.setState({pluralityDisabled:true})
            //} else {
            //this.setState({pluralityDisabled:false})
            //}

            // if plural, then disable definiteness
            //if(this.state.pluralitySelectedOption === PluralityRadio.PLURAL) {
            //this.setState({definitenessDisabled:true})
            //} else {
            //this.setState({definitenessDisabled:false})
            //}

            //if(this.state.pluralitySelectedOption === PluralityRadio.PLURAL) {
            //return article + ' ' + adjectives + " " +root + suffix
            //} else {
            //return article + ' ' + adjectives + " " + noun
            //}

            return generatedText
        }

        let presentDefiniteness:number
        let presentNound:Object
        let presentAdjectivds:Array<Object>
        let generatedText:string

        switch (action.type) {

            // AppActionTypes
            case AppActionTypes.ON_CLICK_APP_RESET:
                newState = NPAEStore.initialState
                break

            // Signal the UI to open the NPAddForm
            case NPActionTypes.ON_CLICK_ADD_NP:
                newState = newState.set('addNP', true)
                break

            // Signal the UI to close NPAddForm or NPEditForm
            case NPActionTypes.ON_CLICK_CANCEL:
                newState = NPAEStore.initialState
                break

            // Signal the UI to close NPAddForm or NPEditForm (but the delete button
            // is only present on NounEditForm.)
            // NPStore will also catch this event and it's responsible for the actual deletion.
            case NPActionTypes.ON_CLICK_DELETE_NP:
                newState = NPAEStore.initialState
                break

            // Signal the UI to open NPEditForm and populate with the given data.
            case NPActionTypes.ON_CLICK_EDIT_NP:
                validateNP(action.np)
                newState = newState.set('np', NP({
                    id: action.np.id,
                    nound: action.np.nound,
                    definiteness: action.np.definiteness,
                    generatedText: action.np.generatedText
                }))
                break

            // Signal the UI to close NPAddForm or NPEditForm. We don't need to specify which,
            // the same state should close either one.
            case NPActionTypes.ON_CLICK_SAVE_NP:
                newState = NPAEStore.initialState
                break

            case NPActionTypes.ON_CHANGE_DEFINITENESS:
                presentDefiniteness = action.newDefiniteness
                presentNound = state.getIn(['np','nound'])
                presentAdjectivds = state.getIn(['np','adjectivds'])

                generatedText = calcResultText(presentDefiniteness, presentNound, presentAdjectivds)
                newState = newState.updateIn(['np','definiteness'],value => action.newDefiniteness)
                newState = newState.updateIn(['np','generatedText'], value => generatedText)
                break

            // Should be NOUND because that's what's being changed!
            case NPActionTypes.ON_CHANGE_SELECTED_NOUND:
                validateNound(action.newNound)
                presentDefiniteness = state.getIn(['np','definiteness'])
                presentNound = action.newNound
                presentAdjectivds = state.getIn(['np','adjectivds'])
                generatedText = calcResultText(presentDefiniteness, presentNound, presentAdjectivds)
                newState = newState.updateIn(['np','nound'],value => presentNound)
                newState = newState.updateIn(['np','generatedText'], value => generatedText)
                break

            // Should be ADJECTIVD because that's what's being changed!
            case NPActionTypes.ON_CHANGE_SELECTED_ADJECTIVD:
                console.log('NPAEStore',action.newAdjectivds)
                action.newAdjectivds.map( (adjectivd) => {validateAdjectivd(adjectivd)})

                presentDefiniteness = state.getIn(['np','definiteness'])
                presentNound = state.getIn(['np','nound'])
                console.log('NPAEStore',action.newAdjectivds)
                generatedText = calcResultText(presentDefiniteness, presentNound, action.newAdjectivds)
                newState = newState.updateIn(['np','adjectivds'],value => action.newAdjectivds)
                newState = newState.updateIn(['np','generatedText'], value => generatedText)
                break

            default:
                // do nothing, newState is already set to the existing state
        }

        if(localStorageAvailable)
            localStorage.setItem(localStorageKey, JSON.stringify(newState.toJSON()))

        return newState
    }
}

NPAEStore.initialState =  Map({
    addNP: false,
    np: new NP()
})

export default new NPAEStore()
