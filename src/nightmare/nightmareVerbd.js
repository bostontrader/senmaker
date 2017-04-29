var Nightmare = require('nightmare')

describe('In the beginning...', () => {


    const nightmareVerbd = (nightmare, delay) => {
        return nightmare
            .click('#lesson-next').wait(delay)
            .click('#lesson-next').wait(delay)

            .click('#add-verbd').wait(delay)
            .click('#verbd-add-form #cancel').wait(delay)

            // The verbdAddForm should now go away.
            .evaluate(function () {
                return document.querySelector('#verbd-add-form') === null
            })

            .then(
                verbd_add_form_gone => {
                    if (!verbd_add_form_gone)
                        throw('verbd-add-form has not gone away after cancel')
                })
            .then( res => {
                return nightmare
                    .click('#add-verbd').wait(delay)
                    .type('#base', 'carrot').wait(delay)
                    .click('#save-verbd').wait(delay)

                    // The VerbdAddForm should now go away.
                    .evaluate(function() {
                        return document.querySelector('#verbd-add-form') === null
                    })
            })
            .then(verbd_add_form_gone => {
                if (!verbd_add_form_gone)
                    throw('verbd-add-form has not gone away after save')
            })
            .then( res => {
                return nightmare
                    .evaluate(function() {
                        return document.querySelector('#insertVerbdCheck') !== null
                    })
            })
            .then(insertVerbdCheckFound => {
                if (!insertVerbdCheckFound)
                    throw('insertVerbdCheck did not appear after save')
            })

            .then( res => {
                return nightmare
                    .click('#id1').wait(delay)
                    .click('#cancel').wait(delay)
                    .evaluate(function() {
                        return document.querySelector('#verbd-edit-form') === null
                    })
            })
            .then(verbd_edit_form_gone => {
                if (!verbd_edit_form_gone)
                    throw('verbd-edit-form has not gone away after cancel')
            })

            .then( res => {
                return nightmare
                    .click('#id1').wait(delay)
                    .type('#base', 'beaver').wait(delay)
                    .click('#save-verbd').wait(delay)
                    .evaluate(function() {
                        return document.querySelector('#verbd-edit-form') === null
                    })
            })
            .then(verbd_edit_form_gone => {
                if (!verbd_edit_form_gone)
                    throw('verbd-edit-form has not gone away after save')
            })
            .then( res => {
                return nightmare
                    .evaluate(function() {
                        return document.querySelector('#updateVerbdCheck') !== null
                    })
            })
            .then(updateVerbdCheckFound => {
                if (!updateVerbdCheckFound)
                    throw('updateVerbdCheck did not appear after save')
            })
            .then( res => {
                return nightmare
                    .click('#id1').wait(delay)
                    .click('#delete-verbd').wait(delay)
                    .evaluate(function() {
                        return document.querySelector('#verbd-edit-form') === null
                    })
            })
            .then(verbd_edit_form_gone => {
                if (!verbd_edit_form_gone)
                    throw('verbd-edit-form has not gone away after delete')
            })
            .then( res => {
                return nightmare
                    .evaluate(function() {
                        return document.querySelector('#deleteVerbdCheck') !== null
                    })
            })
            .then(deleteVerbdCheckFound => {
                if (!deleteVerbdCheckFound)
                    throw('deleteVerbdCheck did not appear after delete')
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
        const nightmare = new Nightmare({show:true, width:600, height:800, zoomFactor: 0.5})
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

            //.then( res => {return nightmareNound(nightmare, delayA)})
            .then( res => {return nightmareVerbd(nightmare, delayA)})
             /*//.then( res => {return nightmareAdjectivd(nightmare, delayC)})

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










//module.exports = nightmareVerbd
