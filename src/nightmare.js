var Nightmare = require('nightmare')
var nightmareNound = require('./nightmareNound')
var nightmareVerbd = require('./nightmareVerbd')
var nightmareAdjectivd = require('./nightmareVerbd')
var nightmareDefiniteness = require('./nightmareDefiniteness')

describe('In the beginning...', () => {

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
        const delay = 250 // delay between steps
        const delay1 = 2000

        // test reset at the end
        nightmare.goto(url).wait(delay)

        // 00. Verify that we can switch between languages and that the correct language switch is
        //    displayed.
            
        // 00.1 By default the language starts at zh.  Verify that we _can_ see the enFlag, but _not_ the zhFlag.
        .evaluate(function() {
            return document.querySelector('#enFlag') !== null
        }).then( enFlagFound => {
            if (!enFlagFound)
                throw('enFlagFound was not found')
        })

        // Now look for the zh flag
        .then( res => {
            return nightmare
                .evaluate(function () {
                    return document.querySelector('#zhFlag') === null
                })
        })
        .then( zhFlagNotFound => {
            if (!zhFlagNotFound)
                throw('zhFlagFound was found, but it shouldn\'t be there.')
        })

        // 00.2 Now switch to english. Verify that we _can_ see the zhFlag, but _not_ the enFlag.
        .then( res => {
            return nightmare
                .click('#enFlag').wait(delay)

                // Verify that we can see the zhFlag
                .evaluate(function () {
                    return document.querySelector('#zhFlag') !== null
                })
        }).then( zhFlagFound => {
            if (!zhFlagFound)
                throw('zhFlagFound was not found')
        })
        .then( res => {
            return nightmare
                .evaluate(function () {
                    return document.querySelector('#enFlag') === null
                })
        })
        .then( enFlagNotFound => {
            if (!enFlagNotFound)
                throw('enFlagFound was found, but it shouldn\'t be there.')
        })

        // 0. Now answer the intro lesson question. Can I see the checkmark?
        .then( res => {
            return nightmare
                .click('#iunderstandCheck').wait(delay)
                .evaluate(function () {
                    return document.querySelector('#iunderstandCheck') !== null
                })
        })
        .then( iunderstandCheck => {
            if (!iunderstandCheck)
                throw('iunderstandCheck was not found')
        })

        .then( res => {return nightmareNound(nightmare, delay)})
        .then( res => {return nightmareVerbd(nightmare, delay)})

        // I want to factor out this code into nightmareAdjectivd.  But when I do so
        // I get mysterious errors re: cannot find add-verbd.  But if I keep it here, then all is well.
        //.then( res => {return nightmareAdjectivd(nightmare, 5000)})
        .then( res => {
            return nightmare
                .click('#lesson-next').wait(delay1)
                .click('#add-adjectivd').wait(delay1)
                .click('#adjectivd-add-form #cancel').wait(delay1)

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
                .click('#add-adjectivd').wait(delay1)
                .type('#base', 'fat').wait(delay1)
                .click('#save-adjectivd').wait(delay1)

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
                .click('#adj-1').wait(delay1)
                .click('#cancel').wait(delay1)
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
                    .click('#adj-1').wait(delay)
                    .type('#base', 'beaver').wait(delay)
                    .click('#save-adjectivd').wait(delay)
                    .evaluate(function() {
                        return document.querySelector('#adjectivd-edit-form') === null
                    })
            })
            .then(adjectivd_edit_form_gone => {
                if (!adjectivd_edit_form_gone)
                    throw('adjectivd-edit-form has not gone away after save')
            }).then( res => {
            return nightmare
                .evaluate(function() {
                    return document.querySelector('#updateAdjectivdCheck') !== null
                })
        })
            .then(updateAdjectivdCheckFound => {
                if (!updateAdjectivdCheckFound)
                    throw('updateAdjectivdCheck did not appear after save')
            }).then( res => {
            return nightmare
                .click('#adj-1').wait(delay)
                .click('#delete-adjectivd').wait(delay)
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


        //.then( res => {return nightmareAdjectivd(nightmare, 5000)})

            .then(deleteAdjectivdCheckFound => {
                if (!deleteAdjectivdCheckFound)
                    throw('deleteAdjectivdCheck did not appear after delete')
            })




        //.then( res => {return nightmareDefiniteness(nightmare, delay1)})
        .then(resolve => {done()})
        .catch(err => {console.log(err),done()})

    }).timeout(50000)

})
