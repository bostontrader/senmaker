import {ReduceStore} from 'flux/utils'
import {Map} from 'immutable'

import NoundActionTypes from '../dictionary/nound/NoundActionTypes'
import Nouni from './Nouni'
import NouniActionTypes from './NouniActionTypes'
import AppDispatcher from '../AppDispatcher'

/*
This store manages all state required to support the add/edit operations on a nouni.
This obviously includes the present state of whatever nouni is being added or created.
If said nouni has an id, then this is an edit, otherwise we're creating a new nouni.

We can use this information to manage the display of a suitable add/edit component.
If the nouni has an id then we are editing a nouni and we thus want to display the NouniEditForm component.
If the addNouni flag = true, then we are adding a new nouni and we want to display the NouniAddForm component.
Else display nothing.

We use the addNouni flag for purposes of code clarity.

 */
class NouniAddEditStore extends ReduceStore {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState() {
        return Map({
            addNouni: false,
            nouni: new Nouni()
        })
    }

    reduce(state, action) {

        const calcResultText = (definiteness, nound) => {

            // Graft in this ugly code from another project...
            // http://www.ef.com/english-resources/english-grammar/singular-and-plural-nouns
            //const noun = this.state.selectedNoun
            //const nound = {base:'cat'}
            //let suffix = ''
            //let root = noun
            //const es = {"s":'',"x":'',"z":'',"ch":'',"sh":''}
            const vowels = {'a':'','e':'','i':'','o':'','u':''}


            //const n1 = noun.slice(-1)
            //const n2 = noun.slice(-2)
            //const n3 = noun.slice(-2,2)
            const n4 = nound.base.slice(0,1)

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

            if(definiteness === 'definite') {article = 'the'}
            if(definiteness === 'indefinite') {
                article = testStartWithVowel === true ? 'an' : 'a'
            }
            return article + ' ' + nound.base
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

            //let adjectives = ""

            //for (var i = 0, l = this.state.newAdjectives.length; i < l; i++) {
                //if (i === 0) {
                    //adjectives = this.state.newAdjectives[i].value
                //} else {
                    //adjectives = adjectives + ', ' + this.state.newAdjectives[i].value
                //}
            //}



            //if(this.state.pluralitySelectedOption === PluralityRadio.PLURAL) {
                //return article + ' ' + adjectives + " " +root + suffix
            //} else {
                //return article + ' ' + adjectives + " " + noun
            //}
            
            //return definiteness.concat(presentNoundId)
        }

        switch (action.type) {

            // Only open the add-noun UI
            //case NoundActionTypes.ADD_NOUN:
                //return state.set('addNoun', true)

            //case NoundActionTypes.CANCEL:
                //return state.set('addNoun', false).set('noun', Nound())

            //case NoundActionTypes.ON_CHANGE_BASE:
                //return state.updateIn(['noun','base'],value => action.base)

            case NouniActionTypes.CHANGE_DEFINITENESS:
                console.log('NouniAddEditStore CHANGE_DEFINITENESS =',action.newDefiniteness)

                let presentDefiniteness = action.newDefiniteness
                let presentNoundId = state.getIn(['nouni','nound_id'])
                let resultText = calcResultText(presentDefiniteness, {base:'cat'})

                let newState = state.updateIn(['nouni','definiteness'],value => action.newDefiniteness)

                newState = newState.updateIn(['nouni','resultText'], value => resultText)

                return newState

            //case NoundActionTypes.CHANGE_SELECTED_NOUN:
            //case NouniActionTypes.CHANGE_SELECTED_NOUN:
                //console.log('NouniAddEditStore CHANGE_SELECTED_NOUN =',action.newNoun)
                //console.log('NouniAddEditStore CHANGE_SELECTED_NOUN =',state.nound)

                //let presentDefiniteness1 = state.getIn(['nouni','definiteness'])
                //let presentNoundId1 = action.newNoun.value
                //let resultText1 = calcResultText(presentDefiniteness1, {base:'dog'})

                //return state.nound.set('selectedNounId','n-1')
                //return state.updateIn(['nouni','nound_id'],value => action.newNoun.value)
                    //.updateIn(['nouni','resultText'], value => resultText1)

            //selectedNounId
                //return state

            // Here we only close the UI form.
            // NounStore will also catch this event and it's responsible for the actual deletion.
            //case NoundActionTypes.DELETE_NOUN:
                //return state.set('addNoun', false).set('noun', Nound())

            //case NoundActionTypes.EDIT_NOUN:
                //return state.set('noun', Nound({
                    //id: action.payload.noun.get('id'),
                    //base: action.payload.noun.get('base'),
                    //pluralization_rule: action.payload.noun.get('pluralization_rule')
                //}))

            // Here we only close the UI form.
            // NounStore will also catch this event and it's responsible for the actual insert.
            //case NoundActionTypes.INSERT_NOUN:
                //return state.set('addNoun', false).set('noun', Nound())

            // Here we only close the UI form.
            // NounStore will also catch this event and it's responsible for the actual update.
            //case NoundActionTypes.UPDATE_NOUN:
                //return state.set('addNoun', false).set('noun', Nound())

            default:
                return state
        }
    }
}

export default new NouniAddEditStore()
