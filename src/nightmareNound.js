var Nightmare = require('nightmare')

describe('In the beginning...', () => {


    const nightmareNound = (nightmare, delay) => {
     return nightmare
     .click('#lesson-next').wait(delay)
     .click('#add-nound').wait(delay)
     .click('#nound-add-form #cancel').wait(delay)

     // The noundAddForm should now go away.
     .evaluate(function () {
     return document.querySelector('#nound-add-form') === null
     })

     .then(
     nound_add_form_gone => {
     if (!nound_add_form_gone)
     throw('nound-add-form has not gone away after cancel')
     })
     .then( res => {
     return nightmare
     .click('#add-nound').wait(delay)
     .type('#base', 'carrot').wait(delay)
     .click('#save-nound').wait(delay)

     // The NoundAddForm should now go away.
     .evaluate(function() {
     return document.querySelector('#nound-add-form') === null
     })
     })
     .then(nound_add_form_gone => {
     if (!nound_add_form_gone)
     throw('nound-add-form has not gone away after save')
     })
     .then( res => {
     return nightmare
     .evaluate(function() {
     return document.querySelector('#insertNoundCheck') !== null
     })
     })
     .then(insertNoundCheckFound => {
     if (!insertNoundCheckFound)
     throw('insertNoundCheck did not appear after save')
     })

     .then( res => {
     return nightmare
     .click('#id1').wait(delay)
     .click('#cancel').wait(delay)
     .evaluate(function() {
     return document.querySelector('#nound-edit-form') === null
     })
     })
     .then(nound_edit_form_gone => {
     if (!nound_edit_form_gone)
     throw('nound-edit-form has not gone away after cancel')
     })

     .then( res => {
     return nightmare
     .click('#id1').wait(delay)
     .type('#base', 'beaver').wait(delay)
     .click('#save-nound').wait(delay)
     .evaluate(function() {
     return document.querySelector('#nound-edit-form') === null
     })
     })
     .then(nound_edit_form_gone => {
     if (!nound_edit_form_gone)
     throw('nound-edit-form has not gone away after save')
     }).then( res => {
     return nightmare
     .evaluate(function() {
     return document.querySelector('#updateNoundCheck') !== null
     })
     })
     .then(updateNoundCheckFound => {
     if (!updateNoundCheckFound)
     throw('updateNoundCheck did not appear after save')
     }).then( res => {
     return nightmare
     .click('#id1').wait(delay)
     .click('#delete-nound').wait(delay)
     .evaluate(function() {
     return document.querySelector('#nound-edit-form') === null
     })
     })
     .then(nound_edit_form_gone => {
     if (!nound_edit_form_gone)
     throw('nound-edit-form has not gone away after delete')
     })
     .then( res => {
     return nightmare
     .evaluate(function() {
     return document.querySelector('#deleteNoundCheck') !== null
     })
     })
     .then(deleteNoundCheckFound => {
     if (!deleteNoundCheckFound)
     throw('deleteNoundCheck did not appear after delete')
     })
     }

     //module.exports = nightmareNound




    const url = 'http://localhost:8081'

    /**
     * Our primary task to to push buttons, enter text, and walk our way through the app. Our secondary task
     * is to verify that certain elements appear or vanish based on these actions.  It's tempting
     * to h/o/p/e believe that the unit testing covers this. But doing so here, in certain important
     * cases, eases our nerves re: is unit testing thorough enough?
     *
     */
    it('Should work correctly', (done) => {
        const nightmare = new Nightmare({show:true, width:600, height:800})
        const delayA = 10
        const delayB = 250
        const delayC = 1800

        // test reset at the end
        nightmare.goto(url).wait(delayC)

        // Verify that we can switch between languages and that the correct language switch is
        // displayed.

        // By default the language starts at zh.  Verify that we _can_ see the enFlag, but _not_ the zhFlag.
            .evaluate(function() {
                return document.querySelector('#enFlag') !== null
            })
            .then( enFlagFound => {
                if (!enFlagFound)
                    throw('enFlagFound was not found')
            })

            /*.then( res => {return nightmareLanguage(nightmare, delayA)})

            // Now answer the intro lesson question. Can I see the checkmark?
            .then( res => {
                return nightmare
                    .click('#iunderstandCheck').wait(delayA)
                    .evaluate(function () {
                        return document.querySelector('#iunderstandCheck') !== null
                    })
            })

            .then( iunderstandCheck => {
                if (!iunderstandCheck)
                    throw('iunderstandCheck was not found')
            })*/

            .then( res => {return nightmareNound(nightmare, delayA)})
            /*.then( res => {return nightmareVerbd(nightmare, delayA)})
            //.then( res => {return nightmareAdjectivd(nightmare, delayC)})

            // I want to factor out this code into nightmareAdjectivd.  But when I do so
            // I get mysterious errors re: cannot find add-verbd.  But if I keep it here, then all is well.
            //.then( res => {return nightmareAdjectivd(nightmare, 5000)})
            /*.then( res => {
             return nightmare
             .click('#lesson-next').wait(delayC)
             .click('#add-adjectivd').wait(delayC)
             .click('#adjectivd-add-form #cancel').wait(delayC)

             // The adjectivdAddForm should now go away.
             .evaluate(function () {
             return document.querySelector('#adjectivd-add-form') === null
             })
             })
             .then( adjectivd_add_form_gone => {
             if (!adjectivd_add_form_gone)
             throw('adjectivd-add-form has not gone away after cancel')
             })
             .then( res => {
             return nightmare
             .click('#add-adjectivd').wait(delayC)
             .type('#base', 'fat').wait(delayC)
             .click('#save-adjectivd').wait(delayC)

             // The AdjectivdAddForm should now go away.
             .evaluate(function() {
             return document.querySelector('#adjectivd-add-form') === null
             })
             })
             .then(adjectivd_add_form_gone => {
             if (!adjectivd_add_form_gone)
             throw('adjectivd-add-form has not gone away after save')
             })
             .then( res => {
             return nightmare
             .evaluate(function() {
             return document.querySelector('#insertAdjectivdCheck') !== null
             })
             })
             .then(insertAdjectivdCheckFound => {
             if (!insertAdjectivdCheckFound)
             throw('insertAdjectivdCheck did not appear after save')
             })
             .then( res => {
             return nightmare
             .click('#id1').wait(delayC)
             .click('#cancel').wait(delayC)
             .evaluate(function() {
             return document.querySelector('#adjectivd-edit-form') === null
             })
             })
             .then(adjectivd_edit_form_gone => {
             if (!adjectivd_edit_form_gone)
             throw('adjectivd-edit-form has not gone away after cancel')
             })
             .then( res => {
             return nightmare
             .click('#id1').wait(delayC)
             .type('#base', 'beaver').wait(delayC)
             .click('#save-adjectivd').wait(delayC)
             .evaluate(function() {
             return document.querySelector('#adjectivd-edit-form') === null
             })
             })
             .then(adjectivd_edit_form_gone => {
             if (!adjectivd_edit_form_gone)
             throw('adjectivd-edit-form has not gone away after save')
             })
             .then( res => {
             return nightmare
             .evaluate(function() {
             return document.querySelector('#updateAdjectivdCheck') !== null
             })
             })
             .then(updateAdjectivdCheckFound => {
             if (!updateAdjectivdCheckFound)
             throw('updateAdjectivdCheck did not appear after save')
             })
             .then( res => {
             return nightmare
             .click('#id1').wait(delayC)
             .click('#delete-adjectivd').wait(delayC)
             .evaluate(function() {
             return document.querySelector('#adjectivd-edit-form') === null
             })
             })
             .then(adjectivd_edit_form_gone => {
             if (!adjectivd_edit_form_gone)
             throw('adjectivd-edit-form has not gone away after delete')
             })
             .then( res => {
             return nightmare
             .evaluate(function() {
             return document.querySelector('#deleteAdjectivdCheck') !== null
             })
             })

             //.then( res => {return nightmareAdjectivd(nightmare, 4000)})
             .then(deleteAdjectivdCheckFound => {
             if (!deleteAdjectivdCheckFound)
             throw('deleteAdjectivdCheck did not appear after delete')
             })

             //.then( res => {return nightmareDefiniteness(nightmare, delayC)})*/
            .then(resolve => {done()})
            .catch(err => {console.log(err),done()})

    }).timeout(35000)

})


