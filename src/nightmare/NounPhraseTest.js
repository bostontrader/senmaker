var Nightmare = require('nightmare')
var NTU       = require('./NightmareTestUtils')

const NounPhraseTest = (nightmare, delay) => {

    return nightmare

        // Can I open the addedit form and make it go away by clicking cancel?
        .click('#add-np').wait(delay)
        .click('#np-addedit-form #cancel').wait(delay)
        .then( res => {return NTU.lookFor(nightmare, '#np-addedit-form', false)})

        // If I open the addedit form, enter and a save a noun,
        // will the form then go away and can I see the insertNounPhraseCheck mark in the quiz?
        /*.then( res => {
            return nightmare
                .click('#add-np').wait(delay)
                .type('#base', 'carrot').wait(delay)
                .click('#save-np').wait(delay)

        })
        .then( res => {return NTU.lookFor(nightmare, '#np-addedit-form', false)})
        .then( res => {return NTU.lookFor(nightmare, '#insertNounPhraseCheck', true)})

        // Can I open the addedit form via editing and make it go away by clicking cancel?
        .then( res => {
            return nightmare
                .click('#id1').wait(delay)
                .click('#cancel').wait(delay)
        })
        .then( res => {return NTU.lookFor(nightmare, '#np-addedit-form', false)})

        // If I open the addedit form via editing, change and a save a noun,
        // will the form then go away and can I see the updateNounPhraseCheck mark in the quiz?
        .then( res => {
            return nightmare
                .click('#id1').wait(delay)
                .type('#base', 'beaver').wait(delay)
                .click('#save-np').wait(delay)
        })
        .then( res => {return NTU.lookFor(nightmare, '#np-addedit-form', false)})
        .then( res => {return NTU.lookFor(nightmare, '#updateNounPhraseCheck', true)})


        // If I open the addedit form via editing and delete the noun,
        // will the form then go away and can I see the deleteNounPhraseCheck mark in the quiz?

        .then( res => {
            return nightmare
                .click('#id1').wait(delay)
                .click('#delete-np').wait(delay)
        })
        .then( res => {return NTU.lookFor(nightmare, '#np-addedit-form', false)})
        .then( res => {return NTU.lookFor(nightmare, '#deleteNounPhraseCheck', true)})
        //.then( res => {return NTU.lookFor(nightmare, '#quiz', false)})

        .then( res => {
            return nightmare
                .click('#add-np').wait(delay)
                .type('#base', 'carrot').wait(delay)
                .click('#save-np').wait(delay)
        })*/


        // Can I see the examples button?
        //.then( res => {return NTU.lookFor(nightmare, '#examples', true)})

        // Does it go away after I click it?
        //.then( res => {return nightmare.click('#examples')})
        //.then( res => {return NTU.lookFor(nightmare, '#examples', false)})
}

module.exports = NounPhraseTest
