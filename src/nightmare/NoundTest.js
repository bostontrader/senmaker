var Nightmare = require('nightmare')
var NTU       = require('./NightmareTestUtils')

const NoundTest = (nightmare, delay) => {

    return nightmare

        // Can I open the addedit form and make it go away by clicking cancel?
        .click('#add-nound').wait(delay)
        .click('#nound-addedit-form #cancel').wait(delay)
        .then( res => {return NTU.lookFor(nightmare, '#nound-addedit-form', false)})

        // If I open the addedit form, enter and a save a noun,
        // will the form then go away and can I see the insertNoundCheck mark in the quiz?
        .then( res => {
            return nightmare
                .click('#add-nound').wait(delay)
                .type('#base', 'carrot').wait(delay)
                .click('#save-nound').wait(delay)

        })
        .then( res => {return NTU.lookFor(nightmare, '#nound-addedit-form', false)})
        .then( res => {return NTU.lookFor(nightmare, '#insertNoundCheck', true)})

        // Can I open the addedit form via editing and make it go away by clicking cancel?
        .then( res => {
            return nightmare
                .click('#id1').wait(delay)
                .click('#cancel').wait(delay)
        })
        .then( res => {return NTU.lookFor(nightmare, '#nound-addedit-form', false)})

        // If I open the addedit form via editing, change and a save a noun,
        // will the form then go away and can I see the updateNoundCheck mark in the quiz?
        .then( res => {
            return nightmare
                .click('#id1').wait(delay)
                .type('#base', 'beaver').wait(delay)
                .click('#save-nound').wait(delay)
        })
        .then( res => {return NTU.lookFor(nightmare, '#nound-addedit-form', false)})
        .then( res => {return NTU.lookFor(nightmare, '#updateNoundCheck', true)})


        // If I open the addedit form via editing and delete the noun,
        // will the form then go away and can I see the deleteNoundCheck mark in the quiz?

        .then( res => {
            return nightmare
                .click('#id1').wait(delay)
                .click('#delete-nound').wait(delay)
        })
        .then( res => {return NTU.lookFor(nightmare, '#nound-addedit-form', false)})

        // The above delete action passes the quiz and makes the quizbox go away
        // So we can't see the deleteNoundCheck and we're not really testing this.
        //.then( res => {return NTU.lookFor(nightmare, '#deleteNoundCheck', true)})
        .then( res => {return NTU.lookFor(nightmare, '#quiz', false)})

        // After add/edit/delete, there are no items in the dictionary.  Add one example
        // for use by subsequent tests.
        .then( res => {
            return nightmare
                .click('#add-nound').wait(delay)
                .type('#base', 'carrot').wait(delay)
                .click('#save-nound').wait(delay)
        })

        // Can I see the cheat button?
        .then( res => {return NTU.lookFor(nightmare, '#cheat', true)})

}

module.exports = NoundTest
